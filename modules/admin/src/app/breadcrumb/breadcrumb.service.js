"use strict";
var router_1 = require('@angular/router');
var core_1 = require('@angular/core');
var BreadcrumbService = (function () {
    function BreadcrumbService(router, route) {
        this.router = router;
        this.route = route;
        this.childs = [];
        this.name = this.route.component['name'];
        this.chainBreadcrumbItems(this.route);
    }
    BreadcrumbService.prototype.chainBreadcrumbItems = function (route) {
        if (route.component['name'] === 'Navigation') {
            return;
        }
        this.childs.push({
            'name': route.component['name'],
            'router': this.chainPaths(route.pathFromRoot),
        });
        this.chainBreadcrumbItems(route.parent);
    };
    BreadcrumbService.prototype.chainPaths = function (paths) {
        var result = '';
        for (var i = 2; i < paths.length; i++) {
            if (paths[i].routeConfig.path !== '') {
                if (i !== paths.length - 1) {
                    result += paths[i].routeConfig.path + '/';
                }
                else {
                    result += paths[i].routeConfig.path;
                }
            }
        }
        if (result === '') {
            return '/';
        }
        return result;
    };
    BreadcrumbService.prototype.navigateTo = function (router) {
        this.router.navigateByUrl(router);
    };
    BreadcrumbService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute])
    ], BreadcrumbService);
    return BreadcrumbService;
}());
exports.BreadcrumbService = BreadcrumbService;
//# sourceMappingURL=breadcrumb.service.js.map