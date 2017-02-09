/*
 * Angular bootstraping
 */
import { decorateModuleRef } from "./app/environment";
import { AppModuleNgFactory } from "../compiled/src/app/app.module.ngfactory";
import { ConfigService } from "./app/config/config.service";
import { platformBrowser } from "@angular/platform-browser";

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
                    platformBrowser()
                        .bootstrapModuleFactory(AppModuleNgFactory)
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

export function bootstrapDomReady() {
    document.addEventListener('DOMContentLoaded', main);
}

bootstrapDomReady();
