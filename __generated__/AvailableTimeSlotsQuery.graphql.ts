/**
 * @generated SignedSource<<4e36b2778fcd6fc1e98913446fc26baf>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AvailableTimeSlotsByDateInput = {
  date: any;
  regularClass?: string | null;
  store: string;
};
export type AvailableTimeSlotsQuery$variables = {
  where: AvailableTimeSlotsByDateInput;
};
export type AvailableTimeSlotsQuery$data = {
  readonly availableTimeSlotsByDate: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"TimeSlotFragment">;
  }> | null;
};
export type AvailableTimeSlotsQuery = {
  response: AvailableTimeSlotsQuery$data;
  variables: AvailableTimeSlotsQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "where"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "where",
    "variableName": "where"
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
  "name": "id",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v5 = {
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
    "name": "AvailableTimeSlotsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "TimeSlot",
        "kind": "LinkedField",
        "name": "availableTimeSlotsByDate",
        "plural": true,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "TimeSlotFragment"
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
    "name": "AvailableTimeSlotsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "TimeSlot",
        "kind": "LinkedField",
        "name": "availableTimeSlotsByDate",
        "plural": true,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
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
          (v5/*: any*/),
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
              (v2/*: any*/),
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
                "name": "duration",
                "storageKey": null
              },
              (v4/*: any*/),
              (v5/*: any*/),
              (v3/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "19f4cbbff5ddda2a2788407614f38b8d",
    "id": null,
    "metadata": {},
    "name": "AvailableTimeSlotsQuery",
    "operationKind": "query",
    "text": "query AvailableTimeSlotsQuery(\n  $where: AvailableTimeSlotsByDateInput!\n) {\n  availableTimeSlotsByDate(where: $where) {\n    ...TimeSlotFragment\n    id\n  }\n}\n\nfragment TimeSlotFragment on TimeSlot {\n  _id\n  id\n  name\n  startDateTime\n  endDateTime\n  regularClassId\n  price\n  currentBookingCount\n  maximumBookingCount\n  regularClass {\n    _id\n    description\n    duration\n    name\n    price\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "97f718d770f67c9bdf22ea031e90525b";

export default node;
