import * as React from 'react'
import { Grid, Radio, Spinner, Text } from '@geist-ui/core'
import { TimeSlotDTO } from '@app/types/timeslot'
// import { graphql } from 'relay-runtime'
// import { useLazyLoadQuery } from 'react-relay'
import { DateTime } from 'luxon'
import { aiffAPI } from '@app/utils/aiffAPI'
import useSWR from 'swr'
// import useSWR from 'swr'
// import { aiffAPI } from '@app/utils/aiffAPI'
type TimeSlotFormProps = {
  storeId?: string
  classId?: string
  timeSlots?: TimeSlotDTO[]
  handleSelectTimeSlot: (timeslotValue) => void
  date?: Date // TODO: DATE? OR STRING?
}

export const TimeSlotForm: React.FunctionComponent<TimeSlotFormProps> = ({
  storeId,
  classId,
  date,
  handleSelectTimeSlot,
}) => {
  console.log('timeslotForm')
  const [selectedTimeSlot, setState] = React.useState<string | null>(null)
  const {
    data: timeSlots,
    error,
    isValidating,
  } = useSWR(
    `/timeslotByClass?regularClassId=${classId}&selectedDate=${DateTime.fromJSDate(
      date
    ).toISODate()}&storeId=${storeId}`,
    {
      fetcher: async key => {
        const res = await aiffAPI.get(key)
        return { timeSlots: res.data }
      },
    }
  )

  // const data = useLazyLoadQuery(
  //   graphql`
  //     query TimeSlotForm_Query(
  //       $filter: AvailableTimeSlotsFilterInput!
  //       $where: AvailableTimeSlotsWhereInput!
  //     ) {
  //       availableTimeSlotsByClass(filter: $filter, where: $where) {
  //         duration
  //         _id
  //         isHoliday
  //         isBusinessDay
  //         startDateTime
  //         endDateTime
  //         maximumBookingCount
  //         minimumBookingCount
  //         currentBookingCount
  //       }
  //     }
  //   `,
  //   {
  //     filter: { status: TimeSlotStatus.OnSale },
  //     where: { regularClass: classId, date: date, store: storeId },
  //   }
  // )

  // const {
  //   data: timeSlots,
  //   error,
  //   isValidating,
  // } = useSWR<TimeSlotDTO[]>(
  //   `/timeSlots?startDate=${DateTime.fromJSDate(date).toFormat(
  //     'yyyy-MM-dd'
  //   )}&store=${storeId}&regularClassId=${classId}`,
  //   {
  //     fetcher: async key => {
  //       const res = await aiffAPI.get(key)
  //       return res.data
  //     },
  //   }
  // )
  // const timeSlots = data['availableTimeSlotsByClass']

  if (error) return <h1> ???????????? ?????? ????????? ?????? ????????????. </h1>
  if (!timeSlots && isValidating && !error) return <Spinner />
  if (timeSlots) {
    return (
      <>
        <Grid>
          <Text h5 mt={1}>
            {' '}
            ????????? ??????{' '}
          </Text>
        </Grid>
        <Grid.Container style={{ marginTop: '1rem', overflow: 'scroll' }}>
          <div style={{ margin: '1rem' }}>
            <Radio.Group
              useRow
              value={selectedTimeSlot}
              onChange={(timeSlotId: string) => {
                const selectedTimeslot = timeSlots?.timeSlots?.find(
                  v => Number(v.id) === Number(timeSlotId)
                )
                setState(timeSlotId)
                // handleSelectTimeSlot(DateTime.fromISO(value).toFormat('HH:mm'))
                handleSelectTimeSlot(selectedTimeslot)
              }}
            >
              {timeSlots?.timeSlots?.length > 0 ? (
                timeSlots?.timeSlots?.map((timeslot: TimeSlotDTO) => {
                  return (
                    <div
                      key={`${timeslot?.startDateTime.toString()}${
                        timeslot?.id
                      }`}
                      style={{
                        border: '1px solid black',
                        borderRadius: '10px',
                        padding: '7px 13px',
                        marginRight: '1rem',
                      }}
                    >
                      <Radio
                        id={timeslot?.id}
                        value={timeslot.id}
                        color="primary"
                        size={2}
                        style={{
                          marginLeft: '2px',
                          fontSize: '2rem',
                          border: '1px solid black',
                          marginRight: '7px',
                        }}
                        name={'store'}
                        type={'secondary'}
                        disabled={
                          timeslot?.currentBookingCount ===
                          timeslot?.maximumBookingCount
                        }
                      >
                        {`${DateTime.fromISO(timeslot.startDateTime).toFormat(
                          'HH:mm'
                        )}`}
                      </Radio>
                    </div>
                  )
                })
              ) : (
                <p>???????????? ???????????? ????????????.</p>
              )}
            </Radio.Group>
          </div>
        </Grid.Container>
      </>
    )
  } else {
    return null
  }
}
