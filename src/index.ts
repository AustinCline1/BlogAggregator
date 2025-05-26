import {readConfig, setUser} from "./config";
function main() {
    console.log("Hello, world!");
    setUser("Austin");
    const config =  readConfig();
    console.log(config);

}

main();