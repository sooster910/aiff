/**
 * @generated SignedSource<<caee2c2d50a497f0b20a745ba6d5592e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StoreDetailFragment$data = {
  readonly _id: string;
  readonly address: string;
  readonly description: string | null | undefined;
  readonly name: string;
  readonly " $fragmentType": "StoreDetailFragment";
};
export type StoreDetailFragment$key = {
  readonly " $data"?: StoreDetailFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"StoreDetailFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StoreDetailFragment",
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
      "name": "name",
      "storageKey": null
    },
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
      "name": "description",
      "storageKey": null
    }
  ],
  "type": "Store",
  "abstractKey": null
};

(node as any).hash = "cd085be52feeedfe4872c62284415938";

export default node;
