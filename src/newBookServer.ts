import { Neo4jGraphQL } from '@neo4j/graphql';
import { ApolloServer } from "apollo-server";

const neo4j = require('neo4j-driver');

const { gql } = require('apollo-server');
const env = require('dotenv');
env.config();

const typeDefs = gql`
  type Book {
    title: String
    author: String
  }
`;

const driver = neo4j.driver(
    process.env.DB_URI,
    neo4j.auth.basic(
        process.env.DB_USER,
        process.env.DB_PASSWORD,
    ),
);

function context ({ event, context }: { event: any, context: any }): any {

    return ({
        event,
        context,
        driver,
    });
}

export async function newServer (): Promise<ApolloServer> {

    // @ts-ignore
    const schema = await (new Neo4jGraphQL({
        typeDefs,
    }).getSchema());

    return new ApolloServer(
        {
            schema,
            context,
        });
}
