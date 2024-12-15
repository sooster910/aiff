/**
 * @generated SignedSource<<d391ab7e3b9d60e41b3c54cb2798d432>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type bookingQuery$variables = {
  storeId: string;
};
export type bookingQuery$data = {
  readonly store: {
    readonly _id: string;
    readonly description: string | null;
    readonly name: string;
  } | null;
  readonly " $fragmentSpreads": FragmentRefs<"StoreList_query">;
};
export type bookingQuery = {
  response: bookingQuery$data;
  variables: bookingQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "storeId"
  }
],
v1 = [
  {
    "fields": [
      {
        "kind": "Variable",
        "name": "_id",
        "variableName": "storeId"
      }
    ],
    "kind": "ObjectValue",
    "name": "where"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "_id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "bookingQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "StoreList_query"
      },
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Store",
        "kind": "LinkedField",
        "name": "store",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
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
          (v2/*: any*/),
          (v3/*: any*/),
          (v5/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Store",
        "kind": "LinkedField",
        "name": "store",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "0421660e2bf0b1eec54f844a463de820",
    "id": null,
    "metadata": {},
    "name": "bookingQuery",
    "operationKind": "query",
    "text": "query bookingQuery(\n  $storeId: String!\n) {\n  ...StoreList_query\n  store(where: {_id: $storeId}) {\n    _id\n    name\n    description\n    id\n  }\n}\n\nfragment StoreList_query on Query {\n  stores {\n    _id\n    name\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "f68560fd642be1917ddda52900b4f94b";

export default node;
