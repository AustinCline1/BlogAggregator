import {db} from "..";
import {users} from "../schema";
import {sql} from "drizzle-orm";
import {firstOrUndefined} from "./utils";

export async function createUser(name: string) {
    const [result] = await db.insert(users).values({name:name}).returning();
    return result;
}

export async function getUserByName(name: string) {
    const result = await db.select().from(users).where(sql`lower(${users.name}) = ${name}`);
    return firstOrUndefined(result);
}

export async function deleteUsers() {
    await db.delete(users);
}

export async function getAllUsers() {
    return db.select().from(users);
}