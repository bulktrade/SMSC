"use strict";
var core_1 = require('@angular/core');
var ng2_translate_1 = require('ng2-translate/ng2-translate');
var router_1 = require('@angular/router');
var crud_service_1 = require('../crud.service');
var common_1 = require('@angular/common');
var CrudDelete = (function () {
    function CrudDelete(translate, crudService, router, route, location) {
        this.translate = translate;
        this.crudService = crudService;
        this.router = router;
        this.route = route;
        this.location = location;
    }
    CrudDelete.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.id = params['id'];
        });
    };
    CrudDelete.prototype.back = function () {
        this.location.back();
    };
    CrudDelete.prototype.deleteRecords = function () {
        var _this = this;
        this.crudService.deleteRecord(this.id.split(','))
            .subscribe(function () {
            _this.back();
        }, function (error) {
            _this.crudService.serviceNotifications.createNotificationOnResponse(error);
        });
    };
    CrudDelete = __decorate([
        core_1.Component({
            selector: 'crud-delete',
            template: require('./crud.delete.html'),
            styleUrls: [
                require('./crud.delete.scss'),
                require('../common/style.scss')
            ],
            providers: []
        }), 
        __metadata('design:paramtypes', [ng2_translate_1.TranslateService, crud_service_1.CrudService, router_1.Router, router_1.ActivatedRoute, common_1.Location])
    ], CrudDelete);
    return CrudDelete;
}());
exports.CrudDelete = CrudDelete;
//# sourceMappingURL=crud.delete.component.js.map