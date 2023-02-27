// noinspection SpellCheckingInspection

const neo4j = require("neo4j-driver");
const env = require('dotenv');
env.config();

console.log(process.env);

async function try_neo4j (query) {
    const driver = neo4j.driver(
        // "neo4j://localhost:7687",
        process.env.DB_URI,
        neo4j.auth.basic(
            process.env.DB_USER,
            process.env.DB_PASSWORD,
        )
    );

    const session = driver.session();

    await session.run(query).then(result => {
        const record = result.records[0];
        record.forEach((k, i, a) => {
            for (const i in a.keys)
                if (a._fields.length > i)
                    record[a.keys[i]] = (i.hasOwnProperty("low") && i.hasOwnProperty("high")) ?
                        a._fields[i]["low"] : // assign low precision integer value to key in record
                        a._fields[i];
        });
        console.log(`Your database has ${record['num']} nodes`);
    })
        .catch(error => {
            console.log(error);
        });

    return session;
}

try_neo4j("MATCH (n) RETURN COUNT(n) AS num")
    .then((session) => {
            session.close()
                .finally(process.exit);
    })
    .finally(process.exit);
