import { Button } from '@nextui-org/react'
import { DateTime } from 'luxon'
import { graphql, useFragment } from 'react-relay'
import { TimeSlotFragment$key } from '../../../__generated__/TimeSlotFragment.graphql'

interface TimeSlotProps {
  timeSlot: TimeSlotFragment$key
  onClick: (timeSlotId: string) => void
}

export const TimeSlotFragment = graphql`
  fragment TimeSlotFragment on TimeSlot {
    _id
    id
    name
    startDateTime
    endDateTime
    regularClassId
    price
    currentBookingCount
    maximumBookingCount
    regularClass {
      _id
      description
      duration
      name
      price
    }
  }
`
export const TimeSlot = ({ timeSlot, onClick }: TimeSlotProps) => {
  const data = useFragment(TimeSlotFragment, timeSlot)
  return (
    <div className={'flex flex-nowrap items-center py-4'}>
      <Button
        color="primary"
        variant={'ghost'}
        key={data.id}
        onPress={() => onClick(data._id)}
      >{`${DateTime.fromISO(data.startDateTime).toFormat('HH:mm')}`}</Button>
    </div>
  )
}

export default TimeSlot
