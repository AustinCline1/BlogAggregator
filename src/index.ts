
import {CommandHandler, CommandRegistry, registerCommand,runCommand} from "./command_handler";
import {handlerLogin} from "./users";
function main() {
    const commandRegistry:CommandRegistry = {};
    registerCommand(commandRegistry,"login",handlerLogin);
    const args = process.argv.slice(2);
    if(args.length < 1){
        throw new Error("No command specified");
    }
    const cmdName = args[0];
    const cmdArgs = args.slice(1);
    try {
        runCommand(commandRegistry, cmdName, ...cmdArgs);
    }catch (e) {
        console.error(e);
        process.exit(1);
    }
}

main();