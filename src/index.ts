import { newServer } from "./newBusinessServer";

(async function () {

    (await newServer())
        .listen().then(({ url }) => {
        console.log(`🚀 Server ready at ${url}`);
    });

})();
