import * as React from "react";
import { useLazyLoadQuery } from "react-relay";
import { graphql } from "relay-runtime";
import dynamic from "next/dynamic";
import SuspenseWrapper from "@app/components/SuspenseWrapper";
import { initEnvironment } from "../../../relay/environment";
import fetchGraphQL from "../../../relay/fetchGraphQL";
export interface RelayProps {}

// const DynamicRelay = dynamic(() => import("@app/components/SuspenseRelay"), {
//   ssr: false,
//   loading: () => <p>loading...</p>,
// });
const DynamicBooking = dynamic(
  () => import("@app/components/SuspenseBooking"),
  { ssr: false, loading: () => <p>loading...</p> }
);

function Relay(props: RelayProps) {
  return (
    <>
      <h1>Relay Page on SSR </h1>
      <SuspenseWrapper fallback={<p>...loading</p>}>
        <DynamicBooking />
      </SuspenseWrapper>
    </>
  );
}

export default Relay;
