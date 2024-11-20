import * as React from 'react'
import {useEffect} from 'react'
import {graphql, useLazyLoadQuery, usePreloadedQuery, useQueryLoader} from "react-relay";
import BookingClassForm from "@app/components/Forms/BookingClassForm";
import SuspenseWrapper from "@app/components/SuspenseWrapper";

interface ITestProps {}

export const BookingQuery = graphql`
    query bookingQuery{
        ...StoreListFragment
    }
`;

const BookingPage: React.FunctionComponent<ITestProps> = props => {
    const [queryRef, loadQuery] = useQueryLoader(BookingQuery)
    useEffect(()=>{
        if(!queryRef){
            loadQuery({})
        }
    },[])
  return (
    <>
      {/* A component that uses Suspense-based */}
        <h1>BookingPage</h1>
        <SuspenseWrapper fallback={<p>...loading</p>}>
            {queryRef && <BookingClassForm queryRef={queryRef} />}
        </SuspenseWrapper>
    </>
  )
}
export default BookingPage
