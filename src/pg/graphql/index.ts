import { ApolloServer, gql } from "apollo-server";
import { Context } from "@apollo/client";
import { makeExecutableSchema } from '@graphql-tools/schema';
import Resolvers from './resolvers';
import Schema from './schema';


export default async function (utils: any): Promise<ApolloServer> {

    const resolvers = Resolvers.call(utils);
    const typeDefs = makeExecutableSchema({
        typeDefs: Schema,
        resolvers
    });

    return new ApolloServer(
        {
            typeDefs,
            resolvers,
            context: (context: { req: any /*Request*/, res: any /*Response*/ }) => {
                // console.log("contextHandler req received: ", context.req);
                // console.log("contextHandler res received: ", context.res);
                return context.req;
            }
        });
}
