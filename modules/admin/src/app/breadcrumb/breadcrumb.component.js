"use strict";
var core_1 = require('@angular/core');
var ng2_translate_1 = require('ng2-translate/ng2-translate');
var router_1 = require('@angular/router');
var breadcrumb_service_1 = require('./breadcrumb.service');
var ng_module_1 = require("@angular/core/src/metadata/ng_module");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var Breadcrumb = (function () {
    function Breadcrumb(translate, router, route) {
        this.translate = translate;
        this.router = router;
        this.route = route;
    }
    Breadcrumb.prototype.ngOnInit = function () {
        this.breadcrumb = new breadcrumb_service_1.BreadcrumbService(this.router, this.route);
    };
    Breadcrumb = __decorate([
        core_1.Component({
            selector: 'breadcrumb',
            template: require('./breadcrumb.html'),
            inputs: [
                'title',
                'description',
                'parents'
            ],
            providers: [],
            styleUrls: [
                require('./breadcrumb.scss')
            ]
        }), 
        __metadata('design:paramtypes', [ng2_translate_1.TranslateService, router_1.Router, router_1.ActivatedRoute])
    ], Breadcrumb);
    return Breadcrumb;
}());
exports.Breadcrumb = Breadcrumb;
var BreadcrumbModule = (function () {
    function BreadcrumbModule() {
    }
    BreadcrumbModule.forRoot = function () {
        return {
            ngModule: BreadcrumbModule
        };
    };
    BreadcrumbModule = __decorate([
        ng_module_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                ng2_translate_1.TranslateModule
            ],
            exports: [
                Breadcrumb
            ],
            declarations: [
                Breadcrumb
            ],
            providers: [
                breadcrumb_service_1.BreadcrumbService,
                ng2_translate_1.TranslateService
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], BreadcrumbModule);
    return BreadcrumbModule;
}());
exports.BreadcrumbModule = BreadcrumbModule;
//# sourceMappingURL=breadcrumb.component.js.map