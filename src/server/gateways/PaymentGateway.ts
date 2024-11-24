import {NEXT_PUBLIC_TOSS_SECRET_KEY} from "@app/utils/constants"
import {OrderDTO} from "@server/types/order"
import got, {
  Got,
} from "got"
import {TossPaymentError} from "@server/errors/TossPaymentError";

interface PaymentGateway {
  processPayment: (order: OrderDTO) => Promise<Got>
}

type TossPaymentStatus = "READY"|"IN_PROGRESS"|"WAITING_FOR_DEPOSIT"|"DONE"|"CANCELED"|"PARTIAL_CANCELED"|"ABORTED"| "EXPIRED"

interface TossPaymentsSuccessResponse {
 
    mId: string;
    lastTransactionKey: string;
    paymentKey: string;
    orderId: string;
    orderName: string;
    taxExemptionAmount: number;
    status: string;
    requestedAt: string;
    approvedAt: string;
    receipt: {
      url: string;
    };
    currency: string;
    totalAmount: number;
    balanceAmount: number;
    suppliedAmount: number;
    vat: number;
    taxFreeAmount: number;
    method: string;
    version: string;
  }

interface TossPaymentsErrorResponse {
  code: string //에러 코드입니다. 에러 목록을 확인하세요.
  message: string //에러 메시지입니다.
  orderId?: string //주문 ID입니다. 결제 요청에 담아 보낸 값입니다.
}

type TossPaymentsResponse = TossPaymentsSuccessResponse| TossPaymentsErrorResponse

const isSuccessResponse  = (response: TossPaymentsResponse):response is TossPaymentsSuccessResponse=>{
  return "paymentKey" in response
}

const PaymentGateway = {
  async processPayment(
    order: Pick<OrderDTO,"orderId"|"amount"|"paymentKey" >
  ): Promise<TossPaymentsSuccessResponse>  {
    try {
    const {orderId, amount, paymentKey} = order
      const resp = got.post<TossPaymentsSuccessResponse| TossPaymentsErrorResponse>("https://api.tosspayments.com/v1/payments/confirm" + paymentKey, {
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
      const paymentApprovalResult = (await resp).body

      if(isSuccessResponse(paymentApprovalResult)){
        return paymentApprovalResult
      }

      const { code, message} = paymentApprovalResult
        throw new TossPaymentError(code, message, orderId)

    } catch (error) {
      if( error instanceof TossPaymentError){
        throw error
      }

      throw new Error(`/PaymentGateway/processpayment 에러 : ${error}` )
    }

  },
}

export default PaymentGateway
