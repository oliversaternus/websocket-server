import fs from "fs";
import path from "path";

type ServerTitle = "emailServer" | "apiServer" | "websocketServer" |
    "fileServer" | "streamingServer" | "staticServer";

interface Email {
    host: string;
    port: number;
    address: string;
    password: string;
}

export default class Config {
    public addresses: {
        [key: string]: {
            protocol: string,
            host: string,
            port: number
        }
    } = {};
    public secret: string;
    public encryptionKey: string;
    public wsKey: string;
    public email: Email;

    private title: string;

    constructor(title: ServerTitle, onInit?: () => void) {
        this.title = title;
        if (onInit && typeof onInit === "function") {
            this.onInit = onInit;
        }
        this.initialize();
        fs.watchFile(path.join(__dirname, "../", "../", "/config.json"), this.initialize);
    }

    public initialize = () => {
        try {
            const config: any = JSON.parse(fs.readFileSync(
                path.join(__dirname, "../", "../", "/config.json"), "utf-8"));
            this.addresses = config.addresses;
            this.secret = config.secret;
            this.encryptionKey = config.encryptionKey;
            this.wsKey = config.wsKey;
            this.email = config.email;
            this.onInit();
            console.log(config);
        } catch (e) {
            console.log(e);
        }
    }

    public server = (title: ServerTitle): string => {
        if (title === this.title) {
            return undefined;
        }
        const address = this.addresses[title];
        const home = this.addresses[this.title];
        if (address.host === home.host) {
            return "http://localhost:" + address.port;
        }
        return address.protocol + "://" + address.host;
    }

    public onInit: () => void = () => undefined;
}
