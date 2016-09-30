"use strict";
var core_1 = require('@angular/core');
var ng2_translate_1 = require('ng2-translate/ng2-translate');
var router_1 = require('@angular/router');
var crud_service_1 = require('../crud.service');
var CrudView = (function () {
    function CrudView(translate, crudService, router, route) {
        this.translate = translate;
        this.crudService = crudService;
        this.router = router;
        this.route = route;
        this.resolveData = null;
    }
    CrudView.prototype.ngOnInit = function () {
        this.resolveData = this.route.snapshot.data['view'];
        this.crudService.gridOptions.columnDefs = this.resolveData.grid;
    };
    CrudView.prototype.navigateToCreate = function () {
        this.crudService.setModel({});
        this.router.navigate([this.crudService.parentPath,
            'create', this.crudService.getClassName()]);
    };
    CrudView.prototype.navigateToDelete = function () {
        var id = this.crudService.getSelectedRID(this.crudService.gridOptions);
        this.router.navigate([this.crudService.parentPath, 'delete',
            id.join().replace(/\[|\]/gi, '')]);
    };
    CrudView.prototype.clickOnCell = function (event) {
        if (event.colDef.type === 'LINK' ||
            event.colDef.type === 'LINKSET') {
            this.crudService.setLinkedClass(event.colDef.linkedClass);
            var linsetProperty = {
                name: event.colDef.property,
                type: event.colDef.type,
                bingingProperties: event.colDef.bingingProperties,
                data: event.data
            };
            this.crudService.navigateToLinkset(linsetProperty);
        }
    };
    CrudView = __decorate([
        core_1.Component({
            selector: 'crud-view',
            template: require('./crud.view.html'),
            styleUrls: [
                require('./crud.view.scss'),
                require('../common/grid.scss'),
                require('../common/style.scss')
            ],
            providers: [],
        }), 
        __metadata('design:paramtypes', [ng2_translate_1.TranslateService, crud_service_1.CrudService, router_1.Router, router_1.ActivatedRoute])
    ], CrudView);
    return CrudView;
}());
exports.CrudView = CrudView;
//# sourceMappingURL=crud.view.component.js.map