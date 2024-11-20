import {NEXT_PUBLIC_TOSS_SECRET_KEY} from "@app/utils/constants"
import {OrderDTO} from "@server/types/order"
import got, {
  Got,
  CancelableRequest,
  GotRequestFunction,
  OptionsOfJSONResponseBody,
  HTTPError,
} from "got"

interface PaymentGateway {
  processPayment: (order: OrderDTO) => Promise<Got>
}

interface TossPaymentsSuccessResponse {
  paymentKey: string //결제를 식별하는 키 값입니다. 결제 승인, 결제 조회, 결제 취소
  orderID: string
  amount: number
  paymentType: "NORMAL" | "BRANDPAY" | "KEYIN"
}

interface TossPaymentsErrorResponse {
  code: string //에러 코드입니다. 에러 목록을 확인하세요.
  message: string //에러 메시지입니다.
  orderId: string //주문 ID입니다. 결제 요청에 담아 보낸 값입니다.
}
const PaymentGateway = {
  async processPayment(
    order: OrderDTO
  ): Promise<TossPaymentsSuccessResponse | TossPaymentsErrorResponse> {
    const {orderId, amount, paymentKey} = order
    try {
      const resp = got.post<
        TossPaymentsSuccessResponse | TossPaymentsErrorResponse
      >("https://api.tosspayments.com/v1/payments/" + paymentKey, {
        headers: {
          Authorization:
            "Basic " +
            Buffer.from(NEXT_PUBLIC_TOSS_SECRET_KEY + ":").toString("base64"),
          "Content-Type": "application/json",
        },
        json: {
          orderId,
          amount,
        },
        responseType: "json",
      })
      return (await resp).body
    } catch (error) {
      if (error instanceof HTTPError) {
        console.log(" processPayment HTTPError ", error.response.body)
        //! test 필요 error.message || error.response.body.message
        if (error.response.statusCode < 500) {
          throw new Error(error?.message)
        }
        if (error.response.statusCode >= 500) {
          throw new Error(error?.message)
        }
        // throw new HTTPError(error);
      }
      if (error instanceof Error) {
        console.log(" processPayment 에러 ")
        // throw new Error(error);
      }
    }
  },
}

export default PaymentGateway
