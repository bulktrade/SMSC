/*
 * Angular bootstraping
 */
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { decorateModuleRef } from "./app/environment";
import { bootloader } from "@angularclass/hmr";
import { AppModule } from "./app";
import { ConfigService } from "./app/config/configService";

/*
 * App Module
 * our top level module that holds all of our components
 */

/*
 * Bootstrap our Angular app with a top level NgModule
 */
export function main(): Promise<any> {
    return new Promise((resolve, reject) => {
        ConfigService.configStream.subscribe(
            () => {
                resolve(
                    platformBrowserDynamic()
                        .bootstrapModule(AppModule)
                        .then(decorateModuleRef)
                        .catch(err => console.error(err))
                );
            },
            error => {
                reject(error);
            }
        );
    });
}

bootloader(main);
