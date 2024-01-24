import { useMemo } from "react";
import { Environment, Network, RecordSource, Store } from "relay-runtime";
import type { FetchFunction } from "relay-runtime";

import fetchGraphQL from "./fetchGraphQL";

let relayEnvironment: Environment;

const fetchRelay: FetchFunction = async (params, variables) => {
  console.log(`fetch query ${params.name} with ${JSON.stringify(variables)}`);
  return fetchGraphQL(params?.text as string, variables);
};

const createEnvironment = () => {
  return new Environment({
    network: Network.create(fetchRelay),
    store: new Store(new RecordSource()),
  });
};

type InitialRecords = ConstructorParameters<typeof RecordSource>[number];
export const initEnvironment = (initialRecords?: InitialRecords) => {
  const environment = relayEnvironment ?? createEnvironment(); // #1

  if (initialRecords) {
    environment.getStore().publish(new RecordSource(initialRecords)); // #2
  }

  if (typeof window === "undefined") return environment; // #3

  if (!relayEnvironment) {
    relayEnvironment = environment; // #4
  }

  return relayEnvironment;
};

export const useEnvironment = (initialRecords: InitialRecords) => {
  const relayEnvironment = useMemo(
    () => initEnvironment(initialRecords),
    [initialRecords]
  );
  return relayEnvironment;
};
