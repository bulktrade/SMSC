"use strict";
var core_1 = require('@angular/core');
var SidebarService = (function () {
    function SidebarService() {
        this._fullScreenMode = false;
    }
    Object.defineProperty(SidebarService.prototype, "sidenav", {
        set: function (value) {
            this._sidenav = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SidebarService.prototype, "fullScreenMode", {
        get: function () {
            return this._fullScreenMode;
        },
        set: function (value) {
            this._fullScreenMode = value;
        },
        enumerable: true,
        configurable: true
    });
    SidebarService.prototype.closeSidenav = function () {
        return this._sidenav.close();
    };
    SidebarService.prototype.toggleSidenav = function () {
        return this._sidenav.toggle();
    };
    SidebarService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], SidebarService);
    return SidebarService;
}());
exports.SidebarService = SidebarService;
//# sourceMappingURL=sidebarService.js.map