"use strict";
var RouterOutletService = (function () {
    function RouterOutletService() {
    }
    RouterOutletService.prototype.isPreviousRoute = function (componentName) {
        if (this._previousRoute) {
            if (this._previousRoute.route.component['name'] === componentName) {
                return true;
            }
            else {
                return false;
            }
        }
    };
    RouterOutletService.prototype.isCurrentRoute = function (componentName) {
        if (this._currentRoute) {
            if (this._currentRoute.route.component['name'] === componentName) {
                return true;
            }
            else {
                return false;
            }
        }
    };
    Object.defineProperty(RouterOutletService.prototype, "previousRoute", {
        get: function () {
            return this._previousRoute;
        },
        set: function (value) {
            this._previousRoute = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RouterOutletService.prototype, "currentRoute", {
        get: function () {
            return this._currentRoute;
        },
        set: function (value) {
            this._currentRoute = value;
        },
        enumerable: true,
        configurable: true
    });
    return RouterOutletService;
}());
exports.RouterOutletService = RouterOutletService;
//# sourceMappingURL=routerOutletService.js.map