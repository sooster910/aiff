import { graphql } from 'relay-compiler'
import { useLazyLoadQuery } from 'react-relay'
import type { StoreQuery } from '../../../__generated__/StoreQuery.graphql'
import { StoreDetail } from '@app/components/StoreDetail'
import { RegularClasses } from '@app/components/RegularClasses'
import { useRouter } from 'next/router'
import { DateTime } from 'luxon'

type StoreProps = {
  storeId: string
}
const storeQuery = graphql`
    query StoreQuery(
        $storeId: String!,
        $date: Date!,
        $first: Int
    ){
        stores(where: {_id: $storeId}){
            ...StoreDetailFragment
            ...RegularClassesFragment
        }
    }
`

export const Store = ({ storeId }: StoreProps) => {
  const router = useRouter()
  const date = router.query.date || DateTime.now().setZone('Asia/Seoul').toISODate()

  const data = useLazyLoadQuery<StoreQuery>(storeQuery, { storeId, date, first: 2 })
  return (
    <div>
      <h1>Store Component</h1>
      <StoreDetail store={data.stores[0]} />
      <RegularClasses store={data.stores[0]} />
    </div>
  )
}

