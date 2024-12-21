import { graphql } from 'relay-compiler'
import { useLazyLoadQuery } from 'react-relay'
import type { StoreQuery } from '../../../__generated__/StoreQuery.graphql'
import { StoreDetail } from '@app/components/StoreDetail'
import { RegularClasses } from '@app/components/RegularClasses'
import { useRouter } from 'next/router'
import { DateTime } from 'luxon'
import { FormikState } from 'formik'

type StoreProps = {
  storeId: string
  selectedDate: Date
}
const storeQuery = graphql`
    query StoreQuery(
        $storeId: String!,
        $date:Date!
    ){
        stores(where: {_id: $storeId}){
            ...StoreDetailFragment
            ...RegularClassesFragment @arguments(selectedDate: $date)
        }
    }
`

export const Store = ({ storeId, selectedDate }: StoreProps) => {
  const router = useRouter()
  const data = useLazyLoadQuery<StoreQuery>(storeQuery, {
    storeId,
    date: DateTime.fromJSDate(selectedDate).setZone('Asia/Seoul').toISODate(),
  })
  return (
    <div>
      <h1>Store Component</h1>
      <StoreDetail store={data.stores[0]} />
      <RegularClasses store={data.stores[0]} />
    </div>
  )
}

