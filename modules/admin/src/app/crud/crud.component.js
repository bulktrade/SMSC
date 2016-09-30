"use strict";
var core_1 = require('@angular/core');
var ng2_translate_1 = require('ng2-translate/ng2-translate');
var router_1 = require('@angular/router');
var crud_service_1 = require('./crud.service');
var Crud = (function () {
    function Crud(translate, route, router, crudService) {
        this.translate = translate;
        this.route = route;
        this.router = router;
        this.crudService = crudService;
    }
    Crud.prototype.ngOnInit = function () {
        var _this = this;
        this.router.events.subscribe(function (event) {
            if (event instanceof router_1.NavigationStart) {
                _this.crudService.hideAllMessageBoxes();
            }
        });
    };
    Crud.prototype.ngOnDestroy = function () {
        this.crudService.resetCrudLevels();
    };
    Crud = __decorate([
        core_1.Component({
            selector: 'crud',
            template: require('./crud.html'),
            styleUrls: [
                require('./crud.scss')
            ],
            providers: []
        }), 
        __metadata('design:paramtypes', [ng2_translate_1.TranslateService, router_1.ActivatedRoute, router_1.Router, crud_service_1.CrudService])
    ], Crud);
    return Crud;
}());
exports.Crud = Crud;
//# sourceMappingURL=crud.component.js.map