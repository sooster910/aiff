const express = require("express");
const got = require("got");
const next = require("next");
const { DateTime } = require("luxon");
require("dotenv").config();
const { createProxyMiddleware } = require("http-proxy-middleware");
const { WebClient } = require("@slack/web-api");
const request = require("request");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const { REF_KEY } = require("relay-runtime");
const { default: axios } = require("axios");
const env = process.env.NODE_ENV;
const dev = env !== "production";
const port = process.env.PORT || 5000;
const server = express();
console.log("isDev?", dev);
const slack = new WebClient(process.env.SLACK_API_TOKEN);
const main = async () => {
  try {
    const app = next({
      dir: ".",
      dev,
    });
    const handle = app.getRequestHandler();
    await app.prepare();
    server.use(
      cors({
        origin: ["https://www.aiff.co.kr", "https://aiff.co.kr"],
        methods: "GET, POST, PUT, DELETE",
        optionsSuccessStatus: 200,
        credentials: true,
      })
    );

    server.use(bodyParser.json());

    // proxy to backend
    console.log(
      "NEXT_PUBLIC_BACKEND_BASE_URL",
      process.env.NEXT_PUBLIC_BACKEND_BASE_URL
    );
    // const injectAuthHeader = (proxyReq, req, res) => {
    //   const token = req.cookies?.[COOKIES.ACCESS_TOKEN]
    //   if (token) {
    //     proxyReq.setHeader('Authorization', `Bearer ${token}`)
    //   }
    // }
    // proxy to backend
    const serverProxy = createProxyMiddleware("/proxy/api/**", {
      target: process.env.NEXT_PUBLIC_BACKEND_BASE_URL,
      changeOrigin: true,
      pathRewrite: {
        "^/proxy/api": "", // remove base path
      },
      secure: !dev,
      // onProxyReq: injectAuthHeader,
    });
    // NOTE: legacy code should be removed
    // const frontProxy = createProxyMiddleware("/front/api", {
    //   target: process.env.NEXT_PUBLIC_FRONTEND_API_URL,
    //   changeOrigin: true,
    //   pathRewrite: {
    //     "^/front/api": "", // remove base path
    //   },
    //   secure: !dev,
    // });

    // const serverProxy = createProxyMiddleware('/proxy/adminApi', {
    //   target: process.env.NEXT_PUBLIC_BACKEND_BASE_URL,
    //   changeOrigin: true,
    //   pathRewrite: {
    //     '^/proxy/adminApi': '',
    //   },
    //   secure: !dev,
    // })
    // proxy to backend
    server.use("/proxy/api", serverProxy);
    // server.use('/front/api', frontProxy)
    // server.use('/proxy/adminApi', serverProxy)
    // server.use(express.static(path.join(__dirname, 'public')))

    const send = async ({
      orderId,
      orderName,
      paymentKey,
      approvedAt,
      totalAmount,
      qty,
      customerName,
      phone,
    }) => {
      const result = await slack.chat
        .postMessage({
          text: `${customerName}:${orderName}\n${orderId}\npaymentKey: ${paymentKey}\n ????????????:${approvedAt}\naiff?????????:${phone}\n??????:${totalAmount}* ${qty}`,
          channel: "#order",
          icon_emoji: "slack",
        })
        .catch((err) => {
          console.log("err", err);
        });

      return result;
    };

    server.get("/api/alimtalk", async (req, res) => {
      console.log("posttttt");
      const templateInfo = {
        userName: "?????????",
        store: "?????????",
        className: "?????????",
        startDate: "2022-09-20",
        qty: 2,
        totalPrice: 60000,
      };
      const content = `
    [?????? ??????]
??????????????? ${template.userName}???, ????????? ?????????????????????!

??? ?????? : ${templateInfo.userName}
??? ????????? : ${templateInfo.store}
??? ???????????? :${templateInfo.className}
??? ????????? ?????? ?????? : ${templateInfo.startDate}
??? ?????? : ${templateInfo.qty}
??? ???????????? : ${templateInfo.totalPrice}

????????? ?????? ???????????? ???????????? ???????????? ?????? ??????????????? ????????? ??????????????????.

????????? : 070-8887-1053
????????? : 031-697-8707
????????? : 010-5245-3636
????????? : 010-8246-3612`;
      const templateCode = "A00001";
      try {
        await sendKakaoMessage({ content, templateCode });
        return res.send("yes");
      } catch (error) {
        console.log("error", error);
        return res.send("no");
      }
    });
    server.get("/api/order/approval", async (req, res) => {
      console.log("yesss!!!");
      const { orderId, amount, phone, paymentKey, qty, customerName } =
        req.query;

      const secretKey = process.env.NEXT_PUBLIC_TOSS_SECRET_KEY;

      const resp = await got
        .post(
          "https://api.tosspayments.com/v1/payments/" + req.query.paymentKey,
          {
            headers: {
              Authorization:
                "Basic " + Buffer.from(secretKey + ":").toString("base64"),
              "Content-Type": "application/json",
            },
            json: {
              orderId,
              amount,
            },
            responseType: "json",
          }
        )
        .catch(function (error) {
          res.redirect(
            `/fail?code=${error?.response?.body?.code}&message=${error.response?.body?.message}`
          );
        });
      const { orderName, requestedAt, balanceAmount, approvedAt } = resp?.body;
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/payment`,
          { qty: Number(qty), ...resp?.body }
        );
        const { updated } = response.data;
        console.log("orderName", orderName);
        if (!updated) {
          send({
            orderId,
            orderName: `${orderName} fail to update payment info`,
            requestedAt,
            phone,
            paymentKey,
            totalAmount: balanceAmount,
            customerName,
            qty,
          });
        }
      } catch (error) {
        send({
          orderId,
          orderName: `${orderName} unexpected Error`,
          requestedAt,
          phone,
          paymentKey,
          totalAmount: balanceAmount,
          customerName,
          qty,
        });
        console.log("request from toss order confirm error", error);
      }

      const templateCodes = {
        completeOrderForCust: "A00003",
        completeOrderForStore: "A00002",
      };
      const storePhoneMapper = {
        ?????????: "01052453636",
        ?????????: "01043941251",
        ?????????: "01057812869",
        ?????????: "01082463612",
        ?????????: "01027529880",
        ?????????: "01027529880",
        ?????????: "01031730082",
      };
      const storeName = orderName?.split("-")[0];
      console.log(
        "dateee",
        DateTime.fromJSDate(new Date(orderName?.split("-")[3]))
      );
      const contents = {
        forCust: `
      [?????? ??????]
??????????????? ${customerName}???, ????????? ?????????????????????!

??? ?????? : ${customerName}
??? ????????? : ${storeName}
??? ???????????? :${orderName?.split("-")[1]}
??? ????????? ?????? ?????? : ${orderName?.split("-")[3]}
??? ?????? : ${qty}
??? ???????????? : ${balanceAmount}

????????? ?????? ???????????? ???????????? ???????????? ?????? ??????????????? ????????? ??????????????????.

????????? : 070-8887-1053
????????? : 031-697-8707
????????? : 010-5245-3636
????????? : 010-8246-3612
????????? : 0507-1348-2869 `,

        forStore: `[?????? ??????]

??????????????? ${customerName}?????? ${storeName}????????? ?????????????????????!

??? ?????? : ${customerName}
??? ?????????: ${storeName}
??? ????????????:${orderName?.split("-")[1]}
??? ????????? ?????? ??????: ${orderName?.split("-")[3]}
??? ??????: ${qty}
??? ????????????: ${balanceAmount}
??? ???????????????: ${phone}

?????? ???????????? ????????? ????????? ??????/????????? ????????? ????????????.
????????? ??? ??????????????? ????????????/??????????????? ????????? ????????? ????????????.
???????????????.`,
      };

      try {
        const [
          completeSlackNotification,
          completeReservationNotification,
          completeReservationNotificationToStore,
        ] = await Promise.all([
          send({
            orderId,
            orderName,
            requestedAt,
            phone,
            paymentKey,
            totalAmount: balanceAmount,
            customerName,
            qty,
          }),
          sendKakaoMessage(
            {
              content: contents.forCust,
              templateCode: templateCodes.completeOrderForCust,
            },
            flatPhoneNumber(phone).slice(1)
          ),
          sendKakaoMessage(
            {
              content: contents.forStore,
              templateCode: templateCodes.completeOrderForStore,
            },
            `${flatPhoneNumber(storePhoneMapper[storeName])}`.slice(1)
          ),
        ]);

        return res.redirect(
          `/success?orderId=${orderId}&orderName=${orderName}&requestedAt=${requestedAt}&phone=${phone}&paymentKey=${paymentKey}&totalAmount=${balanceAmount}&customerName=${customerName}&qty=${qty}`
        );
      } catch (error) {
        send({
          orderId,
          orderName: `${orderName} send notification error`,
          requestedAt,
          phone,
          paymentKey,
          totalAmount: balanceAmount,
          customerName,
          qty,
        });
      }
    });
    const flatPhoneNumber = (phoneNumber) => {
      const trimmedPhoneNum = phoneNumber.toString().trim();
      const cleanedPhonNum = trimmedPhoneNum.replace(/\D/g, "");
      return cleanedPhonNum;
    };
    const sendKakaoMessage = async (helper, phone) => {
      const bzPlusURL = process.env.bzPlusURL;
      try {
        const options = {
          headers: {
            "X-IB-Client-Id": process.env.BIZ_PLUSH_CLIENT_ID,
            "X-IB-Client-Passwd": process.env.BIZ_PLUSH_CLIENT_PW,
            "Content-Typ": "application/json;charset=UTF-8",
            Accept: "application/json",
          },
        };

        const body = {
          msg_type: "AL",
          msg_data: {
            senderid: process.env.BIZ_PLUS_SENDER_ID,
            to: `82${Number(phone)}`,

            content: helper.content,
            title: helper.title,
          },
          msg_attr: {
            sender_key: process.env.BIZ_SENDER_KEY,
            response_method: "push",
            template_code: helper.templateCode,
            timeout: 500,
          },
        };

        const res = await axios.post(bzPlusURL, body, options);
        return res;
        // console.log(data);
      } catch (err) {
        console.log("fail to send message", err);
        send({
          orderId,
          orderName: `${orderName} :${err?.message} send notification error`,
          requestedAt,
          phone,
          paymentKey,
          totalAmount: balanceAmount,
          customerName,
          qty,
        });
      }
    };
    // server.get('/', (req, res) => {
    //   return app.render(req, res, '/')
    // })

    // Default catch-all handler to allow Next.js to handle all other routes
    // server.get('/api/stores', (req, res) => {
    //   // get file
    //   const stores = JSON.parse(
    //     fs.readFileSync('db/stores.json', { encoding: 'utf8' })
    //   )
    //   return res.send(stores)
    // })

    // server.get('/api/timeSlotByDay', (req, res) => {
    //   try {
    //     const { selectedDate, selectedStore } = req.query
    //     const payload = {}
    //     if (selectedDate) {
    //       payload.selectedDate = selectedDate
    //     }
    //     if (selectedStore) {
    //       payload.selectedDate = selectedStore
    //     }

    //     console.log('req', req.query)
    //   } catch (error) {}
    // })
    server.all("*", (req, res) => handle(req, res));
    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`???? Listening on port ${port}`);
    });
  } catch (error) {
    console.log("-> An error occurred, unable to start the server");
    console.error(error);
  }
};

main();
