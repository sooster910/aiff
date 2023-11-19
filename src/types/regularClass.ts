import { TimeSlotDTO } from "./timeslot";
export type RegularClassDTO = {
  _id?: string;
  id: string;
  name: string;
  price: number;
  storeId?: string;
  duration: string;
  maximumClassSize: number;
  minimumClassSize: number;
  description: string;
  timeSlots: TimeSlotDTO[];
  imageURL: string;
};
