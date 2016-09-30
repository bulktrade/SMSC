"use strict";
var testing_1 = require('@angular/core/testing');
var http_1 = require('@angular/http');
var testing_2 = require('@angular/http/testing');
var crudProviders_1 = require('../crud/common/crudProviders');
var grid_service_1 = require('./grid.service');
var app_module_1 = require('../app.module');
describe('Grid Service', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: crudProviders_1.CRUD_PROVIDERS.concat(app_module_1.APP_PROVIDERS, [
                http_1.BaseRequestOptions,
                grid_service_1.GridService,
                testing_2.MockBackend,
                {
                    provide: http_1.Http, useFactory: function (backend, defaultOptions) {
                        return new http_1.Http(backend, defaultOptions);
                    }, deps: [testing_2.MockBackend, http_1.BaseRequestOptions]
                }
            ]),
            imports: [
                http_1.HttpModule
            ]
        });
    });
    it('should be replaced RID with titleColumns', testing_1.inject([testing_2.MockBackend, grid_service_1.GridService], function (backend, gridService) {
        var columnDefs = [{
                property: 'contacts',
                linkedClass: 'CustomerContact'
            }];
        var rowData = [{
                customerId: 211,
                users: ['#5:0']
            }];
        backend.connections.subscribe(function (c) {
            var response = new http_1.ResponseOptions({ body: '{"result": "success"}' });
            c.mockRespond(new http_1.Response(response));
        });
        gridService.selectLinksetProperties(columnDefs, rowData)
            .then(function (res) {
            expect(typeof res).toEqual('object');
        });
    }));
    it('should be called method combineOperators', testing_1.inject([testing_2.MockBackend, grid_service_1.GridService], function (backend, gridService) {
        var inputModel = {
            city: 'Odessa',
            postcode: 65000
        };
        var linksetProperty = {
            name: 'city',
            type: 'STRING',
            data: inputModel,
            bingingProperties: ['#5:1', '#5:2']
        };
        var currentCrudLevel = {
            className: 'Dashboard',
            inputModel: inputModel,
            linksetProperty: linksetProperty
        };
        backend.connections.subscribe(function (c) {
            var response = new http_1.ResponseOptions({ body: '{"result": "success"}' });
            c.mockRespond(new http_1.Response(response));
        });
        spyOn(gridService, 'combineOperators');
        gridService.combineOperators(currentCrudLevel);
        expect(gridService.combineOperators).toHaveBeenCalledWith(currentCrudLevel);
    }));
});
//# sourceMappingURL=grid.service.spec.js.map