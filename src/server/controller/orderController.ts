export {};
// import express, { Request, Response } from "express";
// import { OrderService } from "@server/business/service/orderService";

// exports.approveOrder = async (req: Request, res: Response) => {
//   const { orderId, amount, phone, paymentKey, qty, customerName } = req.query;

//   const result = await OrderService.processOrderApproval({});
//   console.log("orderId", orderId);
//   const secretKey = process.env.NEXT_PUBLIC_TOSS_SECRET_KEY;

//   const resp = await got
//     .post("https://api.tosspayments.com/v1/payments/" + req.query.paymentKey, {
//       headers: {
//         Authorization:
//           "Basic " + Buffer.from(secretKey + ":").toString("base64"),
//         "Content-Type": "application/json",
//       },
//       json: {
//         orderId,
//         amount,
//       },
//       responseType: "json",
//     })
//     .catch(function (error) {
//       //todo : error case  보완
//       res.redirect(
//         `/fail?code=${error?.response?.body?.code}&message=${error.response?.body?.message}`
//       );
//     });
//   const { orderName, requestedAt, balanceAmount, approvedAt } = resp?.body;
//   try {
//     const response = await axios.post(
//       `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/payment`,
//       { qty: Number(qty), ...resp?.body }
//     );
//     const { updated } = response.data;
//     if (!updated) {
//       send({
//         orderId,
//         orderName: `${orderName} fail to update payment info`,
//         requestedAt,
//         phone,
//         paymentKey,
//         totalAmount: balanceAmount,
//         customerName,
//         qty,
//       });
//     }
//   } catch (error) {
//     send({
//       orderId,
//       orderName: `${orderName} unexpected Error`,
//       requestedAt,
//       phone,
//       paymentKey,
//       totalAmount: balanceAmount,
//       customerName,
//       qty,
//     });
//     console.log("request from toss order confirm error", error);
//   }

//   const templateCodes = {
//     completeOrderForCust: "A00005", // updated 2024.01.01. 서초점만 사용
//     completeOrderForStore: "A00002",
//   };
//   const storePhoneMapper = {
//     서초점: "01043941251",
//   };
//   const storeName = orderName?.split("-")[0];
//   console.log(
//     "dateee",
//     DateTime.fromJSDate(new Date(orderName?.split("-")[3]))
//   );

//   const contents = {
//     forCust: `[예약 완료]
//     안녕하세요  ${customerName}님, 예약이 완료되었습니다!

//     ■ 이름 : ${customerName}
//     ■ 지점명 : ${storeName}
//     ■ 클래스명 :${orderName?.split("-")[1]}
//     ■ 클래스 시작 날짜 : ${orderName?.split("-")[3]}
//     ■ 인원 : ${qty}
//     ■ 결제금액 : ${balanceAmount}`,

//     forStore: `[예약 완료]

// 안녕하세요 ${customerName}님의 ${storeName}예약이 완료되었습니다!

// ■ 이름 : ${customerName}
// ■ 지점명: ${storeName}
// ■ 클래스명:${orderName?.split("-")[1]}
// ■ 클래스 시작 날짜: ${orderName?.split("-")[3]}
// ■ 인원: ${qty}
// ■ 결제금액: ${balanceAmount}
// ■ 핸드폰번호: ${phone}

// 예약 스케줄에 차질이 없도록 기록/체크해 주시기 바랍니다.
// 예약일 전 예약자에게 오시는길/주차정보를 안내해 주시기 바랍니다.
// 감사합니다.`,
//   };

//   try {
//     const [
//       completeSlackNotification,
//       completeReservationNotification,
//       completeReservationNotificationToStore,
//     ] = await Promise.all([
//       send({
//         orderId,
//         orderName,
//         requestedAt,
//         phone,
//         paymentKey,
//         totalAmount: balanceAmount,
//         customerName,
//         qty,
//       }),
//       //!! disable for temporary
//       // sendKakaoMessage(
//       //   {
//       //     content: contents.forCust,
//       //     templateCode: templateCodes.completeOrderForCust,
//       //   },
//       //   flatPhoneNumber(phone).slice(1)
//       // ),
//       // sendKakaoMessage(
//       //   {
//       //     content: contents.forStore,
//       //     templateCode: templateCodes.completeOrderForStore,
//       //   },
//       //   `${flatPhoneNumber(
//       //     storePhoneMapper[storeName.replaceAll(" ", "")]
//       //   )}`.slice(1)
//       // ),
//     ]);

//     return res.redirect(
//       `/success?orderId=${orderId}&orderName=${orderName}&requestedAt=${requestedAt}&phone=${phone}&paymentKey=${paymentKey}&totalAmount=${balanceAmount}&customerName=${customerName}&qty=${qty}`
//     );
//   } catch (error) {
//     console.log("/api/order/approval error", error);
//     send({
//       orderId,
//       orderName: `${orderName} send notification error ${error?.message}`,
//       requestedAt,
//       phone,
//       paymentKey,
//       totalAmount: balanceAmount,
//       customerName,
//       qty,
//     });
//   }
// };
