import React, { startTransition, Suspense, useState, useTransition } from 'react'
import { graphql, PreloadedQuery, usePreloadedQuery, useQueryLoader } from 'react-relay'
import StoreList, { StoreListFragment } from '@app/components/StoreList'
import { BookingQuery } from '@app/pages/booking'
import { bookingQuery as BookingQueryType } from '../../../../__generated__/bookingQuery.graphql'
import { useFormik } from 'formik'

import { SelectDate } from '@app/components/SelectDate'
import { DateTime } from 'luxon'
import { useRouter } from 'next/router'

type BookingClassFormProps = {
  queryRef: PreloadedQuery<BookingQueryType>
}

export const BookingClassFormFragment = graphql`
    fragment BookingClassForm_query on Query
    @argumentDefinitions(
        after: {type: "String"}
        first: {type: "Int!"}
        date: {type: "Date!"}
        storeId:{type:"String!"}
    ) {

        stores(where: {_id: $storeId}) {
            _id
            id
            name
            description
            ...RegularClassesFragment @arguments(after:$after, first:$first, date:$date)
        }
    }
`

function BookingClassForm({ queryRef }: BookingClassFormProps) {
  const router = useRouter()
  const data = usePreloadedQuery(BookingQuery, queryRef)

  console.log('BookingClassForm', data)
  const formik = useFormik({
    initialValues: {
      date: new Date(),
      store: '1',
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2))
    },
  })


  const handleOnDayClick = (day) => {

    formik.setFieldValue('date', day, true)
    const date = DateTime.fromJSDate(day).setZone('Asia/Seoul').toISODate()

    console.log('선택날짜', date)

  }

  const handleOnStoreClick = (storeId) => {
    formik.setFieldValue('store', storeId, true)
  }
  return (

    <form onSubmit={formik.handleSubmit}
          className={'flex flex-col items-center justify-center w-full'}>
      {/*<StoreList queryRef={data} onChange={handleOnStoreClick} value={formik.values.store} />*/}
      <SelectDate onChange={handleOnDayClick}
                  value={formik.values.date} />
      <Suspense fallback={<p>..classLoading</p>}>
        {/*<StoreDetail store={data.stores[0]} />*/}
        {/*<RegularClasses store={data.stores[0]} />*/}
      </Suspense>
    </form>

  )
}

export default BookingClassForm

