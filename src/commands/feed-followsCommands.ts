import { readConfig } from "../config";
import { getUserByName } from "../lib/db/queries/users";
import {createFeedFollow, deleteFeedFollow, getFeedByURL, getFeedFollowsForUser} from "../lib/db/queries/feeds";
import {User} from "../lib/db/schema";

export async function handlerFollow(cmdName:string,user:User, ...args:string[]) {
    if (args.length !== 1) {
        throw new Error("Invalid number of arguments");
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
export async function handlerUnfollow(cmdName:string,user:User, ...args:string[]) {

    if (args.length !== 1) {
        throw new Error("Invalid number of arguments");
    }
    const feedURL = args[0];
    const feed = await getFeedByURL(feedURL);
    if(!feed) {
        throw new Error("Unknown feed");
    }
    const result = await deleteFeedFollow(feed.id, user.id);
    if(!result) {
        throw new Error("Failed to delete feed follow");
    }
    console.log("Feed follow deleted!");
}

export async function handlerListFeedFollows(_: string,user:User) {
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