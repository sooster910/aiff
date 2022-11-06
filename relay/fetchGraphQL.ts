import fetch from "isomorphic-fetch";
import type { Variables } from "relay-runtime";
import { BACKEND_BASE_URL } from '../src/utils/constants';

const fetchGraphQL = async (query: string, variables: Variables) => {
  console.log("fetch", query)
  const response = await fetch(`${BACKEND_BASE_URL}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin":"*",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  return await response.json();
};

export default fetchGraphQL;

