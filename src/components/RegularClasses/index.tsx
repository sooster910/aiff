import { RegularClass } from '@app/components/RegularClass'
import { LocationDetailLayout } from '@app/layouts/LocationDetailLayout'
import { Text } from '@geist-ui/core'
import { Clock } from '@geist-ui/icons'
import { usePaginationFragment } from 'react-relay'
import { graphql } from 'relay-compiler'
import { RegularClassesFragment$key } from '../../../__generated__/RegularClassesFragment.graphql'

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
  console.log('regularClassesPagination', data)
  const handleLoadMore = () => {
    if (hasNext && !isLoadingNext) {
      loadNext(1)
    }
  }
  return (
    <LocationDetailLayout>
      <div className={'flex items-center justify-start'}>
        <Clock size={24} />
        <Text>{'클래스/시간 선택'}</Text>
      </div>
      <div className={' mx-auto '}>
        {data.regularClasses.edges.map((edge, i) => (
          <RegularClass key={i} regularClass={edge.node} />
        ))}
      </div>
      {hasNext && (
        <button
          onClick={handleLoadMore}
          disabled={isLoadingNext}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          {isLoadingNext ? '로딩 중...' : '더 보기'}
        </button>
      )}
    </LocationDetailLayout>
  )
}
