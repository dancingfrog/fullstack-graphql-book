import {
    ApolloClient,
    ApolloProvider,
    HttpLink,
    InMemoryCache,
    from
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import App from "../../../../App";
import React from "react";

const client = new ApolloClient(
    {
        uri: import.meta.env.VITE_GRAPHQL_LOCAL_API,
        cache: new InMemoryCache({
            // typePolicies: { ... }
        }),
        link:
        // new HttpLink({ uri: `${import.meta.env.VITE_GRAPHQL_LOCAL_API}/`, fetch })
            from([
                onError((gqlErrors, netError) => {
                    if (!!gqlErrors && gqlErrors.length > 0) {
                        gqlErrors.map((err /*: { message, location, path }*/) => {
                            console.log("GraphQL Error: ", err);
                        })
                    }
                    if (!!netError){
                        console.log("Network Error: ", netError)
                    }
                }),
                new HttpLink({ uri: `${import.meta.env.VITE_GRAPHQL_LOCAL_API}/`, fetch })
            ])
    });

export default function ApolloGraphQLProvider (props) {
    const { children } = props;

    return (
        <ApolloProvider client={client}>
            {children}
        </ApolloProvider>
    );
}
