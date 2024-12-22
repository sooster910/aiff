import * as React from 'react'
import { useEffect } from 'react'
import { graphql, useQueryLoader } from 'react-relay'
import BookingClassForm from '@app/components/Forms/BookingClassForm'
import SuspenseWrapper from '@app/components/SuspenseWrapper'
import { bookingQuery as BookingQueryType } from '../../../__generated__/bookingQuery.graphql'
import { DateTime } from 'luxon'

export const BookingQuery = graphql`
    query bookingQuery( $after: String, $first: Int!, $date: Date!, $storeId: String!) {
      
        ...BookingClassForm_query @arguments(after: $after, first: $first, date: $date, storeId:$storeId)
    }
`


const BookingPage = () => {
  const [queryRef, loadQuery] = useQueryLoader<BookingQueryType>(BookingQuery)
  const initialValues = {
    storeId: '1',
    date: DateTime.now().setZone('Asia/Seoul').toISODate(),
    after: null,
    first: 1,
  }

  if (queryRef == null) {
    loadQuery(initialValues)
    return <p>...loading</p>
  }

  return (
    <>
      {/* A component that uses Suspense-based */}

      <SuspenseWrapper fallback={<p>...loading</p>}>
        {queryRef && <BookingClassForm queryRef={queryRef} />}
      </SuspenseWrapper>
    </>
  )
}
export default BookingPage
