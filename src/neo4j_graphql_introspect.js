const neo4j = require("neo4j-driver");
const env = require('dotenv');
env.config();

console.log(process.env);

const session_running = {};

function sessionFactory () {
    // https://stackoverflow.com/questions/62825358/javascript-replaceall-is-not-a-function-type-error#answer-63958411
    if (!String.prototype.hasOwnProperty("replaceAll")) {
        String.prototype.replaceAll = function replaceAll (search, replace) {
            return this.split(search).join(replace);
        }
    }

    return neo4j.driver(
        // "neo4j://localhost:7687",
        process.env.DB_URI,
        neo4j.auth.basic(
            process.env.DB_USER,
            process.env.DB_PASSWORD,
        )
    )
        .session({
            defaultAccessMode: neo4j.session.READ
        })
}

async function try_neo4j () {
    const driver = neo4j.driver(
        // "neo4j://localhost:7687",
        process.env.DB_URI,
        neo4j.auth.basic(
            process.env.DB_USER,
            process.env.DB_PASSWORD,
        )
    );

    const query = "MATCH (n) RETURN COUNT(n) AS num";

    const session = sessionFactory ();

    if (!session_running[session.id]) session_running[session.id] = true;
    else setTimeout(() => session.close().finally(process.exit), 333);

    return (await session.run(query)
        .catch(error => {
            console.log(error);
        })
        .then(result => {
            const record = result.records[0];
            record.forEach((k, i, a) => {
                for (const i in a.keys)
                    if (a._fields.length > i)
                        record[a.keys[i]] = (i.hasOwnProperty("low") && i.hasOwnProperty("high")) ?
                            a._fields[i]["low"] : // assign low precision integer value to key in record
                            a._fields[i];
            });
            console.log(`Your database has ${record['num']} nodes`);

            session.close();
        })
    );
}
async function try_apollo_graphql (label) {
    const { fetch } = (await import('cross-fetch')).default;
    const { ApolloClient, HttpLink, InMemoryCache, gql } = (await import("@apollo/client")).default;

    const client = new ApolloClient({
        uri: "http://localhost:4000",
        cache: new InMemoryCache(),
        link: new HttpLink({ uri: 'http://localhost:4000/', fetch })
    });

    return (await client.query({
        query: gql`
{
    ${label} {
        name
    }
}
`
    }));
}

async function main () {

    await try_neo4j();

    const { toGraphQLTypeDefs } = require("@neo4j/introspector");

    await toGraphQLTypeDefs(sessionFactory)
        .catch(error => {
            console.log(error);
        })
        .then((typeDefs) => {
            console.log("schema.graphql", typeDefs);
        });

    const node_type = 'businesses';

    const result = await try_apollo_graphql(node_type);

    console.log(result.data[node_type]);
}

main().finally(process.exit);
