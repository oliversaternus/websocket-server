import crypto from "crypto";
import Config from "./config";

export const config = new Config("websocketServer");

// #######################  ENCRYPTION UTILITIES ######################################

function _decrypt(text: string) {
    const textParts = text.split(":");
    const iv = Buffer.from(textParts.shift(), "hex");
    const encryptedText = Buffer.from(textParts.join(":"), "hex");
    const decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(config.encryptionKey), iv);
    let decrypted = decipher.update(encryptedText);

    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString();
}

// #############################################################################################

export function decryptSafe(token: string): any {
    const result = JSON.parse(_decrypt(token));
    return result.sec === config.secret ? result : undefined;
}
