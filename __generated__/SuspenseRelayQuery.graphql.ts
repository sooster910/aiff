/**
 * @generated SignedSource<<ea5786d4678ad90284299cefea36f6a6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type SuspenseRelayQuery$variables = Record<PropertyKey, never>;
export type SuspenseRelayQuery$data = {
  readonly ping: boolean;
};
export type SuspenseRelayQuery = {
  response: SuspenseRelayQuery$data;
  variables: SuspenseRelayQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "ping",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "SuspenseRelayQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "SuspenseRelayQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "4278738a65a87e6a06e1a2d147d47aad",
    "id": null,
    "metadata": {},
    "name": "SuspenseRelayQuery",
    "operationKind": "query",
    "text": "query SuspenseRelayQuery {\n  ping\n}\n"
  }
};
})();

(node as any).hash = "745a7844289c31894257597b269b4a3a";

export default node;
