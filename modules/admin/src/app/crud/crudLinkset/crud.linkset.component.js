"use strict";
var core_1 = require('@angular/core');
var ng2_translate_1 = require('ng2-translate/ng2-translate');
var router_1 = require('@angular/router');
var crud_service_1 = require('../crud.service');
var common_1 = require('@angular/common');
var grid_service_1 = require('../../services/grid.service');
var routerOutletService_1 = require('../../services/routerOutletService');
var CrudLinkset = (function () {
    function CrudLinkset(translate, crudService, router, route, location, gridService, roService) {
        this.translate = translate;
        this.crudService = crudService;
        this.router = router;
        this.route = route;
        this.location = location;
        this.gridService = gridService;
        this.roService = roService;
        this.resolveData = null;
    }
    CrudLinkset.prototype.ngOnInit = function () {
        this.resolveData = this.route.snapshot.data['linkset'];
        this.crudService.gridOptions.columnDefs = this.resolveData.grid;
    };
    CrudLinkset.prototype.back = function () {
        this.crudService.previousCrudLevel();
        this.location.back();
    };
    CrudLinkset.prototype.navigateToCreate = function () {
        this.crudService.setModel({});
        this.router.navigate([this.crudService.parentPath,
            'create', this.crudService.getLinkedClass()]);
    };
    CrudLinkset.prototype.navigateToDelete = function () {
        var id = this.crudService.getSelectedRID(this.crudService.gridOptions);
        this.router.navigate([this.crudService.parentPath, 'delete',
            id.join().replace(/\[|\]/gi, '')]);
    };
    CrudLinkset.prototype.addLink = function (gridOptions) {
        var _this = this;
        var className = this.crudService.getLinkedClass();
        var previousCrudLevel = this.crudService.previousCrudLevel();
        var params = previousCrudLevel.linksetProperty.data;
        return this.getLinkset(gridOptions, previousCrudLevel.linksetProperty.type, className)
            .then(function (linkSet) {
            params[previousCrudLevel.linksetProperty.name] = linkSet;
            if (_this.roService.isPreviousRoute('CrudView')) {
                _this.crudService.updateRecord(params);
                _this.location.back();
            }
            else {
                _this.crudService.model = params;
                _this.location.back();
            }
        });
    };
    CrudLinkset.prototype.getLinkset = function (gridOptions, type, className) {
        var focusedRows = gridOptions.api.getSelectedRows();
        var result = [];
        return this.gridService.getTitleColumns(className)
            .then(function (columnName) {
            for (var i = 0; i < focusedRows.length; i++) {
                switch (type) {
                    case 'LINKSET':
                        result['_' + i] = focusedRows[i]['@rid'];
                        if (focusedRows[i].hasOwnProperty(columnName) &&
                            typeof columnName !== 'undefined') {
                            result.push(focusedRows[i][columnName]);
                        }
                        else {
                            result.push(focusedRows[i]['@rid']);
                        }
                        break;
                    case 'LINK':
                        result[0] = focusedRows[i][columnName];
                        result['rid'] = focusedRows[i]['@rid'];
                        break;
                    default:
                        break;
                }
            }
            result['type'] = type;
            return result;
        });
    };
    CrudLinkset = __decorate([
        core_1.Component({
            selector: 'crud-linkset',
            template: require('./crud.linkset.html'),
            styleUrls: [
                require('./crud.linkset.scss'),
                require('../common/grid.scss'),
                require('../common/style.scss')
            ],
            providers: []
        }), 
        __metadata('design:paramtypes', [ng2_translate_1.TranslateService, crud_service_1.CrudService, router_1.Router, router_1.ActivatedRoute, common_1.Location, grid_service_1.GridService, routerOutletService_1.RouterOutletService])
    ], CrudLinkset);
    return CrudLinkset;
}());
exports.CrudLinkset = CrudLinkset;
//# sourceMappingURL=crud.linkset.component.js.map