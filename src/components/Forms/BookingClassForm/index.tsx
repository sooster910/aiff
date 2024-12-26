import { RegularClasses } from '@app/components/RegularClasses'
import { SelectDate } from '@app/components/SelectDate'
import SuspenseWrapper from '@app/components/SuspenseWrapper'
import { useFormik } from 'formik'
import { DateTime } from 'luxon'
import { useState, useTransition } from 'react'
import { graphql, PreloadedQuery, useLazyLoadQuery } from 'react-relay'
import type { BookingClassFormQuery as BookingQueryType } from '../../../../__generated__/BookingClassFormQuery.graphql'

type BookingClassFormProps = {
  queryRef: PreloadedQuery<BookingQueryType>
}

export const BookingClassFormQuery = graphql`
  query BookingClassFormQuery($storeId: String!, $date: Date!) {
    stores(where: { _id: $storeId }) {
      _id
      id
      description
      ...RegularClassesFragment @arguments(date: $date, after: null, first: 2)
    }
  }
`
export type FormValues = {
  date: Date
  store: string //TODO literal type으로 변경
}

export const BookingClassForm = () => {
  const [isPending, startTransition] = useTransition()
  const [queryVariables, setQueryVariables] = useState({
    storeId: '1',
    date: DateTime.now().setZone('Asia/Seoul').toISODate(),
  })
  const data = useLazyLoadQuery<BookingQueryType>(
    BookingClassFormQuery,
    queryVariables
  )
  const formik = useFormik<FormValues>({
    initialValues: {
      date: new Date(),
      store: '1',
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2))
    },
  })

  const handleOnStoreClick = (storeId) => {
    formik.setFieldValue('store', storeId, true)
  }

  function handleOnDayClick(selected: Date) {
    startTransition(() => {
      setQueryVariables((prev) => ({
        ...prev,
        date: DateTime.fromJSDate(selected).setZone('Asia/Seoul').toISODate(),
      }))
    })
    // formik.setFieldValue('date', selected, true)
  }

  return (
    <form
      onSubmit={formik.handleSubmit}
      className={'relative flex-1 flex-col items-center justify-center w-full'}
    >
      {/* <StoreList queryRef={data} onChange={handleOnStoreClick} value={formik.values.store} /> */}
      <SelectDate
        onChange={handleOnDayClick}
        value={DateTime.fromISO(queryVariables.date).toJSDate()}
      />

      <RegularClasses regularClasses={data.stores[0]} />

      {/*<StoreDetail store={data.stores[0]} />*/}
    </form>
  )
}
