"use strict";
var core_1 = require('@angular/core');
var ng2_translate_1 = require('ng2-translate/ng2-translate');
var router_1 = require('@angular/router');
var token_service_1 = require('../services/auth/token.service');
var notificationOptions_1 = require('../common/notificationOptions');
var loadingRouterOutlet_service_1 = require('../services/loading/loadingRouterOutlet.service');
var loadingGrid_service_1 = require('../services/loading/loadingGrid.service');
var sidenav_1 = require("@angular2-material/sidenav");
var sidebarService_1 = require("../sidebar/sidebarService");
var Navigation = (function () {
    function Navigation(router, translate, tokenService, loadingROService, service, sidebarService) {
        this.router = router;
        this.translate = translate;
        this.tokenService = tokenService;
        this.loadingROService = loadingROService;
        this.service = service;
        this.sidebarService = sidebarService;
        this.notificationOptions = notificationOptions_1.NOTIFICATION_OPTIONS;
        this.router.events.subscribe(function (event) {
            if (event instanceof router_1.NavigationStart) {
                loadingROService.start();
            }
            if (event instanceof router_1.NavigationEnd) {
                loadingROService.stop();
            }
        });
    }
    Navigation.prototype.logout = function () {
        this.tokenService.resetToken();
        this.router.navigateByUrl('/login');
    };
    Navigation.prototype.ngOnInit = function () {
        console.log(this.sidenav);
        this.sidebarService.sidenav = this.sidenav;
    };
    __decorate([
        core_1.ViewChild('sidenav'), 
        __metadata('design:type', sidenav_1.MdSidenav)
    ], Navigation.prototype, "sidenav", void 0);
    Navigation = __decorate([
        core_1.Component({
            selector: 'navigation',
            providers: [],
            template: require('./navigation.html'),
            styleUrls: [
                require('./navigation.scss')
            ]
        }), 
        __metadata('design:paramtypes', [router_1.Router, ng2_translate_1.TranslateService, token_service_1.TokenService, loadingRouterOutlet_service_1.LoadingRouterOutletService, loadingGrid_service_1.LoadingGridService, sidebarService_1.SidebarService])
    ], Navigation);
    return Navigation;
}());
exports.Navigation = Navigation;
//# sourceMappingURL=navigation.component.js.map