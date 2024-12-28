/**
 * @generated SignedSource<<169048d5e9b229cf4d39bbcbb23dc04e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RegularClassesPaginationQuery$variables = {
  after?: string | null | undefined;
  date: any;
  first?: number | null | undefined;
  id: string;
};
export type RegularClassesPaginationQuery$data = {
  readonly node: {
    readonly " $fragmentSpreads": FragmentRefs<"RegularClassesFragment">;
  } | null | undefined;
};
export type RegularClassesPaginationQuery = {
  response: RegularClassesPaginationQuery$data;
  variables: RegularClassesPaginationQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "after"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "date"
  },
  {
    "defaultValue": 1,
    "kind": "LocalArgument",
    "name": "first"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "after"
  },
  {
    "kind": "Variable",
    "name": "date",
    "variableName": "date"
  },
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "first"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
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
  "name": "_id",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "price",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "RegularClassesPaginationQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "args": (v2/*: any*/),
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "RegularClassesPaginationQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "alias": null,
                "args": (v2/*: any*/),
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
                          (v4/*: any*/),
                          (v5/*: any*/),
                          (v6/*: any*/),
                          (v7/*: any*/),
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
                              (v5/*: any*/),
                              (v4/*: any*/),
                              (v6/*: any*/),
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
                              (v8/*: any*/),
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
                                  (v5/*: any*/),
                                  (v7/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "duration",
                                    "storageKey": null
                                  },
                                  (v6/*: any*/),
                                  (v8/*: any*/),
                                  (v4/*: any*/)
                                ],
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          },
                          (v3/*: any*/)
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
                "args": (v2/*: any*/),
                "filters": [
                  "date"
                ],
                "handle": "connection",
                "key": "RegularClasses_regularClasses",
                "kind": "LinkedHandle",
                "name": "regularClasses"
              }
            ],
            "type": "Store",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "406eede102c925e48c93a201af2683cf",
    "id": null,
    "metadata": {},
    "name": "RegularClassesPaginationQuery",
    "operationKind": "query",
    "text": "query RegularClassesPaginationQuery(\n  $after: String\n  $date: Date!\n  $first: Int = 1\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ...RegularClassesFragment_1x4vzc\n    id\n  }\n}\n\nfragment RegularClassFragment_19b1FI on RegularClass {\n  _id\n  id\n  name\n  description\n  maximumClassSize\n  imageURL {\n    altText\n    url\n  }\n  timeSlots(where: {day: $date}) {\n    ...TimeSlotFragment\n    id\n  }\n}\n\nfragment RegularClassesFragment_1x4vzc on Store {\n  regularClasses(date: $date, after: $after, first: $first) {\n    edges {\n      cursor\n      node {\n        id\n        _id\n        ...RegularClassFragment_19b1FI\n        __typename\n      }\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n  id\n}\n\nfragment TimeSlotFragment on TimeSlot {\n  _id\n  id\n  name\n  startDateTime\n  endDateTime\n  regularClassId\n  price\n  currentBookingCount\n  maximumBookingCount\n  regularClass {\n    _id\n    description\n    duration\n    name\n    price\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "f65c843bab13cc846e8fcb4bb05a7e75";

export default node;
