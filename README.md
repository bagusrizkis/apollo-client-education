# Apollo Client

-   Mengimplementasikan GraphQl, Query, dan Mutation di sisi client

-   Menggunakan client state yang ada di apollo
-   Mengambil data menggunakan query ke client state

## Todo

-   [x] buat services/graphql/config

    ```js
    import {
        ApolloClient,
        InMemoryCache,
        ApolloProvider,
        useQuery,
        gql,
    } from "@apollo/client";

    const client = new ApolloClient({
        uri: "",
        cache: new InMemoryCache(),
    });
    ```

-   [x] Connect client ke react menggunakan <ApolloProvider>
    ```jsx
    <ApolloProvider client={client}></ApolloProvider>
    ```
-   [x] Fetch data dengan `useQuery()` dan membuat query dengan gql``
-   [x] Mutation data dengan `useMutation()` dan refetchQuery

---

Client State

-   [x] 1.a. Reactive Variable
        (https://www.apollographql.com/docs/react/local-state/reactive-variables/)

    ```js
    import { makeVar } from "@apollo/client";

    const message = makeVar("");

    // pemakaian
    const value = message();

    // set value baru
    message("value baru");

    // reaktif
    import { useReactiveVar } from "@apollo/client";
    const valueReactive = useReactiveVar(message);
    ```

-   [x] 2.b. local-only fields (query dengan `@client`) & inMemoryCache() typePolicies

    ```js
    // var
    import { dataBlockedUser } from "../cache/reactiveVar";

    // config
    const client = new ApolloClient({
        ...
        cache: new InMemoryCache({
            typePolicies: {
                Query: {
                    fields: {
                        blockedUser: { // <--- sesuai nama di field
                            read() {
                                return dataBlockedUser();
                            },
                        },
                    },
                },
            },
        }),
    });

    // query
    export const BLOCKED_USER = gql`
        query BlockedUser {
            blockedUser @client
        }
    `;
    ```

-   [x] 3. client.writeQuery
-   [x] Pakai secara langsung di writeQuery

    ```js
    client.writeQuery({
        query: FAV_USER,
        data: {
            favUser: [],
        },
    });
    ```
