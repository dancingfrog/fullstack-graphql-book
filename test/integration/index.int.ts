import { ApolloServer } from "apollo-server";
// import { newServer } from "../../src/newBookServer";
// import {
//     CREATE_BOOKS_OUTPUT,
//     CREATE_BOOKS_PARAMS,
//     CREATE_BOOKS_MUTATION } from "../data/createBooks";
import { newServer } from "../../src/newBusinessServer";

const test = require('ava');

// test('createBooks', async (t: any) => {
//
//     const server: ApolloServer = await newServer()
//
//     console.log('starting...')
//     let result: any
//     try {
//         result = await server.executeOperation({
//             query: CREATE_BOOKS_MUTATION,
//             variables: CREATE_BOOKS_PARAMS,
//         });
//     } catch (error) {
//         console.log(error)
//     }
//
//     t.true(!result.errors);
//
//     t.deepEqual(
//         // @ts-ignore
//         result.data.createBooks,
//         CREATE_BOOKS_OUTPUT
//     );
// });

test('createBusinesses', async (t: any) => {

    const server: ApolloServer = await newServer()

    console.log('starting...')
    let result: any
    try {
        result = await server.executeOperation({
            query: CREATE_BOOKS_MUTATION,
            variables: CREATE_BOOKS_PARAMS,
        });
    } catch (error) {
        console.log(error)
    }

    t.true(!result.errors);

    t.deepEqual(
        // @ts-ignore
        result.data.createBooks,
        CREATE_BOOKS_OUTPUT
    );
});
