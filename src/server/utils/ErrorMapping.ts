// 내부 에러 코드
export enum InternalErrorCode {
  CannotProcessPayment = "CANNOT_PROCESS_PAYMENT",
  ServiceUnavailable = "SERVICE_UNAVAILABLE",
  // ... 기타 내부 에러 코드
}

// 외부 에러 코드

export enum TossPaymentsErrorCode {
  PAY_PROCESS_CANCELED = "PAY_PROCESS_CANCELED",
  PAY_PROCESS_ABORTED = "PAY_PROCESS_ABORTED",
  REJECT_CARD_COMPANY = "REJECT_CARD_COMPANY",
}
