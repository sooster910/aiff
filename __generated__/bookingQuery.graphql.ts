/**
 * @generated SignedSource<<915181b4914b0340bf22da92830c1cc1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type bookingQuery$variables = {};
export type bookingQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"StoreListFragment">;
};
export type bookingQuery = {
  response: bookingQuery$data;
  variables: bookingQuery$variables;
};

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "bookingQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "StoreListFragment"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "bookingQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Store",
        "kind": "LinkedField",
        "name": "stores",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "name",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "8057724fa9b3bbee43b96dbfe419e5a6",
    "id": null,
    "metadata": {},
    "name": "bookingQuery",
    "operationKind": "query",
    "text": "query bookingQuery {\n  ...StoreListFragment\n}\n\nfragment StoreListFragment on Query {\n  stores {\n    id\n    name\n  }\n}\n"
  }
};

(node as any).hash = "881b545f9a191241369bac6ec29dd7b0";

export default node;
