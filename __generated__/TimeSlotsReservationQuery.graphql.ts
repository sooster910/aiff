/**
 * @generated SignedSource<<a36635fcca1037ba41f10f44835a270b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type TimeSlotsReservationQuery$variables = {
  timeSlotId: string;
};
export type TimeSlotsReservationQuery$data = {
  readonly timeSlot: {
    readonly " $fragmentSpreads": FragmentRefs<"TimeSlotFragment">;
  };
};
export type TimeSlotsReservationQuery = {
  response: TimeSlotsReservationQuery$data;
  variables: TimeSlotsReservationQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "timeSlotId"
  }
],
v1 = [
  {
    "fields": [
      {
        "kind": "Variable",
        "name": "_id",
        "variableName": "timeSlotId"
      },
      {
        "kind": "Literal",
        "name": "skip",
        "value": false
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
    "name": "TimeSlotsReservationQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "TimeSlot",
        "kind": "LinkedField",
        "name": "timeSlot",
        "plural": false,
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
    "name": "TimeSlotsReservationQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "TimeSlot",
        "kind": "LinkedField",
        "name": "timeSlot",
        "plural": false,
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
    "cacheID": "54d1e1e45105d66a02034c632c9bb944",
    "id": null,
    "metadata": {},
    "name": "TimeSlotsReservationQuery",
    "operationKind": "query",
    "text": "query TimeSlotsReservationQuery(\n  $timeSlotId: String!\n) {\n  timeSlot(where: {_id: $timeSlotId, skip: false}) {\n    ...TimeSlotFragment\n    id\n  }\n}\n\nfragment TimeSlotFragment on TimeSlot {\n  _id\n  id\n  name\n  startDateTime\n  endDateTime\n  regularClassId\n  price\n  currentBookingCount\n  maximumBookingCount\n  regularClass {\n    _id\n    description\n    duration\n    name\n    price\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "c86ca8aab390858a0244d43ae2ba0de4";

export default node;
