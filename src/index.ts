import { newServer } from "./newBusinessServer";

(async function () {

    (await newServer())
        .listen().then(({ url }) => {
        console.log(`🚀 @neo4j/graphql server is ready at ${url}`);
    });

})();
