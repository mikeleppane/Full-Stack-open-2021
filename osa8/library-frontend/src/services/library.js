import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const DB_URL = "http://localhost:4000";

export const Client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: DB_URL,
  }),
});
