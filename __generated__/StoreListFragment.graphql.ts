/**
 * @generated SignedSource<<be332d7078547283173303b513089c38>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StoreListFragment$data = {
  readonly stores: ReadonlyArray<{
    readonly id: string;
    readonly name: string;
  }>;
  readonly " $fragmentType": "StoreListFragment";
};
export type StoreListFragment$key = {
  readonly " $data"?: StoreListFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"StoreListFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StoreListFragment",
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
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "a16fac6354d4e3043c6f1ecb04193bd5";

export default node;
