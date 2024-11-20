import React from 'react';
import {graphql, useFragment} from "react-relay";
import type {StoreListFragment$key} from "../../../__generated__/StoreListFragment.graphql";


export const StoreListFragment = graphql`
    fragment StoreListFragment on Query {
        stores{ 
            id
            name
        }
    }
`;
export type StoreListProps={
    queryRef: StoreListFragment$key
}
function StoreList({queryRef}:StoreListProps) {
    const data = useFragment(StoreListFragment, queryRef);
    return (
    <><h1>StoreList</h1></>
    );
}

export default StoreList;