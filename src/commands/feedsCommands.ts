import { readConfig } from "../config";
import {getUser} from "../lib/db/queries/users";
import {addFeed, getFeeds, getUserofFeed} from "../lib/db/queries/feeds";
import {Feed, User} from "../lib/db/schema";

export async function handlerAddFeeds(cmdName:string, ...args:string[]) {
    if (args.length !== 2) {
        throw new Error("Invalid number of arguments");
    }

    try {
        const config = readConfig();
        const user = await getUser(config.currentUserName);
        if (!user) {
            throw new Error("Unknown user");
        }

        const feedName = args[0];
        const url = args[1];

        const feed = await addFeed(feedName, url, user.id);
        if (!feed) {
            throw new Error("Failed to add feed");
        }

        console.log("Feed created successfully:");
        printFeed(feed, user);
    }catch(e) {
        console.error(e);
        process.exit(1);
    }
}

function printFeed(feed: Feed, user: User) {
    console.log(`* ID: ${feed.id}`);
    console.log(`* Name: ${feed.name}`);
    console.log(`* Updated: ${feed.updatedAt}`);
    console.log(`* Created: ${feed.createdAt}`);
    console.log(`* Name: ${feed.name}`);
    console.log(`* URL: ${feed.url}`);
    console.log(`* User: ${user.name}`);
}


export async function handlerListFeeds(cmdName:string, ...args:string[]) {
    const feeds = await getFeeds();
    for(const feed of feeds) {
        const id = await getUserofFeed(feed.userID);
        if(id === undefined) {
            console.log(id);
            throw new Error("Unknown user");
        }
        console.log(`Name: ${feed.name}`);
        console.log(`URL: ${feed.url}`);
        console.log(`User: ${id.name}`);
    }
}