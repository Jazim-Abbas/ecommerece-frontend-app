import { createClient, cacheExchange, dedupExchange } from "urql";
import { multipartFetchExchange } from "@urql/exchange-multipart-fetch";

export const client = createClient({
  url: "http://localhost:8000/graphql",
  exchanges: [dedupExchange, cacheExchange, multipartFetchExchange],
  fetchOptions: () => {
    const token = window.localStorage.getItem("token");
    return {
      headers: { authorization: token },
    };
  },
});
