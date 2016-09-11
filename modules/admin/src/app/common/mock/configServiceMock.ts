import { Injectable } from "@angular/core";
import { Observable, Observer } from "rxjs";
import { Config } from "../../config/config";
import { XMLHttpRequestMock } from "./XMLHttpRequestMock";

@Injectable()
export class ConfigServiceMock {
    private static _configStream: Observable<Config> = null;
    private static _config: Config = null;
    private static _responseText: Config = {
        orientDBUrl: "/orientdb",
        orientDBDatabase: "smsc",
        i18nPath: "assets/i18n",
        debug: false
    };

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
        ConfigServiceMock._config = ConfigServiceMock._responseText;
        return ConfigServiceMock._config;
    }

    private static load() {
        ConfigServiceMock._configStream = Observable.create((observer: Observer<Config>) => {
            let xhr = new XMLHttpRequestMock();
            xhr.responseText = ConfigServiceMock._responseText;
            xhr.open('GET', 'config.json');
            xhr.onload = () => {
                if (xhr.status === 200) {
                    try {
                        ConfigServiceMock._config = JSON.parse(xhr.responseText);
                        observer.next(ConfigServiceMock._config);
                    } catch (ex) {
                        observer.error({
                            exception: ex,
                            xhr: xhr
                        });
                    }
                } else {
                    observer.error(xhr);
                }

                observer.complete();
            };

            xhr.send();
        });
    }
}

