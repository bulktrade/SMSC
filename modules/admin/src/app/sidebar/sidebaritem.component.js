"use strict";
var core_1 = require('@angular/core');
var ng2_translate_1 = require('ng2-translate/ng2-translate');
var router_1 = require('@angular/router');
var SidebarItem = (function () {
    function SidebarItem(translate, router) {
        this.translate = translate;
        this.router = router;
    }
    SidebarItem.prototype.ngOnInit = function () {
    };
    SidebarItem.prototype.getStorageItem = function (item) {
        return this[item.substring(1, item.length)];
    };
    SidebarItem.prototype.setToggle = function (name) {
        this[name.substring(1, name.length)] = !this[name.substring(1, name.length)];
    };
    __decorate([
        core_1.Input('icon'), 
        __metadata('design:type', Object)
    ], SidebarItem.prototype, "icon", void 0);
    __decorate([
        core_1.Input('path'), 
        __metadata('design:type', Object)
    ], SidebarItem.prototype, "path", void 0);
    __decorate([
        core_1.Input('paramsAsDefault'), 
        __metadata('design:type', Object)
    ], SidebarItem.prototype, "paramsAsDefault", void 0);
    __decorate([
        core_1.Input('nameItem'), 
        __metadata('design:type', Object)
    ], SidebarItem.prototype, "nameItem", void 0);
    __decorate([
        core_1.Input('showInSubNavigation'), 
        __metadata('design:type', Object)
    ], SidebarItem.prototype, "showInSubNavigation", void 0);
    __decorate([
        core_1.Input('submenu'), 
        __metadata('design:type', Object)
    ], SidebarItem.prototype, "submenu", void 0);
    __decorate([
        core_1.Input('toggle'), 
        __metadata('design:type', Object)
    ], SidebarItem.prototype, "toggle", void 0);
    SidebarItem = __decorate([
        core_1.Component({
            selector: 'sidebar-item',
            template: require('./sidebaritem.html'),
            providers: [],
            animations: [
                core_1.trigger('state', [
                    core_1.state('closed', core_1.style({ height: 0 })),
                    core_1.state('open', core_1.style({ height: '*' })),
                    core_1.transition('closed => open', [core_1.animate('200ms ease-out')]),
                    core_1.transition('open => closed', [core_1.animate('200ms ease-out')])
                ]),
            ],
            styleUrls: [
                require('./sidebaritem.scss')
            ]
        }),
        core_1.Injectable(), 
        __metadata('design:paramtypes', [ng2_translate_1.TranslateService, router_1.Router])
    ], SidebarItem);
    return SidebarItem;
}());
exports.SidebarItem = SidebarItem;
//# sourceMappingURL=sidebaritem.component.js.map