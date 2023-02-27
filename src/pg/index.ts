/** PostgreSQL-GraphQL server based on the book:
 *  Full-Stack Web Development with GraphQL and React - Second Edition, Published by Packt
 *  Written by Sebastian Grebe
 *  https://github.com/PacktPublishing/Full-Stack-Web-Development-with-GraphQL-and-React-Second-Edition
 */

import { Sequelize } from "sequelize";
import server from "./graphql";
import models from './models';

const env: string = process.env.NODE_ENV || "development";
const config = require('./config')[env];
const sequelize = new Sequelize(config.database, config.user, config.password, config);
const utils = {
    db: {
        models: models(sequelize, "."),
        sequelize
    }
};

(async function () {

    (await server(utils))
        .listen().then(({ url }) => {
        console.log(`🚀 Apollo GraphQL server is ready at ${url}`);
    });

})();
