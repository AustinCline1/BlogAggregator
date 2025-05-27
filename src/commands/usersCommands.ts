import {getLoggedInUser, setUser} from "../config";
import {createUser,getUser,deleteUsers, getAllUsers} from "../lib/db/queries/users";
import {db} from "../lib/db";
import {fetchFeed} from "../rss";

export async function handlerLogin(cmdName:string, ...args: string[]) {
    if (args.length !== 1) {
        throw new Error("Invalid number of arguments");
    }
    try{
        const user = await getUser(args[0]);
        if(!user) {
            throw new Error("Unknown user");
        }
            setUser(user.name);
            console.log("Set the user to " + user.name);
    }catch (e) {
        console.error(e);
        process.exit(1);
    }

}

export async function handlerRegister(cmdName:string, ...args: string[]) {
    if (args.length !== 1) {
        throw new Error("Invalid number of arguments");
    }

    if (args[0] === "unknown"){
        console.error("Unknown user");
        process.exit(1);
    }
    try{
        const user = await createUser(args[0]);
        console.log("Created user " + args[0]);
        setUser(user.name);
    }catch (e) {
        if(e instanceof Error && e.message.includes("duplicate key value violates unique constraint")) {
            console.error(e);
            process.exit(1);
        }
    }
}

export async function handlerReset(cmdName:string, ...args: string[]) {
    try {
        await deleteUsers();
        console.log("Deleted all users");
    }catch (e){
        console.error(e);
        process.exit(1);
    }
}

export async function handlerList(cmdName:string, ...args: string[]) {

    try {
        const users = await getAllUsers();
        const currentUser = getLoggedInUser();
        for (const user of users) {
            if(user.name === currentUser) {
                console.log(`* ${user.name} (current)`);
                continue;
            }
            console.log(`* ${user.name}`);
        }
    }catch (e) {
        console.log(e);
        process.exit(1);
    }
}

