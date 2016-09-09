import { Injectable } from "@angular/core";
import { Observable, Observer } from "rxjs";
import { Config } from "../../config/config";

@Injectable()
export class ConfigServiceMock {
    private static _configStream: Observable<Config> = null;
    private static _config: Config = null;

    get configStream(): Observable<Config> {
        if (ConfigServiceMock._configStream == null) {
            ConfigServiceMock.load();
        }

        return ConfigServiceMock._configStream;
    }

    static get configStream(): Observable<Config> {
        if (ConfigServiceMock._configStream == null) {
            ConfigServiceMock.load();
        }

        return ConfigServiceMock._configStream;
    }

    get config(): Config {
        let mockRequest: Config = {
            orientDBUrl: "/orientdb",
            orientDBDatabase: "smsc",
            i18nPath: "assets/i18n",
            debug: false
        };

        ConfigServiceMock._config = mockRequest;
        return ConfigServiceMock._config;
    }

    private static load() {
        ConfigServiceMock._configStream = Observable.create((observer: Observer<Config>) => {
            let mockRequest: Config = {
                orientDBUrl: "/orientdb",
                orientDBDatabase: "smsc",
                i18nPath: "assets/i18n",
                debug: false
            };

            ConfigServiceMock._config = mockRequest;
            observer.next(ConfigServiceMock._config);
        });
    }
}

