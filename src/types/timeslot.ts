export type TimeSlotDTO = {
    
    _id: string,
    id:string,
    duration: number,
    isHoliday: boolean
    isBusinessDay:boolean
    startDateTime:string
    endDateTime:string
    maximumBookingCount:number
    minimumBookingCount:number
    currentBookingCount: number
    startDate:string
}

export const TimeSlotStatus = {
    OnSale: "OnSale",
    TemporaryBreak:"TemporaryBreak"
    
} as const 