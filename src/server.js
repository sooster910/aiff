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
const port = process.env.PORT || 4200;
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

    // proxy to backend
    const serverProxy = createProxyMiddleware("/proxy/api/**", {
      target: process.env.NEXT_PUBLIC_BACKEND_BASE_URL,
      changeOrigin: true,
      pathRewrite: {
        "^/proxy/api": "", // remove base path
      },
      secure: !dev,
      onProxyReq:(proxyReq, req, res, options)=>{
        //기존 5000 포트로 위장 : 백엔드에서 허용하는 포트
        proxyReq.setHeader("host", `localhost:${process.env.CORS_ALLOWED_ORIGIN_PORT}`)
        proxyReq.setHeader("origin",`http://localhost:${process.env.CORS_ALLOWED_ORIGIN_PORT}`)

      }
    });


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
          text: `${customerName}:${orderName}\n${orderId}\npaymentKey: ${paymentKey}\n 승인시간:${approvedAt}\naiff폰번호:${phone}\n가격:${totalAmount}* ${qty}`,
          channel: "#order",
          icon_emoji: "slack",
        })
        .catch((err) => {
          slack.chat.postMessage({
            text: `error- ${err.message}-${customerName}:${orderName}\n${orderId}\npaymentKey: ${paymentKey}\n 승인시간:${approvedAt}\naiff폰번호:${phone}\n가격:${totalAmount}* ${qty}`,
            channel: "#order",
            icon_emoji: "slack",
          });
          console.log("err", err);
        });

      return result;
    };

    server.get("/api/alimtalk", async (req, res) => {
      console.log("posttttt");
      const templateInfo = {
        userName: "주현수",
        store: "용산점",
        className: "바나나",
        startDate: "2022-09-20",
        qty: 2,
        totalPrice: 60000,
      };
      const content = `
    [예약 완료]
안녕하세요 ${template.userName}님, 예약이 완료되었습니다!

■ 이름 : ${templateInfo.userName}
■ 지점명 : ${templateInfo.store}
■ 클래스명 :${templateInfo.className}
■ 클래스 시작 날짜 : ${templateInfo.startDate}
■ 인원 : ${templateInfo.qty}
■ 결제금액 : ${templateInfo.totalPrice}

클래스 전날 예약하신 지점에서 찾아오는 길과 주차정보를 안내해 드리겠습니다.

용산점 : 070-8887-1053
판교점 : 031-697-8707
대구점 : 0507-1348-2869 `;
      const templateCode = "A00001";
      try {
        await sendKakaoMessage({ content, templateCode });
        return res.send("yes");
      } catch (error) {
        console.log("error", error);
        return res.send("no");
      }
    });

    //TEST API for slack
    server.get("/api/test/slack", async (req, res) => {
      console.log("test slack");
      try {
        const result = send({
          orderId: "test",
          orderName: "test",
          paymentKey: "test",
          approvedAt: "test",
          totalAmount: "test",
          qty: "test",
          customerName: "test",
          phone: "test",
        });
        return res.send({ data: "done" });
      } catch (error) {
        console.log("error", error);
      }
    });
    // TEST API for kakao
    server.get("/api/test/order/approval", async (req, res) => {
      const templateCodes = {
        completeOrderForCust: "A0004",
        completeOrderForStore: "A00002",
      };
      const storePhoneMapper = {
        용산점: "01043941251",
        대구점: "01057812869",
        파주점: "01027529880",
        판교점: "01031730082",
        현수점: "01027529880",
      };
      //1
      const orderName =
        "판교점-자이언트 곰 젤리-8828-2023.9.23오후3:00-01045785334";
      const phone = "01045785334";
      const storeName = orderName?.split("-")[0];
      const customerName = "이채원";
      const qty = 1;
      const balanceAmount = 60000;

      //2.
      // const orderName =
      //   "용산 본점-Pumpkin Pie(원어민반)(추천수업)-8791-2023.9.24.오후2:00-01045785334";
      // const phone = "01064820868";
      // const storeName = orderName?.split("-")[0];
      // const customerName = "이나라";
      // const qty = 2;
      // const balanceAmount = 120000;
      //3.
      // const orderName =
      //   "용산 본점-Fairy Garden(원어민반)-8790-2023.9.24.오후1:00-01030695985";
      // const phone = "01030695985";
      // const storeName = orderName?.split("-")[0];
      // const customerName = "이설아";
      // const qty = 1;
      // const balanceAmount = 60000;

      //4.
      // const orderName =
      //   "용산 본점-Pumpkin Pie(원어민반)(추천수업)-8791-2023.9.24.오후2:00-01030695905";
      // const phone = "01030695905";
      // const storeName = orderName?.split("-")[0];
      // const customerName = "이설아";
      // const qty = 1;
      // const balanceAmount = 60000;

      const contents = {
        forCust: `
      [예약 완료]
안녕하세요 ${customerName}님, 예약이 완료되었습니다!

■ 이름 : ${customerName}
■ 지점명 : ${storeName}
■ 클래스명 :${orderName?.split("-")[1]}
■ 클래스 시작 날짜 : ${orderName?.split("-")[3]}
■ 인원 : ${qty}
■ 결제금액 : ${balanceAmount}

클래스 전날 예약하신 지점에서 찾아오는 길과 주차정보를 안내해 드리겠습니다.

용산점 : 070-8887-1053
판교점 : 031-697-8707
대구점 : 0507-1348-2869 `,

        forStore: `[예약 완료]

안녕하세요 ${customerName}님의 ${storeName}예약이 완료되었습니다!

■ 이름 : ${customerName}
■ 지점명: ${storeName}
■ 클래스명:${orderName?.split("-")[1]}
■ 클래스 시작 날짜: ${orderName?.split("-")[3]}
■ 인원: ${qty}
■ 결제금액: ${balanceAmount}
■ 핸드폰번호: ${phone}

예약 스케줄에 차질이 없도록 기록/체크해 주시기 바랍니다.
예약일 전 예약자에게 오시는길/주차정보를 안내해 주시기 바랍니다.
감사합니다.`,
      };

      try {
        const [
          completeSlackNotification,
          completeReservationNotification,
          completeReservationNotificationToStore,
        ] = await Promise.all([
          // send({
          //   orderId,
          //   orderName,
          //   requestedAt,
          //   phone,
          //   paymentKey,
          //   totalAmount: balanceAmount,
          //   customerName,
          //   qty,
          // }),
          await sendKakaoMessage(
            {
              content: contents.forCust,
              templateCode: templateCodes.completeOrderForCust,
            },
            flatPhoneNumber(phone).slice(1)
          ),
          // await sendKakaoMessage(
          //   {
          //     content: contents.forStore,
          //     templateCode: templateCodes.completeOrderForStore,
          //   },
          //   `${flatPhoneNumber(storePhoneMapper["판교점"])}`.slice(1)
          // ),
        ]);

        return res.redirect(
          `/success?orderId=${orderId}&orderName=${orderName}&requestedAt=${requestedAt}&phone=${phone}&paymentKey=${paymentKey}&totalAmount=${balanceAmount}&customerName=${customerName}&qty=${qty}`
        );
      } catch (err) {
        console.log("test alimtalk err", err);
      }
    });
    //=================valid api==============
    server.get("/api/order/approval", async (req, res) => {
      const { orderId, amount, phone, paymentKey, qty, customerName } =
        req.query;
      console.log("orderId", orderId);
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
      

      const templateCodes = {
        completeOrderForCust: "A00005", // updated 2024.04.03. A00005-> A00006 템플릿 신청함. 검수완료시 업데이트
        completeOrderForStore: "A00002",
      };
      const storePhoneMapper = {
        서초점: "01043941251",
        용산점: "01043941251",
        강남점: "01071751053",
      };
      const storeName = orderName?.split("-")[0];
      console.log(
        
        "storeName , dateee",storeName, 
        DateTime.fromJSDate(new Date(orderName?.split("-")[3]))
      );

      const contents = {
        nextforCust:`[예약 완료]
        안녕하세요  ${customerName}님, 예약이 완료되었습니다!
        
        ■ 이름 : ${customerName}
        ■ 지점명 : ${storeName}
        ■ 클래스명 :${orderName?.split("-")[1]}
        ■ 클래스 시작 날짜 : ${orderName?.split("-")[3]}
        ■ 인원 : ${qty}
        ■ 결제금액 : ${balanceAmount}
        
        주소: 서초동1645 삼성 라이온즈 레포츠센터1층

주차: 두시간 무료-지하나 옥외에 주차 하시고 1층으로 오셔서 아티제 맞은편 입니다.
수업시작 10분 후에는 입장 하실 수 없습니다.  😢 

서초블루타이거: 025976845`,
        forCust: `[예약 완료]
        안녕하세요  ${customerName}님, 예약이 완료되었습니다!
        
        ■ 이름 : ${customerName}
        ■ 지점명 : ${storeName}
        ■ 클래스명 :${orderName?.split("-")[1]}
        ■ 클래스 시작 날짜 : ${orderName?.split("-")[3]}
        ■ 인원 : ${qty}
        ■ 결제금액 : ${balanceAmount}`
        ,

        forStore: `[예약 완료]

안녕하세요 ${customerName}님의 ${storeName}예약이 완료되었습니다!

■ 이름 : ${customerName}
■ 지점명: ${storeName}
■ 클래스명:${orderName?.split("-")[1]}
■ 클래스 시작 날짜: ${orderName?.split("-")[3]}
■ 인원: ${qty}
■ 결제금액: ${balanceAmount}
■ 핸드폰번호: ${phone}

예약 스케줄에 차질이 없도록 기록/체크해 주시기 바랍니다.
예약일 전 예약자에게 오시는길/주차정보를 안내해 주시기 바랍니다.
감사합니다.`,
      };

      try {
        //store name 이 없을때 에러 처리 
        if( !storeName || !storePhoneMapper[storeName.replaceAll(" ", "")]){
          throw new Error("No phone number found for store: ${storeName}")
        }

          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/payment`,
            { qty: Number(qty), ...resp?.body }
          );
          const { updated } = response.data;

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
      
        if(!(response.status>=200 && response.status<300)){
          throw new Error("fail to update payment info to server")
        }

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
            `${flatPhoneNumber(
              storePhoneMapper[storeName.replaceAll(" ", "")]
            )}`.slice(1)
          ),
        ]);

        return res.redirect(
          `/success?orderId=${orderId}&orderName=${orderName}&requestedAt=${requestedAt}&phone=${phone}&paymentKey=${paymentKey}&totalAmount=${balanceAmount}&customerName=${customerName}&qty=${qty}`
        );
      } catch (error) {
        console.log("/api/order/approval error", error);

        res.redirect(
          `/fail?orderName=${orderName}&requestedAt=${requestedAt}&phone=${phone}&paymentKey=${paymentKey}&totalAmount=${balanceAmount}&customerName=${customerName}&qty=${qty}`
        );
        send({
          orderId,
          orderName: `${orderName} send notification error ${error?.message}`,
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
        await slack.chat.postMessage({
          text: `success sending kakao messageID: ${res?.data?.messageId}, TO:${res?.data?.to} status:${res?.data?.status}, text:${res?.data?.text}`,
          channel: "#order",
          icon_emoji: "slack",
        });
        return res;
      } catch (error) {
        console.log("fail to send message", error.response.data);
        slack.chat.postMessage({
          text: `error sending kakao messageID: ${error?.response?.data?.messageId}, TO:${error?.response?.data?.to} status:${error?.response?.data?.status}, text:${error?.response?.data?.text}`,
          channel: "#order",
          icon_emoji: "slack",
        });
        send({
          orderId,
          orderName: `${orderName} :${error?.message} send notification error`,
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
      console.log(`🚀 Listening on port ${port}`);
    });
  } catch (error) {
    console.log("-> An error occurred, unable to start the server");
    console.error(error);
  }
};

//generate random number

main();
