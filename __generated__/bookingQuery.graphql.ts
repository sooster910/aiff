/**
 * @generated SignedSource<<48c233dad94768d7a9df30d4eb427e62>>
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
  readonly " $fragmentSpreads": FragmentRefs<"StoreList_query">;
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
        "name": "StoreList_query"
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
    "cacheID": "6006bfb9dbe7acfe1b9686e1543aa45d",
    "id": null,
    "metadata": {},
    "name": "bookingQuery",
    "operationKind": "query",
    "text": "query bookingQuery {\n  ...StoreList_query\n}\n\nfragment StoreList_query on Query {\n  stores {\n    id\n    name\n  }\n}\n"
  }
};

(node as any).hash = "a3ff7e1876d9f28751d87ea4d4f8c911";

export default node;
