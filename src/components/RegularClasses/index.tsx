import { RegularClass } from '@app/components/RegularClass'
import { LocationDetailLayout } from '@app/layouts/LocationDetailLayout'
import { Clock } from '@geist-ui/icons'
import { usePaginationFragment } from 'react-relay'
import { graphql } from 'relay-compiler'
import { RegularClassesFragment$key } from '../../../__generated__/RegularClassesFragment.graphql'
import { InfiniteScrollTrigger } from '../InfiniteScrollTrigger'

const regularClassesFragment = graphql`
  fragment RegularClassesFragment on Store
  @refetchable(queryName: "RegularClassesPaginationQuery")
  @argumentDefinitions(
    after: { type: "String" }
    date: { type: "Date!" }
    first: { type: "Int", defaultValue: 1 }
  ) {
    regularClasses(date: $date, after: $after, first: $first)
      @connection(key: "RegularClasses_regularClasses") {
      edges {
        cursor
        node {
          id
          _id
          ...RegularClassFragment @arguments(date: $date)
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`
type RegularClassesProps = {
  regularClasses: RegularClassesFragment$key
}
export const RegularClasses = ({ regularClasses }: RegularClassesProps) => {
  const { data, loadNext, hasNext, isLoadingNext } = usePaginationFragment(
    regularClassesFragment,
    regularClasses
  )

  const onEndReached = () => {
    if (hasNext && !isLoadingNext) {
      loadNext(1)
    }
  }

  return (
    <LocationDetailLayout>
      <div className={'flex items-center justify-start'}>
        <Clock size={24} />
        <p>{'클래스/시간 선택'}</p>
      </div>
      <div className={'relative mx-auto py-4 mb-10 min-h-[400px] '}>
        <div className={'flex flex-col items-center'}>
          {data.regularClasses.edges.map((edge, i) => (
            <RegularClass key={i} regularClass={edge.node} />
          ))}
        </div>
      </div>
      <InfiniteScrollTrigger
        onEndReached={onEndReached}
        hasNext={hasNext}
        isLoadingNext={isLoadingNext}
      />
    </LocationDetailLayout>
  )
}
