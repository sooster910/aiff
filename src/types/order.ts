export type OrderDTO = {
  orderId: number;
};

export const StorePrefix = {
  서초점: "SC",
  대치점1: "DC1",
  대치점2: "DC2",
  도곡점: "DG",
  압구정점: "AG",
  광명점: "GM",
  용산본점: "YS",
  대구점: "DG",
  위례점: "YR",
  광교점: "GG",
  파주점: "PJ",
  판교점: "PG",
} as const;

export const PaymentMethod = {
  CARD: "카드",
  VIRTUAL_ACCOUNT: "가상계좌",
} as const;
