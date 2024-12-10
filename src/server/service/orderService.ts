import PaymentGateway from "@server/gateways/PaymentGateway"
import {default as axios} from "axios";
import {AppContext} from "@app/pages/api/order/approval";
import {OrderDTO} from "@server/types/order"

export class OrderService {
  constructor(private readonly context:AppContext) {
  }

  async processOrderApproval(order: OrderDTO) {
    // 토스 결제 승인처리
    const {orderId, amount,qty,customerName,paymentKey,phone } = order
    try {
      const paymentResult = await PaymentGateway.processPayment(order)
      console.log("토스 결제승인처리 paymentResult", paymentResult)
      if(paymentResult.status!== "DONE"){
        throw new Error(`토스 결제 승인 상태가 올바르지 않음,${paymentResult.status}`)
      }

      //백엔드로 승인 처리 결과 보내기
      const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/payment`,
          { qty:order.qty, ...paymentResult }
      );
      console.log("backend response.status", response.status)
      if(response?.status>=300){
        const text = `⛑️ 백엔드 승인 처리 전송 실패 : orderId-${order.orderId},orderName-${paymentResult.orderName}, 페이먼츠승인시간-${paymentResult.approvedAt}   `
        //slack으로 보내기
        await this.context.slackNotificationService.notifySlack({text})
      }
      
      // 받은 응답 orderName 에서 slack, phone 보내기
      const {approvedAt, totalAmount} = paymentResult
      const orderName = paymentResult.orderName?.split("-")
      const [storeName, regularClassName, regularClassId, startDate, phoneNumber ] = orderName

      const text = `✅ ${order.customerName}:${orderName}\n${order.orderId}\npaymentKey: ${order.paymentKey}\n 승인시간:${approvedAt}\naiff폰번호:${phoneNumber}\n가격:${totalAmount}* ${qty}`

      await this.context.slackNotificationService.notifySlack({text})

      //sms전송
      await this.context.kakaoNotificationService.notifyKakao({regularClassName, startDate, qty, storeName,customerName, balanceAmount:totalAmount,phone,target:"customer"})
      await this.context.kakaoNotificationService.notifyKakao({regularClassName, startDate, qty, customerName, storeName, balanceAmount:totalAmount, phone, target:"customer"})
      return  {
        phone,
        customerName,
        qty,
        ...paymentResult
      }

    } catch (err) {
      if( err instanceof Error){
        const text = `⛑️ /orderService/processOrderApproval error: ${err.message}-${customerName}:\n${orderId}\npaymentKey: ${paymentKey}\n 폰번호:${phone}\n가격:${amount}* ${qty}`
        await this.context.slackNotificationService.notifySlack({text})

      }
    }
  }
}

