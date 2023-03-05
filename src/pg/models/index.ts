import * as fs from "fs";
import * as path from "path";
import { Sequelize } from "sequelize";

export default (sequelize: Sequelize, sub_directory: string = ".") => {

    const
        context: any = {}, // require.context('.', true, /^\.\/(?!index\.js).*\.js$/, 'sync'),
        db: any = {},
        paths: string = path.join(__dirname, sub_directory + "/"),
        files: Array<string> = fs.readdirSync(paths)
            .filter((file: string) => file.match(/^((?!index\.js).*)\.js$/) !== null);

    console.log("Searching ", files, " for db sequelize models");

    // fs.readdir("./", (err, files) => {
    files.forEach(file => {
        const name = file.match(/^((?!index\.js).*)\.js$/);
        if (name !== null && name.length > 1) {
            const models = {};
            // console.log(name[1]);
            (<any>models)[name[1]] = require(paths + name[0]);
            // console.log(models);
            for (let p in models) {
                if (models.hasOwnProperty(p)) {
                    context[p] = (<any>models)[p];
                }
            }
        }
    });
    // });

    // console.log(context);

    Object.keys(context).forEach((module: any) => {
        const model = context[module](sequelize, Sequelize);
        console.log(module + ":", model);
        db[model.name] = model;
    });

    Object.keys(db).forEach((modelName: string) => {
        if (typeof db[modelName].associate === 'function') {
            console.log(modelName + `: db[${modelName}].associate(db)`);
            db[modelName].associate(db);
        }
    });

    return db;
};
