import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const DB_URL = "http://localhost:4000";

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("library-user-token");
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : null,
    },
  };
});

const httpLink = new HttpLink({ uri: DB_URL });

export const Client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});
