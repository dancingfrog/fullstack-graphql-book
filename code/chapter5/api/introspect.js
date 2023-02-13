const { toGraphQLTypeDefs } = require("@neo4j/introspector");
const neo4j = require("neo4j-driver");
const fs = require("fs");
const driver = neo4j.driver(
    // "neo4j://localhost:7687",
    process.env.DB_URI,
    neo4j.auth.basic(
        process.env.DB_USER,
        process.env.DB_PASSWORD,
    )
);
const sessionFactory = () => driver.session({ defaultAccessMode: neo4j.session.READ });
// We create a async function here until "top level await" has landed so we can use async/await
async function main() {
    const typeDefs = await toGraphQLTypeDefs(sessionFactory);
    fs.writeFileSync("schema.graphql", typeDefs);
    await driver.close();
}
main();
