import { RegularClassDTO } from './regularClass';
export type StoreDTO = {
    _id?: string,
    id:string,
    name: string,
    address:string
    description:string
    holidays?:string
    availableDays?:string
    breakTimes?:string
    openTime:string
    closeTime: string
    regularClasses: RegularClassDTO[]
    visible_months?: Array<number>
    availavailableRegularClassIdsable?:Array<number>
}