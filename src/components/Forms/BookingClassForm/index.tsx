import React, { startTransition, Suspense, useState, useTransition } from 'react'
import { graphql, PreloadedQuery, usePreloadedQuery, useQueryLoader } from 'react-relay'
import StoreList, { StoreListFragment } from '@app/components/StoreList'
import { BookingQuery } from '@app/pages/booking'
import { bookingQuery as BookingQueryType } from '../../../../__generated__/bookingQuery.graphql'
import { useFormik } from 'formik'

import { SelectDate } from '@app/components/SelectDate'
import { DateTime } from 'luxon'
import { useRouter } from 'next/router'
import { Store } from '@app/components/Store'

type BookingClassFormProps = {
  queryRef: PreloadedQuery<BookingQueryType>
}


function BookingClassForm({ queryRef }: BookingClassFormProps) {
  const router = useRouter()
  const data = usePreloadedQuery(BookingQuery, queryRef)

  console.log('data', data)
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

    startTransition(() => {
      formik.setFieldValue('date', day, true)
    })
    const date = DateTime.fromJSDate(day).setZone('Asia/Seoul').toISODate()

    console.log('선택날짜', date)

  }

  const handleOnStoreClick = (storeId) => {
    formik.setFieldValue('store', storeId, true)
    router.replace({
      pathname: '/booking',
      query: { ...router.query, storeId },
    })
  }
  return (

    <form onSubmit={formik.handleSubmit}
          className={'flex flex-col items-center justify-center w-full'}>
      <StoreList queryRef={data} onChange={handleOnStoreClick} value={formik.values.store} />
      <SelectDate onChange={handleOnDayClick}
                  value={formik.values.date} />
      <Suspense fallback={<p>..classLoading</p>}>
        <Store storeId={formik.values.store} selectedDate={formik.values.date} />
      </Suspense>
    </form>

  )
}

export default BookingClassForm

