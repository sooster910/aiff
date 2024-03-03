/**
 * @generated SignedSource<<6ba26633ff609fc66b756369b034f001>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type TimeSlotFragment$data = {
  readonly _id: string;
  readonly currentBookingCount: number;
  readonly endDateTime: any;
  readonly id: string;
  readonly maximumBookingCount: number;
  readonly name: string | null;
  readonly price: number;
  readonly regularClass: {
    readonly _id: string;
    readonly description: string;
    readonly duration: number;
    readonly name: string;
    readonly price: number;
  } | null;
  readonly regularClassId: number;
  readonly startDateTime: any;
  readonly " $fragmentType": "TimeSlotFragment";
};
export type TimeSlotFragment$key = {
  readonly " $data"?: TimeSlotFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"TimeSlotFragment">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "_id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "price",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "TimeSlotFragment",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    (v1/*: any*/),
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
    (v2/*: any*/),
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
        (v0/*: any*/),
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
        (v1/*: any*/),
        (v2/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "type": "TimeSlot",
  "abstractKey": null
};
})();

(node as any).hash = "3cf78bd8454e1ddae50903fb177a5d87";

export default node;
