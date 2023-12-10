import * as React from 'react';
import { graphql, useLazyLoadQuery } from 'react-relay';
import useSWR from 'swr';
import {SuspenseRelayQuery}from "./../../../__generated__/SuspenseRelayQuery.graphql"

interface  SuspenseRelayProps {
}


const RelayQuery = graphql`
  query SuspenseRelayQuery{
   ping
  }
`
const SuspenseRelay: React.FunctionComponent<SuspenseRelayProps> = () => {
  console.log("RelayQuery",RelayQuery)
  const data = useLazyLoadQuery<SuspenseRelayQuery>(RelayQuery,{}) 
  //  const {data, error} = useSWR('https://jsonplaceholder.typicode.com/todos/1')
console.log("Data",data)
  
  return <>
    <div>
      <h1>SuspenseRelay {JSON.stringify(data)}</h1>
    </div>
  </>;
};

export default SuspenseRelay