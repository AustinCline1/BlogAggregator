import {db} from "..";
import {feed_follows, feeds, users} from "../schema";
import {firstOrUndefined} from "./utils";
import {and, eq, sql} from "drizzle-orm";




export async function addFeed(name:string, url:string,userID:string) {
    const result = await db.insert(feeds).values({
        name:name,
        url:url,
        userID:userID
    }).returning();
    return firstOrUndefined(result);
}

export async function getFeeds(){
    return db.select().from(feeds);
}

export async function getUserofFeed(id: string) {
    const [result] = await db.select().from(users).where(sql`id = ${id}`);
    return result;
}

export async function getFeedByURL(url: string) {
    const result = await db.select().from(feeds).where(sql`url = ${url}`);
    return firstOrUndefined(result);
}

export async function createFeedFollow(feedID:string, userID:string) {
    const [newFeedFollow] = await db.insert(feed_follows).values({
        feedID:feedID,
        userID:userID
    }).returning()
    const [result] = await db.select({
        id: feed_follows.id,
        createdAt: feed_follows.createdAt,
        updatedAt: feed_follows.updatedAt,
        userID: feed_follows.userID,
        feedID: feed_follows.feedID,
        feedName: feeds.name,
        userName: users.name,
    }).from(feed_follows).innerJoin(feeds, eq(feed_follows.feedID,feeds.id))
        .innerJoin(users, eq(feed_follows.userID,users.id))
        .where(
            and(
                eq(feed_follows.id,newFeedFollow.id),
                eq(users.id,newFeedFollow.userID),
                ),
            );

    return result;
}

export async function getFeedFollowsForUser(userID: string){
    const result = await db.select({
        id: feed_follows.id,
        createdAt: feed_follows.createdAt,
        updatedAt: feed_follows.updatedAt,
        userID: feed_follows.userID,
        feedID: feed_follows.feedID,
        feedName: feeds.name
    }).from(feed_follows).innerJoin(feeds, eq(feed_follows.feedID,feeds.id))
        .where(eq(feed_follows.userID,userID));

    return result;
}