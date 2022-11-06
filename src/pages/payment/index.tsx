import { loadTossPayments } from '@tosspayments/payment-sdk'
import { useEffect } from 'react'
const clientKey = 'test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq'

export interface paymentProps {}
const PaymentPage = (props: paymentProps) => {
  useEffect(() => {
    console.log('clietkey', clientKey)
    const tossPaymentsProcess = async () => {
      const tossPayments = await loadTossPayments(clientKey)
      if (tossPayments) {
        console.log('tossPayments', tossPayments)

        tossPayments
          .requestPayment('카드', {
            amount: 15000,
            orderId: 'NgyTPr__ol211iyf0Kai4',
            orderName: '토스 티셔츠 외 2건',
            customerName: '박토스',
            successUrl: 'http://localhost:3434/payment/success',
            failUrl: 'http://localhost:3000/fail',
          })
          .catch(error => {
            if (error.code === 'USER_CANCEL') {
              // 취소 이벤트 처리
              console.log('error', error)
            }
          })
      }
    }
    tossPaymentsProcess()
  }, [])

  return (
    <div>
      <h1>{`Payment page`}</h1>
    </div>
  )
}

export default PaymentPage
