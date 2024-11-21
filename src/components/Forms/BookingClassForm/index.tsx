import React from 'react';
import { PreloadedQuery, usePreloadedQuery} from "react-relay";
import StoreList from "@app/components/StoreList";
import {BookingQuery} from "@app/pages/booking";
import {bookingQuery as BookingQueryType} from "../../../../__generated__/bookingQuery.graphql";

type BookingClassFormProps = {
    queryRef: PreloadedQuery<BookingQueryType>
}

function BookingClassForm({queryRef}:BookingClassFormProps) {
    const data = usePreloadedQuery(BookingQuery, queryRef);

    return (
        <>
            <h1>BookingClassForm</h1>
            <StoreList queryRef={data}/>
        </>
    );
}

export default BookingClassForm;