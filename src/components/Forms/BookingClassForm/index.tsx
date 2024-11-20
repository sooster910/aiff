import React, {Suspense} from 'react';
import {graphql, usePreloadedQuery} from "react-relay";
import StoreList from "@app/components/StoreList";
import {BookingQuery} from "@app/pages/booking";




function BookingClassForm({queryRef}) {
    const data = usePreloadedQuery(BookingQuery, queryRef);
    console.log("BookingClassForm", data)

    return (
        <>
            <h1>BookingClassForm</h1>
            <StoreList queryRef={data}/>
        </>
    );
}

export default BookingClassForm;