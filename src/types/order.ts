export type OrderDTO = {
    orderId:number
}

export const StorePrefix = {
    광명점: "GM",
    용산점: "YS",
    대구점: "DG",
    위례점: "YR",
    광교점: "GG",
    파주점: "PJ",
    판교점: "PG"
} as const 


export const PaymentMethod = {
    "CARD": "카드",
    "VIRTUAL_ACCOUNT":"가상계좌"
} as const 