/* 기존 특정 필드를 Required 로 만드는 제네릭 */
export type WithRequired<T, K extends keyof T> = Omit<T,K> & Required<Pick<T,K>>

/* 타입 추가 제네릭 */
export type AddType<T, K> = T & K

