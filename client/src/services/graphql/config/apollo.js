import { ApolloClient, InMemoryCache } from "@apollo/client";
import { blockedUser } from "../cache/reactiveVar";
import { FAVORITE_USER } from "../query";

const client = new ApolloClient({
    uri: "http://localhost:4000",
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    blockedUser: {
                        read() {
                            return blockedUser();
                        },
                    },
                },
            },
        },
    }),
});

client.writeQuery({
    query: FAVORITE_USER,
    data: {
        favUserQuery: [],
    },
});

export default client;
