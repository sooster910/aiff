import { TimeSlotFragment$key } from '../../../__generated__/TimeSlotFragment.graphql'
import { TimeSlot } from '@app/components/TimeSlot'


type TimeSlotsProps = {
  timeSlots: ReadonlyArray<TimeSlotFragment$key>
}

export const TimeSlots = ({ timeSlots }: TimeSlotsProps) => {
  return (
    <>{timeSlots.map((timeSlot, idx) => <TimeSlot key={idx} timeSlot={timeSlot} />)}</>
  )
}