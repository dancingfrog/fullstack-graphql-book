import { ApolloServer } from "apollo-server";
import { newServer } from "../../src/newBusinessServer";
import {
    CREATE_BIZ_MUTATION,
    CREATE_BIZ_PARAMS,
    CREATE_BIZ_OUTPUT } from "../data/createBusiness";

const test = require('ava');

test('createBusinesses', async (t: any) => {

    const server: ApolloServer = await newServer()

    console.log('starting...')
    let result: any
    try {
        result = await server.executeOperation({
            query: CREATE_BIZ_MUTATION,
            variables: CREATE_BIZ_PARAMS,
        });
    } catch (error) {
        console.log(error)
    }

    if (result.hasOwnProperty("errors") && !!result.errors) {
        console.log("Errors in result: ", result);
        t.true(!result.errors);
    }

    // Check create result
    t.deepEqual(
        // @ts-ignore
        result.data["createBusinesses"],
        CREATE_BIZ_OUTPUT["createBusinesses"]
    );

    // Check update result
    t.deepEqual(
        // @ts-ignore
        result.data["updateBusinesses"],
        CREATE_BIZ_OUTPUT["updateBusinesses"]
    );
});
