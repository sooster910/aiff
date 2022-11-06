// import { ScheduleTableAvailableTimeSlotQuery } from '@app/../__generated__/ScheduleTableAvailableTimeSlotQuery.graphql'
import {
  Table,
  Toggle,
  Text,
  Button,
  useToasts,
  Slider,
  Loading,
} from '@geist-ui/core'
import { DateTime } from 'luxon'
import { useRouter } from 'next/router'
import * as React from 'react'
import { useLazyLoadQuery, useMutation } from 'react-relay'
import { TimeSlotDTO } from '../../types/timeslot'
import { TimeSlotStatus } from '@app/types/timeslot'
import { graphql } from 'babel-plugin-relay/macro'
import { aiffAPI } from '@app/utils/aiffAPI'
import useSWR from 'swr'
import { aiffAPISSR } from '../../utils/aiffAPI'
import axios from 'axios'

interface ScheduleTableProps {
  selectedDate: string
  selectedStore: string
}
export const time = [
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
] as const

export const STORE = {
  '1': '용산점',
  '2': '판교점',
  '3': '광교점',
  '4': '광명점',
  '5': '위례점',
} as const
export const fetcher = url => fetch(url).then(r => r.json())

export const ScheduleTable: React.FunctionComponent<ScheduleTableProps> = ({
  selectedDate,
  selectedStore,
}) => {
  console.log('schedule table')
  const router = useRouter()
  const { setToast } = useToasts()

  const { data: storeData, error } = useSWR(
    `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/timeSlotByDay?selectedDate=${selectedDate}&selectedStore=${selectedStore}`,
    url => fetcher(url)
  )

  //fetcher

  // const storeData = useLazyLoadQuery<ScheduleTableAvailableTimeSlotQuery>(
  //   graphql`
  //     query ScheduleTableAvailableTimeSlotQuery(
  //       $where: AvailableTimeSlotsByDateInput!
  //     ) {
  //       admin {
  //         availableTimeSlotsByDate(where: $where) {
  //           _id
  //           id
  //           maximumBookingCount
  //           currentBookingCount
  //           startDateTime
  //           storeId
  //           regularClassId
  //           isHoliday
  //           isBusinessDay
  //           status
  //           price
  //           isUnset
  //           regularClass {
  //             name
  //           }
  //         }
  //       }
  //     }
  //   `,
  //   {
  //     where: { date: selectedDate, store: selectedStore },
  //   }
  // )
  console.log('storeData', storeData)
  let dataSource
  if (storeData) {
    //   console.log('Storedata', storeData.availableTimeSlotsByDate)
    dataSource = time.map((t, i) => {
      const dataBytime =
        storeData.length &&
        storeData?.find((s, i) => {
          return DateTime.fromISO(s?.startDateTime)
            .toLocaleString(DateTime.TIME_24_SIMPLE)
            .includes(t)
        })

      return {
        time: t,
        startDateTime: dataBytime?.startDateTime ?? '-',
        timeSlotId: dataBytime?._id ?? '-',
        regularClassName: dataBytime?.regularClass?.name ?? '-',
        maximumBookingCount: dataBytime?.maximumBookingCount ?? '-',
        currentBookingCount: dataBytime?.currentBookingCount ?? 0,
        price: dataBytime?.price ?? '-',
        isHoliday: dataBytime?.isHoliday ?? '-',
        isBusinessDay: dataBytime?.isBusinessDay ?? '-',
        status: dataBytime?.status ?? '-',
        isUnset: dataBytime?.isUnset ?? true,
        regularClassId: dataBytime?.regularClassId ?? '-',
      }
    })

    console.log('datasourc', dataSource)
  }
  // const [commitMutation, isMutationInFlight] = useMutation(
  //   graphql`
  //     mutation ScheduleTableMutation($input: AddTimeSlotInput!) {
  //       admin {
  //         addTimeSlot(data: $input) {
  //           isUpdated
  //         }
  //       }
  //     }
  //   `
  // )

  // console.log(res['11:00'])
  //TODO:
  // const dataSource = time?.map((v, i) => {
  //   const row = {}
  //   res[v]?.map((r, i) => {
  //     row['time'] = v
  //     row[r.storeId] = `${r.regularClass.name} - ${r._id}`
  //   })
  //   return row
  // })

  //   console.log('Res', res)

  // const [data, setData] = React.useState(dataSource)
  const renderAction = (value, rawData, action) => {
    // console.log('VALUE', value)
    console.log('rawdadta.status', rawData.status === 'ON_SALE')
    const toggleHandler = async e => {
      //TODO: CLASS의 currentBookingCount >0 일 경우 NOT ALLOW 할지 의논 필요
      console.log('dd')
      //sotreId, startDateTime, 시간 , 날짜
      console.log('value', value)
      console.log('rawData', rawData)
      const isOnSale = e?.target?.checked

      const {
        timeSlotId,
        currentBookingCount,
        isBusinessDay,
        isHoliday,
        isUnset,
        maximumBookingCount,
        price,
        regularClassId,
        time,
      } = rawData
      console.log('selectedDate', selectedDate)

      const rawResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/timeSlotByDay?selectedDate=${selectedDate}&selectedStore=${selectedStore}`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            timeSlotId,
            storeId: Number(selectedStore),
            regularClassId: Number(regularClassId),
            duration: 60,
            startDateTime: DateTime.fromISO(selectedDate)
              .set({ hour: time.split(':')[0] })
              .toISO(),
            endDateTime: DateTime.fromISO(selectedDate)
              .set({ hour: time.split(':')[0] })
              .plus({ hours: 1 })
              .toISO(),
            status: isOnSale
              ? TimeSlotStatus.OnSale
              : TimeSlotStatus.TemporaryBreak,
            price: price,
            maximumBookingCount: maximumBookingCount,
          }),
        }
      )
      const content = await rawResponse.json()

      console.log(content)
      // commitMutation({
      //   variables: {
      //     input: {
      //       timeSlotId,
      //       storeId: Number(selectedStore),
      //       regularClassId: Number(regularClassId),
      //       duration: 60,
      //       startDateTime: DateTime.fromISO(selectedDate)
      //         .set({ hour: time.split(':')[0] })
      //         .toISO(),
      //       endDateTime: DateTime.fromISO(selectedDate)
      //         .set({ hour: time.split(':')[0] })
      //         .plus({ hours: 1 })
      //         .toISO(),
      //       status: isOnSale
      //         ? TimeSlotStatus.OnSale
      //         : TimeSlotStatus.TemporaryBreak,
      //       price: price,
      //       maximumBookingCount: maximumBookingCount,
      //     },
      //   },
      // })
      //   setData(last => last.filter((_, dataIndex) => dataIndex !== index))
    }

    return (
      <div>
        <p>{''}</p>
        <Toggle
          checked={!!(rawData?.status === 'ON_SALE')}
          type="error"
          scale={3 / 3}
          onChange={toggleHandler}
          style={{ width: '40px', height: '40px' }}
        />
      </div>
    )
  }
  const renderModifyingAction = (value, rawData, action) => {
    // console.log('renderModifyingAction', rawData, action, value)
    const clickButtonHandler = () => {
      // console.log('click button handler')
      // console.log('rawData', rawData)
      const { timeSlotId, time } = rawData
      const dynamicTimeSlotId = timeSlotId === '-' ? 'new' : timeSlotId
      // console.log('selectedStore', selectedStore)
      if (!selectedStore) {
        return setToast({
          text: '가맹점을 선택해 주세요.!',
          type: 'error',
        })
      }

      const startDateTime = DateTime.fromISO(selectedDate)
        .set({
          hour: Number(time.split(':')[0]),
        })
        .toISO()
      router.push(
        `/adminDashboard/${dynamicTimeSlotId}/${startDateTime}/${selectedStore}`
      )
    }
    return (
      <div>
        <Button
          type="warning"
          scale={3 / 3}
          onClick={clickButtonHandler}
          style={{ width: '40px', height: '40px' }}
        >
          변경
        </Button>
      </div>
    )
  }
  const handleTableDataChange = v => {
    console.log('table data chaged', v)
  }
  if (error) return <p> 데이터를 잘 못 불러왔습니다. </p>
  if (!storeData)
    return (
      <>
        <Loading />
      </>
    )
  if (dataSource) {
    return (
      <>
        <Table
          data={dataSource}
          // onChange={value => handleTableDataChange(value)}
          style={{ marginTop: '3rem' }}
          // onCell={value => console.log('on cell', value)}
        >
          <Table.Column prop="time" label="시간" />
          <Table.Column prop="timeSlotId" label={'TimeSlotId'} width={150} />
          <Table.Column
            prop="regularClassName"
            label={'클래스명'}
            width={150}
          />

          <Table.Column
            prop="maximumBookingCount"
            label={'예약 가능 최대 인원'}
            width={150}
          />
          <Table.Column
            prop="currentBookingCount"
            label={'현재 예약된 인원'}
            width={150}
          />
          <Table.Column prop="price" label={'가격'} width={150} />
          <Table.Column
            prop="status"
            label={'클래스 운영 여부 ON_SALE / TEMPORARY_BREAK'}
            width={150}
          />
          <Table.Column
            prop="5"
            label={'클래스 운영 여부 설정'}
            width={150}
            render={renderAction}
          />
          <Table.Column
            prop="6"
            label={'생성/변경'}
            width={150}
            render={renderModifyingAction}
          />
        </Table>
      </>
    )
  }
}
