import {setUser} from "./config";

export function handlerLogin(cmdName:string, ...args: string[]) {
    if (args.length !== 1) {
        throw new Error("Invalid number of arguments");
    }
    setUser(args[0]);
    console.log("Set the user to " + args[0]);
}