import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

// Initialize Apollo Client
export const apolloClient = new ApolloClient({
  uri: "http://192.168.1.132:4000/graphql",
  cache: new InMemoryCache(),
});

apolloClient
  .query({
    query: gql`
      query GetDevices {
        devices(where: { id: { _eq: 1 } }) {
          id
          device_name
          device_description
          device_manufacture
          created_at
        }
      }
    `,
  })
  .then((result) => console.log("2032", result))
  .catch((result) => console.log("2032 ERRR", result))
  .finally(() => console.log("SOMETHING 2015"));
