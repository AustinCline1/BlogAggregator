import fs from "fs";
import os from "os";
import path from "path";

export type Config = {
    dbUrl: string;
    currentUserName: string;
}

function validateConfig(rawConfig: any) {
    if(!rawConfig.db_url || typeof rawConfig.db_url !== "string") {
        throw new Error("db_url is required");
    }
    if(!rawConfig.current_user_name || typeof rawConfig.current_user_name !== "string") {
        throw new Error("current_user_name is required");
    }
    return  {
        dbUrl: rawConfig.db_url,
        currentUserName: rawConfig.current_user_name,
    }

}
export function readConfig() {
    const configFilePath = getConfigFilePath();
    const data = fs.readFileSync(configFilePath,"utf-8");
    const rawConfig = JSON.parse(data);
    return validateConfig(rawConfig);
}

export function setUser(user: string): void {
    const config = readConfig();
    config.currentUserName = user;
    writeConfig(config);

}

function getConfigFilePath(): string {
    return path.join(os.homedir(), ".gatorconfig.json");
}

function writeConfig(config: Config){
    const path = getConfigFilePath();
     const rawConfig = {
         db_url: config.dbUrl,
         current_user_name: config.currentUserName,
     };

     const data = JSON.stringify(rawConfig,null,2);
     fs.writeFileSync(path,data, "utf-8");
}
