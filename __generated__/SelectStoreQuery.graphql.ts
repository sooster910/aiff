/**
 * @generated SignedSource<<a26e6721e7366ffc73ed3f10e864a703>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type Day = "FRI" | "MON" | "SAT" | "SUN" | "THU" | "TUE" | "WED" | "%future added value";
export type StoresFilterInput = {
  availableDays?: ReadonlyArray<Day> | null;
};
export type StoresWhereInput = {
  notUsedyet?: string | null;
};
export type SelectStoreQuery$variables = {
  a?: number | null;
  after?: string | null;
  filter?: StoresFilterInput | null;
  where?: StoresWhereInput | null;
};
export type SelectStoreQuery$data = {
  readonly stores: ReadonlyArray<{
    readonly address: string;
    readonly availableDays: ReadonlyArray<Day>;
    readonly description: string | null;
    readonly id: string;
    readonly name: string;
  }>;
};
export type SelectStoreQuery = {
  response: SelectStoreQuery$data;
  variables: SelectStoreQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "a"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "after"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "filter"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "where"
},
v4 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "after",
        "variableName": "after"
      },
      {
        "kind": "Variable",
        "name": "filter",
        "variableName": "filter"
      },
      {
        "kind": "Variable",
        "name": "first",
        "variableName": "a"
      },
      {
        "kind": "Variable",
        "name": "where",
        "variableName": "where"
      }
    ],
    "concreteType": "Store",
    "kind": "LinkedField",
    "name": "stores",
    "plural": true,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "address",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "availableDays",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "name",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "description",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "SelectStoreQuery",
    "selections": (v4/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v2/*: any*/),
      (v0/*: any*/),
      (v3/*: any*/)
    ],
    "kind": "Operation",
    "name": "SelectStoreQuery",
    "selections": (v4/*: any*/)
  },
  "params": {
    "cacheID": "c3bb6e21045f71c7a28808f15f292b43",
    "id": null,
    "metadata": {},
    "name": "SelectStoreQuery",
    "operationKind": "query",
    "text": "query SelectStoreQuery(\n  $after: String\n  $filter: StoresFilterInput\n  $a: Int\n  $where: StoresWhereInput\n) {\n  stores(after: $after, filter: $filter, first: $a, where: $where) {\n    address\n    availableDays\n    name\n    description\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "fa25ec3316aa6111cd2b88bb32bb40cc";

export default node;
