// import { useLazyLoadQuery } from 'react-relay'
// import { graphql } from 'relay-runtime'
import BookingForm from '../Forms/BookingForm'
import { aiffAPI } from '../../utils/aiffAPI'
// import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { StoreDTO } from '../../types/store'
import { Spinner } from '@geist-ui/core'
import { BookingFormTest } from '../Forms/BookingFormTest'
import { DateTime } from 'luxon'
interface SuspenseBookingProps {}

const SuspenseBooking: React.FunctionComponent<SuspenseBookingProps> = ({}) => {
  // const storeData = useLazyLoadQuery(
  //   graphql`
  //     query SuspenseBookingStoresQuery(
  //       $first: Int!
  //       $where: StoresWhereInput!
  //     ) {
  //       stores(first: $first, where: $where) {
  //         _id
  //         name
  //         address
  //         description
  //         holidays
  //         availableDays
  //         breakTimes
  //         openTime
  //         closeTime
  //         regularClasses {
  //           _id
  //           name
  //           price
  //           storeId
  //           duration
  //           maximumClassSize
  //           minimumClassSize
  //         }
  //       }
  //     }
  //   `,
  //   { first: 100, where: { notUsedyet: '' } }
  // )

  // const [commitMutation] = useMutation(mutation)
  // const clickHandler = () => {
  //   const data = useLazyLoadQuery(
  //     graphql`
  //       query AppQuery($id: ID!) {
  //         user(id: $id) {
  //           name
  //         }
  //       }
  //     `,
  //     { id: '1' },
  //     { fetchPolicy: 'store-or-network' }
  //   )
  // }

  return (
    <>
      {' '}
      <main style={{ padding: '4rem 0' }}>
        <h1>Booking</h1>
        <BookingFormTest />
      </main>
    </>
  )
}
export default SuspenseBooking
