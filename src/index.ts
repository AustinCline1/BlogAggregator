
import {CommandHandler, CommandRegistry, registerCommand,runCommand} from "./command_handler";
import {handlerLogin, handlerRegister} from "./users";
async function main() {
    const commandRegistry:CommandRegistry = {};
    registerCommand(commandRegistry,"login",handlerLogin);
    registerCommand(commandRegistry,"register",handlerRegister);
    const args = process.argv.slice(2);
    if(args.length < 1){
        throw new Error("No command specified");
    }
    const cmdName = args[0];
    const cmdArgs = args.slice(1);
    try {
        await runCommand(commandRegistry, cmdName, ...cmdArgs);
    }catch (e) {
        console.error(e);
        process.exit(1);
    }
    process.exit(0);
}

main();