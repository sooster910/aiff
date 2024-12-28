import { TimeSlot } from '@app/components/TimeSlot'
import { useState } from 'react'
import { graphql, useQueryLoader } from 'react-relay'
import { TimeSlotFragment$key } from '../../../__generated__/TimeSlotFragment.graphql'
import { TimeSlotsReservationQuery as TimeSlotsReservationQueryType } from '../../../__generated__/TimeSlotsReservationQuery.graphql'
import { ReservationBottomSheet } from '../ReservationModal'
type TimeSlotsProps = {
  timeSlots: ReadonlyArray<TimeSlotFragment$key>
}
//TODO: fragment
export const timeSlotReservationQuery = graphql`
  query TimeSlotsReservationQuery($timeSlotId: String!) {
    timeSlot(where: { _id: $timeSlotId, skip: false }) {
      ...TimeSlotFragment
    }
  }
`

export const TimeSlots = ({ timeSlots }: TimeSlotsProps) => {
  const [queryReference, loadQuery] =
    useQueryLoader<TimeSlotsReservationQueryType>(timeSlotReservationQuery)
  //TODO: Refactor hook for modal
  const [modalOpen, setModalOpen] = useState(false)
  const handleCloseModal = () => {
    setModalOpen(false)
  }

  const handleTimeSlotClicked = (id: string) => {
    console.log('click')
    setModalOpen(true)
    loadQuery({ timeSlotId: id })
  }

  return (
    <>
      {timeSlots.map((timeSlot, idx) => (
        <TimeSlot
          key={`timeslot-${idx}`}
          timeSlot={timeSlot}
          onClick={handleTimeSlotClicked}
        />
      ))}
      {modalOpen && queryReference && (
        <ReservationBottomSheet
          isOpen={modalOpen}
          onClose={handleCloseModal}
          selectedQueryReference={queryReference}
        />
      )}
    </>
  )
}
