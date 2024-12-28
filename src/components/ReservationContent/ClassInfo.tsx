import { useFragment } from 'react-relay'
import { TimeSlotFragment$key } from '../../../__generated__/TimeSlotFragment.graphql'
import { TimeSlotFragment } from '../TimeSlot'

type ClassInfo = {
  image: string
  type: string
  title: string
  time: string
  description: string
}

type ClassInfoProps = {
  queryData: TimeSlotFragment$key
}

export const ClassInfo = ({ queryData }: ClassInfoProps) => {
  const data = useFragment(TimeSlotFragment, queryData)

  return (
    <div className="space-y-4 mb-6">
      <div className="space-y-2">
        <div className="text-sm text-gray-500">{/* selectedDate */}</div>
        <h3 className="text-xl font-semibold">{data.name}</h3>
        <div className="inline-block px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm">
          {data.startDateTime}
        </div>
        <p className="text-gray-700 mt-2">{data.regularClass.description}</p>
      </div>
    </div>
  )
}
