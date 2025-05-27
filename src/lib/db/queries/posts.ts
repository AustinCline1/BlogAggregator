import { db } from "..";
import {feed_follows, feeds, NewPost, posts} from "../schema";
import {desc, eq} from "drizzle-orm";

export async function createPost(post: NewPost) {
    const [result] = await db.insert(posts).values(post).returning();
    return result;
}

export async function getPostsForUsers(userID: string, limit: number){
    const result = await db.select({
        id: posts.id,
        createdAt: posts.createdAt,
        updatedAt: posts.updatedAt,
        title: posts.title,
        url: posts.url,
        description: posts.description,
        publishedAt: posts.publishedAt,
        feedID: posts.feedID,
        feedName: feeds.name,
    }).from(posts).innerJoin(feed_follows, eq(posts.feedID,feed_follows.feedID))
        .innerJoin(feeds, eq(posts.feedID,feeds.id))
        .where(eq(feed_follows.userID,userID))
        .orderBy(desc(posts.publishedAt))
        .limit(limit);
    return result;
}