"use strict";
var core_1 = require('@angular/core');
var ng2_translate_1 = require('ng2-translate/ng2-translate');
var router_1 = require('@angular/router');
var Sidebar = (function () {
    function Sidebar(translate, router) {
        this.translate = translate;
        this.router = router;
        this.dataNavItems = [];
        this.initDataNavItems(this.router);
    }
    Sidebar.prototype.ngOnInit = function () {
    };
    Sidebar.prototype.initDataNavItems = function (router) {
        var result = [];
        var decoratorValue;
        var routeConfig = router.config;
        for (var l in routeConfig) {
            if (routeConfig.hasOwnProperty(l)) {
                var route = routeConfig[l];
                if (route.hasOwnProperty('children')) {
                    for (var i in route.children) {
                        if (route.children.hasOwnProperty(i)) {
                            var item = route.children[i];
                            if (item.hasOwnProperty('data') &&
                                item.data.hasOwnProperty('showInSubNavigation') &&
                                item.data.showInSubNavigation) {
                                if (item.hasOwnProperty('children')) {
                                    decoratorValue = item.children;
                                    for (var k in decoratorValue) {
                                        if (decoratorValue.hasOwnProperty(k)) {
                                            var subItem = decoratorValue[k];
                                            if (subItem.hasOwnProperty('data') &&
                                                subItem.data.hasOwnProperty('showInSubNavigation')
                                                && subItem.data.showInSubNavigation) {
                                                var submenu = {
                                                    name: subItem.component.name.toLowerCase(),
                                                    path: subItem.path,
                                                    icon: subItem.data.icon
                                                };
                                                result.push(submenu);
                                            }
                                        }
                                    }
                                }
                                if (result.length === 0) {
                                    result = undefined;
                                }
                                var sidebarItem = {
                                    name: item.component.name.toLowerCase(),
                                    path: item.path ? '/' + item.path : '/',
                                    icon: item.data.icon,
                                    toggle: item.data.toggle,
                                    submenu: result,
                                    showInSubNavigation: item.data.showInSubNavigation
                                };
                                this.dataNavItems.push(sidebarItem);
                                result = [];
                            }
                        }
                    }
                }
            }
        }
    };
    Sidebar = __decorate([
        core_1.Component({
            selector: 'sidebar',
            template: require('./sidebar.html'),
            providers: [],
            styleUrls: [
                require('./sidebar.scss')
            ]
        }), 
        __metadata('design:paramtypes', [ng2_translate_1.TranslateService, router_1.Router])
    ], Sidebar);
    return Sidebar;
}());
exports.Sidebar = Sidebar;
//# sourceMappingURL=sidebar.component.js.map