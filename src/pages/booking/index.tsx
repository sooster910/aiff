import * as React from 'react'
import {useEffect} from 'react'
import {graphql, useLazyLoadQuery, usePreloadedQuery, useQueryLoader} from "react-relay";
import BookingClassForm from "@app/components/Forms/BookingClassForm";
import SuspenseWrapper from "@app/components/SuspenseWrapper";
import {bookingQuery as BookingQueryType} from "../../../__generated__/bookingQuery.graphql";
interface ITestProps {}

export const BookingQuery = graphql`
    query bookingQuery{
        ...StoreList_query
    }
`;


const BookingPage: React.FunctionComponent<ITestProps> = props => {
    const [queryRef, loadQuery] = useQueryLoader<BookingQueryType>(BookingQuery)
    useEffect(()=>{
        if(!queryRef){
            loadQuery({})
        }
    },[])

  return (
    <>
        <h1>BookingPage</h1>
      {/* A component that uses Suspense-based */}
        <SuspenseWrapper fallback={<p>...loading</p>}>
            {queryRef && <BookingClassForm queryRef={queryRef} />}
        </SuspenseWrapper>
    </>
  )
}
export default BookingPage
