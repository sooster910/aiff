import { BottomSheet } from '@app/common/BottomSheet'
import { ReservationContent } from '@app/components/ReservationContent'
import { useReservation } from '@app/hooks/useReservation'
import { PreloadedQuery, usePreloadedQuery } from 'react-relay'
import { TimeSlotsReservationQuery } from '../../../__generated__/TimeSlotsReservationQuery.graphql'
import { timeSlotReservationQuery } from '../TimeSlots'

type ReservationModalProps = {
  isOpen: boolean
  onClose: () => void
  selectedQueryReference: PreloadedQuery<TimeSlotsReservationQuery>
}
export const ReservationBottomSheet = ({
  isOpen,
  onClose,
  selectedQueryReference,
}: ReservationModalProps) => {
  const reservation = useReservation()

  const data = usePreloadedQuery(
    timeSlotReservationQuery,
    selectedQueryReference
  )
  console.log('data', data)
  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <ReservationContent queryData={data} {...reservation} />
    </BottomSheet>
  )
}
