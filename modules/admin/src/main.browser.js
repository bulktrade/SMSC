"use strict";
/*
 * Angular bootstraping
 */
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var environment_1 = require('./app/environment');
var hmr_1 = require('@angularclass/hmr');
var app_1 = require('./app');
var configService_1 = require('./app/config/configService');
/*
 * App Module
 * our top level module that holds all of our components
 */
/*
 * Bootstrap our Angular app with a top level NgModule
 */
function main() {
    return new Promise(function (resolve, reject) {
        configService_1.ConfigService.configStream.subscribe(function () {
            resolve(platform_browser_dynamic_1.platformBrowserDynamic()
                .bootstrapModule(app_1.AppModule)
                .then(environment_1.decorateModuleRef)
                .catch(function (err) { return console.error(err); }));
        }, function (error) {
            reject(error);
        });
    });
}
exports.main = main;
hmr_1.bootloader(main);
//# sourceMappingURL=main.browser.js.map