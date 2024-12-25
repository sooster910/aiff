/**
 * @generated SignedSource<<4c106acbed84dd60b179d818bad16400>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RegularClassesStore_query$data = {
  readonly stores: ReadonlyArray<{
    readonly _id: string;
    readonly description: string | null | undefined;
    readonly id: string;
    readonly name: string;
    readonly " $fragmentSpreads": FragmentRefs<"RegularClassesFragment">;
  }>;
  readonly " $fragmentType": "RegularClassesStore_query";
};
export type RegularClassesStore_query$key = {
  readonly " $data"?: RegularClassesStore_query$data;
  readonly " $fragmentSpreads": FragmentRefs<"RegularClassesStore_query">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
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
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "first"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "storeId"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "RegularClassesStore_query",
  "selections": [
    {
      "alias": null,
      "args": [
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
          "args": [
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
          "kind": "FragmentSpread",
          "name": "RegularClassesFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "0cf4e6add1f51157b52ab54a6562b8b0";

export default node;
