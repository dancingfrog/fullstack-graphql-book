"use strict";
exports.__esModule = true;
var fs = require("fs");
var path = require("path");
var PGPASS_FILE = path.join(__dirname, "../../../pg-local-db/pgpass.conf");
var database = "graphbook_dev";
var pgpass_conf = fs.readFileSync(PGPASS_FILE).toString();
var pgtokens = pgpass_conf
    .split((pgpass_conf.match("\r\n") !== null) ?
    "\r\n" : // windows style line-ending
    "\n") // unix style line-ending
    .filter(function (conn_string) { return (conn_string.match(database) !== null); })[0]
    .split(":");
var host = pgtokens[0];
var port = pgtokens[1];
var dbname = pgtokens[2];
var username = pgtokens[3];
var password = pgtokens[4];
console.log("PostgreSQL connection token gathered from pgpass:", {
    host: host,
    port: port,
    dbname: dbname,
    username: username,
    password: password.replace(/[A-Za-z0-9]/g, "*")
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
            "idle": 1000
        },
        "username": username,
        "password": password
    }
};
