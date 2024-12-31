import { Button } from '@nextui-org/react'
import { DateTime } from 'luxon'
import { graphql, useFragment } from 'react-relay'
import { TimeSlotFragment$key } from '../../../__generated__/TimeSlotFragment.graphql'
import { Spinner } from '../Spinner'

interface TimeSlotProps {
  timeSlot: TimeSlotFragment$key
  onClick: (timeSlotId: string) => void
  isPending: boolean
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
export const TimeSlot = ({ timeSlot, onClick, isPending }: TimeSlotProps) => {
  const data = useFragment(TimeSlotFragment, timeSlot)
  return (
    <div className={'flex flex-nowrap items-center py-4'}>
      <Button
        color="primary"
        variant={'ghost'}
        key={data.id}
        disabled={isPending}
        onPress={() => onClick(data._id)}
      >
        {isPending ? (
          <Spinner />
        ) : (
          `${DateTime.fromISO(data.startDateTime).toFormat('HH:mm')}`
        )}
      </Button>
    </div>
  )
}

export default TimeSlot
