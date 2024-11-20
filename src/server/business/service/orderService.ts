import {OrderDTO} from "@server/types/order"
import PaymentGateway from "@server/business/gateways/PaymentGateway"

interface OrderServiceType {
  processOrderApproval: (order: OrderDTO) => void
}

export const OrderService: OrderServiceType = {
  async processOrderApproval(order: OrderDTO) {
    // 토스 결제 승인처리
    try {
      const paymentResult = await PaymentGateway.processPayment(order)
    } catch (err) {}
  },
}
