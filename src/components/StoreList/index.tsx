import { graphql, useFragment } from 'react-relay'
import { StoreList_query$key } from '../../../__generated__/StoreList_query.graphql'
import { Button, Select, SelectItem } from '@nextui-org/react'
import { config } from '@app/config'
import { FormikProps, FormikValues } from 'formik'
import { FormValues } from '@app/components/SuspenseBooking'


export const StoreListFragment = graphql`
    fragment StoreList_query on Query {
        stores{
            _id
            name
        }
    }
`

type StoreListProps = {
  queryRef: StoreList_query$key,
  value: FormikProps<FormValues>['values']['store']
  onChange: (id) => void
}

function StoreList({ queryRef, value, onChange }: StoreListProps) {
  const storeList = useFragment(StoreListFragment, queryRef)
  const availableStores = storeList.stores.filter((store) => config.CURRENT_AVAILABLE_STORE.includes(store.name))

  return (
    <Select className="max-w-xs" selectedKeys={value} onSelectionChange={onChange}
            variant={'underlined'}>
      {availableStores.map((store) => (
        <SelectItem key={store._id}>{store.name}</SelectItem>
      ))}
    </Select>
  )
}

export default StoreList