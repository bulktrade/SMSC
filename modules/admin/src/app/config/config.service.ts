import {Injectable} from "@angular/core";
import {Config} from "./config";
import {Observable, Observer} from "rxjs";

@Injectable()
export class ConfigService {
    private static _configStream: Observable<Config> = null;
    private static _config: Config = null;

    get configStream(): Observable<Config> {
        if (ConfigService._configStream == null) {
            ConfigService.load();
        }

        return ConfigService._configStream;
    }

    static get configStream(): Observable<Config> {
        if (ConfigService._configStream == null) {
            ConfigService.load();
        }

        return ConfigService._configStream;
    }

    get config(): Config {
        return ConfigService._config;
    }

    private static load() {
        ConfigService._configStream = Observable.create((observer: Observer<Config>) => {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', 'config.json');
            xhr.onload = () => {
                if (xhr.status === 200) {
                    try {
                        ConfigService._config = JSON.parse(xhr.responseText);
                        observer.next(ConfigService._config);
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
