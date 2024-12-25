/**
 * @generated SignedSource<<8254dfe45c9c7fc54906ae899bdce411>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StoreList_query$data = {
  readonly stores: ReadonlyArray<{
    readonly _id: string;
    readonly name: string;
  }>;
  readonly " $fragmentType": "StoreList_query";
};
export type StoreList_query$key = {
  readonly " $data"?: StoreList_query$data;
  readonly " $fragmentSpreads": FragmentRefs<"StoreList_query">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StoreList_query",
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
          "name": "_id",
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

(node as any).hash = "868760291ceb8e6343e6b39fe35faa9c";

export default node;
