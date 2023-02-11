// import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

async function main() {
    const [ ApolloClient, InMemoryCache, gql ] = await import("@apollo/client");

    const client = new ApolloClient({
        uri: "http://localhost:4000",
        cache: new InMemoryCache()
    });

    const result = await client.query({
        query: gql`
{
    businesses {
        name
    }
}
`
    });

    console.log(result);
}

main();
