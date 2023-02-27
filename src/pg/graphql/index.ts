import { ApolloServer, gql } from "apollo-server";
import { Context } from "@apollo/client";
import { makeExecutableSchema } from '@graphql-tools/schema';
import Resolvers from './resolvers';
import Schema from './schema';

export default async function (utils: any): Promise<ApolloServer> {

    const executableSchema = makeExecutableSchema({
        typeDefs: Schema,
        resolvers: Resolvers.call(utils),
    });

    return new ApolloServer(
        {
            typeDefs: executableSchema,
            context: ({ req }) => req
            // context: (context: { req: any /*Request*/, res: any /*Response*/ }) => {
            //     // console.log("contextHandler received: ", context);
            //     return context.req;
            // }
        });
}
