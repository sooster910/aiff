import React from 'react';
import {graphql, useFragment} from "react-relay";
import {StoreList_query$key} from "../../../__generated__/StoreList_query.graphql";


export const StoreListFragment = graphql`
    fragment StoreList_query on Query {
        stores{ 
            id
            name
        }
    }
`;

function StoreList({queryRef}:{queryRef:StoreList_query$key}) {
    const storeList = useFragment(StoreListFragment, queryRef);
    return (
    <><h1>StoreList</h1></>

    );
}

export default StoreList;