// noinspection SpellCheckingInspection

const neo4j = require("neo4j-driver");

function try_neo4j (auth, query) {
    const driver = neo4j.driver(
        // "bolt://localhost:7687/neo4j",
        "neo4j://localhost:7687",
        auth
    );
    const session = driver.session();
    session.run(query).then(result => {
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
        })
        .finally(() => {
            session.close();
        })
}

try_neo4j(
    // auth
    neo4j.auth.basic("neo4j", "letmein"),
    // query
    "MATCH (n) RETURN COUNT(n) AS num"
)
