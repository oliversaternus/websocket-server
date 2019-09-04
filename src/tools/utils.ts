import fs from "fs";
import path from "path";
import * as crypt from "./crypt";

const config: any = JSON.parse(fs.readFileSync(path.join(__dirname, "../", "../", "/config.json"), "utf-8"));
const secret: string = config.secret;
export const wsKey: string = config.wsKey;

export function decryptSafe(token: string): any {
    const result = JSON.parse(crypt.decrypt(token));
    return result.sec === secret ? result : undefined;
}
