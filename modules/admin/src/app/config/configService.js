"use strict";
var core_1 = require('@angular/core');
var rxjs_1 = require('rxjs');
var ConfigService = (function () {
    function ConfigService() {
    }
    Object.defineProperty(ConfigService.prototype, "configStream", {
        get: function () {
            if (ConfigService._configStream == null) {
                ConfigService.load();
            }
            return ConfigService._configStream;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigService, "configStream", {
        get: function () {
            if (ConfigService._configStream == null) {
                ConfigService.load();
            }
            return ConfigService._configStream;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigService.prototype, "config", {
        get: function () {
            return ConfigService._config;
        },
        enumerable: true,
        configurable: true
    });
    ConfigService.load = function () {
        ConfigService._configStream = rxjs_1.Observable.create(function (observer) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', 'config.json');
            xhr.onload = function () {
                if (xhr.status === 200) {
                    try {
                        ConfigService._config = JSON.parse(xhr.responseText);
                        observer.next(ConfigService._config);
                    }
                    catch (ex) {
                        observer.error({
                            exception: ex,
                            xhr: xhr
                        });
                    }
                }
                else {
                    observer.error(xhr);
                }
                observer.complete();
            };
            xhr.send();
        });
    };
    ConfigService._configStream = null;
    ConfigService._config = null;
    ConfigService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], ConfigService);
    return ConfigService;
}());
exports.ConfigService = ConfigService;
//# sourceMappingURL=configService.js.map