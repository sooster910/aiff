/**
 * @generated SignedSource<<f8a0ba6e470c0dcb2d1267cdc30660b0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RegularClassFragment$data = {
  readonly _id: string;
  readonly description: string;
  readonly id: string;
  readonly imageURL: {
    readonly altText: string | null | undefined;
    readonly url: string;
  } | null | undefined;
  readonly maximumClassSize: number;
  readonly name: string;
  readonly timeSlots: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"TimeSlotFragment">;
  }> | null | undefined;
  readonly " $fragmentType": "RegularClassFragment";
};
export type RegularClassFragment$key = {
  readonly " $data"?: RegularClassFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"RegularClassFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "date"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "RegularClassFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "_id",
      "storageKey": null
    },
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
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "TimeSlotFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "RegularClass",
  "abstractKey": null
};

(node as any).hash = "51f0970b969255c918fa0df488358e1d";

export default node;
