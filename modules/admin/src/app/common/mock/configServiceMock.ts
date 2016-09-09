import { Config } from "../../config/config";
import { Injectable } from "@angular/core";

@Injectable()
export class ConfigServiceMock {
    public config: Config = {
        orientDBUrl: "/orientdb",
        orientDBDatabase: "smsc",
        i18nPath: "assets/i18n",
        debug: false
    };
}
