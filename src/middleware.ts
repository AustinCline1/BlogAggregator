import { CommandHandler } from "./command_handler";
import {User} from "./lib/db/schema";
import {readConfig} from "./config";
import {getUserByName} from "./lib/db/queries/users";

type UserCommandHandler = (
    cmdName: string,
    user: User,
    ...args: string[]
) => Promise<void>;

export function  middlewareLoggedIn(handler: UserCommandHandler): CommandHandler {
    return async (cmdName: string, ...args: string[]) => {
        const config = readConfig();
        const user = await getUserByName(config.currentUserName);
        if (!user) {
            throw new Error("Unknown user");
        }
        await handler(cmdName, user, ...args);
    };
}