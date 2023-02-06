import {newServer} from "./newServer";

(async function () {

    (await newServer())
        .listen().then(({ url }) => {
            console.log(`🚀 Server ready at ${url}`);
        });

})();
