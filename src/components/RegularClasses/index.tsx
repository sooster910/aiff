import { LocationDetailLayout } from '@app/layouts/LocationDetailLayout'
import { Text } from '@geist-ui/core'
import { Clock } from '@geist-ui/icons'
import { graphql } from 'relay-compiler'
import { useFragment } from 'react-relay'
import type {
  RegularClassesFragment$key,
} from '../../../__generated__/RegularClassesFragment.graphql'
import { RegularClass } from '@app/components/RegularClass'


//TODO: fragment를 사용해야 함.
const regularClassesFragment = graphql`
    fragment RegularClassesFragment on Store{
        regularClasses(date: $date, first: $first){
            edges {
                cursor,
                node {
                    ...RegularClassFragment
                }
            }
        }
    }

`
type RegularClassesProps = {
  store: RegularClassesFragment$key
}
export const RegularClasses = ({ store }: RegularClassesProps) => {
  const data = useFragment(regularClassesFragment, store)
  return (
    <LocationDetailLayout>
      <div className={'flex items-center justify-start'}>
        <Clock size={24} />
        <Text>{'클래스/시간 선택'}</Text>
      </div>
      <div className={' mx-auto '}>

        {data.regularClasses.edges.map((edge, i) =>
          <RegularClass key={i} regularClass={edge.node} />,
        )}


      </div>
    </LocationDetailLayout>
  )
}
