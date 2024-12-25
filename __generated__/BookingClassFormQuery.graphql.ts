/**
 * @generated SignedSource<<ad2879a075c79bd95977c98d86cde207>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type BookingClassFormQuery$variables = {
  date: any;
  storeId: string;
};
export type BookingClassFormQuery$data = {
  readonly stores: ReadonlyArray<{
    readonly _id: string;
    readonly description: string | null | undefined;
    readonly id: string;
    readonly " $fragmentSpreads": FragmentRefs<"RegularClassesFragment">;
  }>;
};
export type BookingClassFormQuery = {
  response: BookingClassFormQuery$data;
  variables: BookingClassFormQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "date"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "storeId"
},
v2 = [
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
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "_id",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
},
v6 = {
  "kind": "Variable",
  "name": "date",
  "variableName": "date"
},
v7 = [
  (v6/*: any*/),
  {
    "kind": "Literal",
    "name": "first",
    "value": 1
  }
],
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "price",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "BookingClassFormQuery",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "Store",
        "kind": "LinkedField",
        "name": "stores",
        "plural": true,
        "selections": [
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          {
            "args": [
              (v6/*: any*/)
            ],
            "kind": "FragmentSpread",
            "name": "RegularClassesFragment"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "BookingClassFormQuery",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "Store",
        "kind": "LinkedField",
        "name": "stores",
        "plural": true,
        "selections": [
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          {
            "alias": null,
            "args": (v7/*: any*/),
            "concreteType": "RegularClassConnection",
            "kind": "LinkedField",
            "name": "regularClasses",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "RegularClassEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "cursor",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "RegularClass",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v3/*: any*/),
                      (v4/*: any*/),
                      (v8/*: any*/),
                      (v5/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "maximumClassSize",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Image",
                        "kind": "LinkedField",
                        "name": "imageURL",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "altText",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "url",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": [
                          {
                            "fields": [
                              {
                                "kind": "Variable",
                                "name": "day",
                                "variableName": "date"
                              }
                            ],
                            "kind": "ObjectValue",
                            "name": "where"
                          }
                        ],
                        "concreteType": "TimeSlot",
                        "kind": "LinkedField",
                        "name": "timeSlots",
                        "plural": true,
                        "selections": [
                          (v3/*: any*/),
                          (v4/*: any*/),
                          (v8/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "startDateTime",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "endDateTime",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "regularClassId",
                            "storageKey": null
                          },
                          (v9/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "currentBookingCount",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "maximumBookingCount",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "RegularClass",
                            "kind": "LinkedField",
                            "name": "regularClass",
                            "plural": false,
                            "selections": [
                              (v3/*: any*/),
                              (v5/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "duration",
                                "storageKey": null
                              },
                              (v8/*: any*/),
                              (v9/*: any*/),
                              (v4/*: any*/)
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "__typename",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "PageInfo",
                "kind": "LinkedField",
                "name": "pageInfo",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "hasNextPage",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "endCursor",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v7/*: any*/),
            "filters": [
              "date"
            ],
            "handle": "connection",
            "key": "RegularClasses_regularClasses",
            "kind": "LinkedHandle",
            "name": "regularClasses"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "6bcbf2c961dafb855b9a3312d8d19430",
    "id": null,
    "metadata": {},
    "name": "BookingClassFormQuery",
    "operationKind": "query",
    "text": "query BookingClassFormQuery(\n  $storeId: String!\n  $date: Date!\n) {\n  stores(where: {_id: $storeId}) {\n    _id\n    id\n    description\n    ...RegularClassesFragment_19b1FI\n  }\n}\n\nfragment RegularClassFragment_19b1FI on RegularClass {\n  _id\n  id\n  name\n  description\n  maximumClassSize\n  imageURL {\n    altText\n    url\n  }\n  timeSlots(where: {day: $date}) {\n    ...TimeSlotFragment\n    id\n  }\n}\n\nfragment RegularClassesFragment_19b1FI on Store {\n  regularClasses(date: $date, first: 1) {\n    edges {\n      cursor\n      node {\n        ...RegularClassFragment_19b1FI\n        id\n        __typename\n      }\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n  id\n}\n\nfragment TimeSlotFragment on TimeSlot {\n  _id\n  id\n  name\n  startDateTime\n  endDateTime\n  regularClassId\n  price\n  currentBookingCount\n  maximumBookingCount\n  regularClass {\n    _id\n    description\n    duration\n    name\n    price\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "a3a6d062f3b36a2c3ea1b470146bf2ac";

export default node;
