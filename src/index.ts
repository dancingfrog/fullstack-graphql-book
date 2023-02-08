import { newServer } from "./newBusinessServer";

(async function () {

    (await newServer())
        .listen().then(({ url }) => {
            console.log(`🚀 GraphQL server is ready at ${url}`);
        });

})();
