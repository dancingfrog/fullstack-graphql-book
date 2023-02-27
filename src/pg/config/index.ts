import * as fs from "fs";
import * as path from "path";
const PGPASS_FILE = path.join(__dirname, "../../../pg-local-db/pgpass.conf");

const database = "graphbook_dev";
const pgpass_conf = fs.readFileSync(PGPASS_FILE).toString()
const pgtokens = pgpass_conf
    .split((pgpass_conf.match("\r\n") !== null) ?
        "\r\n" :    // windows style line-ending
        "\n")       // unix style line-ending
    .filter((conn_string) => (conn_string.match(database) !== null))[0]
    .split(":");
const host = pgtokens[0];
const port = pgtokens[1];
const dbname = pgtokens[2];
const username = pgtokens[3];
const password = pgtokens[4];

console.log("PostgreSQL connection tokens gathered from pgpass:", {
    host,
    port,
    dbname,
    username,
    password: (<String>password).replace(/[A-Za-z0-9]/g, "*")
});

module.exports = {
    "development": {
        "database": dbname,
        "host": host,
        "port": port,
        "dialect": "postgres",
        "pool": {
            "max": 10,
            "min": 0,
            "acquire": 3000,
            "idle": 1000,
        },
        "username": username,
        "password": password
    }
};

