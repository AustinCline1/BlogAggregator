import { readConfig } from "../config";
import { getUserByName } from "../lib/db/queries/users";
import {createFeedFollow, getFeedByURL, getFeedFollowsForUser} from "../lib/db/queries/feeds";

export async function handlerFollow(cmdName:string, ...args:string[]) {
    if (args.length !== 1) {
        throw new Error("Invalid number of arguments");
    }

    const config = readConfig();
    const user = await getUserByName(config.currentUserName);


    if(!user) {
        throw new Error("Unknown user");
    }

    const feedURL = args[0];
    const feed = await getFeedByURL(feedURL);
    if(!feed) {
        throw new Error("Unknown feed");
    }

    const ffRow = await createFeedFollow(feed.id, user.id);

    if(!ffRow) {
        throw new Error("Failed to create feed follow");
    }
    console.log("Feed follow created!");
    printFeedFollow(ffRow.userName,ffRow.feedName);
}

export async function handlerListFeedFollows(_: string) {
    const config = readConfig();
    const user = await getUserByName(config.currentUserName);
    if(!user) {
        throw new Error("Unknown user");
    }
    const feedFollows = await getFeedFollowsForUser(user.id);
    if(feedFollows.length === 0) {
        console.log("No feed follows");
        return;
    }

    console.log(`Feed follows for user ${user.name}:`);
    for (const ff of feedFollows) {
        console.log(`* ${ff.feedName}`);
    }
}

export function printFeedFollow(username:string,feedName:string) {
    console.log(`* User: ${username}`);
    console.log(`* Feed: ${feedName}`);
}