import { RegularClasses } from '@app/components/RegularClasses'
import { SelectDate } from '@app/components/SelectDate'
import { DateTime } from 'luxon'
import { useState, useTransition } from 'react'
import { graphql, useLazyLoadQuery } from 'react-relay'
import type { BookingClassFormQuery as BookingQueryType } from '../../../../__generated__/BookingClassFormQuery.graphql'

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

  function handleOnDayClick(selected: Date) {
    startTransition(() => {
      setQueryVariables((prev) => ({
        ...prev,
        date: DateTime.fromJSDate(selected).setZone('Asia/Seoul').toISODate(),
      }))
    })
  }

  return (
    <>
      {/* <StoreList queryRef={data} onChange={handleOnStoreClick} value={formik.values.store} /> */}
      <SelectDate
        onChange={handleOnDayClick}
        value={DateTime.fromISO(queryVariables.date).toJSDate()}
      />
      <RegularClasses regularClasses={data.stores[0]} />
    </>
  )
}
