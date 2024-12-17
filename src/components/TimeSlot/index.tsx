import { DateTime } from 'luxon'
import * as React from 'react'
import { graphql, useFragment } from 'react-relay'
import { TimeSlotFragment$key } from '../../../__generated__/TimeSlotFragment.graphql'
import { FormValues } from '../SuspenseBooking'
import { useFormikContext } from 'formik'

interface TimeSlotProps {
  timeSlot: TimeSlotFragment$key;
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
export const TimeSlot = ({ timeSlot }: TimeSlotProps) => {
  const data = useFragment(TimeSlotFragment, timeSlot)
  return (
    <div
      className={'flex flex-nowrap items-center py-4'}
    >
      <div
        className={'text-sm mr-2 px-3 py-2 text-amber-50 bg-red-300 rounded cursor-pointer'}
        key={data.id}

        onClick={async () => {
          //   handleRegularClassClicked(singleClass?.id);
          //   await setFieldValue("timeSlot", timeslot?.id);
          //   await setFieldValue(
          //     "maximumBookingCount",
          //     Number(timeslot?.maximumBookingCount)
          //   );
          //   await setFieldValue(
          //     "currentBookingCount",
          //     Number(timeslot?.currentBookingCount)
          //   );
          //   await setFieldValue("startDateTime", timeslot?.startDateTime);
          //   setFieldValue("classPrice", singleClass?.price);
          //   if (Number(values?.qty) > 0) {
          //     setFieldValue(
          //       "totalAmount",
          //       Number(values?.qty) * Number(values?.classPrice)
          //     );
          //   }
        }}
      >
        {`${DateTime.fromISO(data.startDateTime).toFormat('HH:mm')}`}
      </div>
    </div>
  )
}

export default TimeSlot
