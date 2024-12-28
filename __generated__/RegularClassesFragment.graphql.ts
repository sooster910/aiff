/**
 * @generated SignedSource<<9276e2b8e7db6c349b4820d2a5407e2b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RegularClassesFragment$data = {
  readonly id: string;
  readonly regularClasses: {
    readonly edges: ReadonlyArray<{
      readonly cursor: string;
      readonly node: {
        readonly _id: string;
        readonly id: string;
        readonly " $fragmentSpreads": FragmentRefs<"RegularClassFragment">;
      };
    }>;
    readonly pageInfo: {
      readonly endCursor: string | null | undefined;
      readonly hasNextPage: boolean;
    };
  };
  readonly " $fragmentType": "RegularClassesFragment";
};
export type RegularClassesFragment$key = {
  readonly " $data"?: RegularClassesFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"RegularClassesFragment">;
};

const node: ReaderFragment = (function(){
var v0 = [
  "regularClasses"
],
v1 = [
  {
    "kind": "Variable",
    "name": "date",
    "variableName": "date"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
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
      "defaultValue": 1,
      "kind": "LocalArgument",
      "name": "first"
    }
  ],
  "kind": "Fragment",
  "metadata": {
    "connection": [
      {
        "count": "first",
        "cursor": "after",
        "direction": "forward",
        "path": (v0/*: any*/)
      }
    ],
    "refetch": {
      "connection": {
        "forward": {
          "count": "first",
          "cursor": "after"
        },
        "backward": null,
        "path": (v0/*: any*/)
      },
      "fragmentPathInResult": [
        "node"
      ],
      "operation": require('./RegularClassesPaginationQuery.graphql'),
      "identifierInfo": {
        "identifierField": "id",
        "identifierQueryVariableName": "id"
      }
    }
  },
  "name": "RegularClassesFragment",
  "selections": [
    {
      "alias": "regularClasses",
      "args": (v1/*: any*/),
      "concreteType": "RegularClassConnection",
      "kind": "LinkedField",
      "name": "__RegularClasses_regularClasses_connection",
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
                (v2/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "_id",
                  "storageKey": null
                },
                {
                  "args": (v1/*: any*/),
                  "kind": "FragmentSpread",
                  "name": "RegularClassFragment"
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
    (v2/*: any*/)
  ],
  "type": "Store",
  "abstractKey": null
};
})();

(node as any).hash = "f65c843bab13cc846e8fcb4bb05a7e75";

export default node;
