import { BACKEND_BASE_URL } from "./../src/utils/constants";
import fetch from "isomorphic-fetch";
import type { Variables } from "relay-runtime";
import { NEXT_PUBLIC_BACKEND_BASE_URL } from "../src/utils/constants";

const fetchGraphQL = async (query: string, variables: Variables) => {
  console.log("isDev?", process.env.NODE_ENV);
  try {
    const response = await fetch(`${NEXT_PUBLIC_BACKEND_BASE_URL}/graphql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });
    if (!response.ok) {
      return true;
    }
    return await response.json();
  } catch (error) {
    console.log("error", error);
  }
};

export default fetchGraphQL;
