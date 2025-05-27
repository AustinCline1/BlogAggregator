﻿
import {pgTable, text, timestamp, unique, uuid} from "drizzle-orm/pg-core";
export const users = pgTable("users", {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(()=> new Date()),
    name: text("name").notNull().unique()

})

export type User = typeof users.$inferSelect;
export const feeds = pgTable("feeds", {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(()=> new Date()),
    name: text("name").notNull(),
    url: text("url").notNull().unique(),
    userID: uuid("user_id").references(()=> users.id,{onDelete: "cascade"}).notNull(),
    lastFetchAt: timestamp("last_fetch_at"),
});

export type Feed = typeof feeds.$inferSelect;

export const feed_follows = pgTable("feedfollows", {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_ad").notNull().defaultNow().$onUpdate(()=> new Date()),
    userID: uuid("user_id").references(()=> users.id,{onDelete: "cascade"}).notNull(),
    feedID: uuid("feed_id").references(()=> feeds.id,{onDelete: "cascade"}).notNull()
},
    (t) => ({unq: unique().on(t.userID,t.feedID) }),
)

export const posts = pgTable("posts", {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_ad").notNull().defaultNow().$onUpdate(()=> new Date()),
    title: text("title").notNull(),
    url: text("url").notNull().unique(),
    description: text("description"),
    publishedAt: timestamp("published_at"),
    feedID: uuid("feed_id").notNull().references(()=> feeds.id,{onDelete: "cascade"}),
})

export type NewPost = typeof posts.$inferInsert;
export type Post = typeof posts.$inferSelect;