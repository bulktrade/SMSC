"use strict";
var core_1 = require('@angular/core');
var LoadingService = (function () {
    function LoadingService() {
        this._loading = false;
    }
    LoadingService.prototype.start = function () {
        this._loading = true;
    };
    LoadingService.prototype.stop = function () {
        this._loading = false;
    };
    Object.defineProperty(LoadingService.prototype, "loading", {
        get: function () {
            return this._loading;
        },
        enumerable: true,
        configurable: true
    });
    LoadingService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], LoadingService);
    return LoadingService;
}());
exports.LoadingService = LoadingService;
//# sourceMappingURL=loading.service.js.map