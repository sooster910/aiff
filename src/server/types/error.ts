import {TossPaymentsInstance} from "@tosspayments/payment-sdk"
import axios, {AxiosError} from "axios"

export interface ErrorResponse extends Error {
  status?: string
  errorCode?: string
  message: string
}

export function isAIFFServerError(
  error: unknown
): error is AxiosError<ErrorResponse> {
  return axios.isAxiosError(error)
}

export function isTossServerError(
  error: unknown
): error is TossPaymentsInstance {
  return error instanceof Error
}
