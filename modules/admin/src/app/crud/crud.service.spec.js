"use strict";
var testing_1 = require('@angular/core/testing');
var crudProviders_1 = require('./common/crudProviders');
var http_1 = require('@angular/http');
var testing_2 = require('@angular/http/testing');
var crud_service_1 = require('./crud.service');
describe('Crud Service', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: crudProviders_1.CRUD_PROVIDERS.concat([
                crud_service_1.CrudService,
                http_1.BaseRequestOptions,
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
    it('the type should be text', testing_1.inject([crud_service_1.CrudService], function (crudService) {
        expect(crudService.inputType('STRING')).toEqual('text');
        expect(crudService.inputType('TEST')).toBeNull();
    }));
    it('should return a columnDefs with options for grid and form', testing_1.inject([testing_2.MockBackend, crud_service_1.CrudService], function (backend, crudService) {
        var bodyResponse = {
            'properties': [{
                    'name': 'test',
                    'headerName': 'test',
                    'field': 'test',
                    'editable': true,
                    'required': true,
                    'type': 'test',
                    'linkedClass': 'test',
                    'custom': 'test'
                }]
        };
        backend.connections.subscribe(function (c) {
            var response = new http_1.ResponseOptions({ body: JSON.stringify(bodyResponse) });
            c.mockRespond(new http_1.Response(response));
        });
        spyOn(crudService, 'getColumnDefs');
        crudService.getColumnDefs('Customers', false);
        expect(crudService.getColumnDefs).toHaveBeenCalledWith('Customers', false);
    }));
    it('should return a successful result after the record is created', testing_1.inject([testing_2.MockBackend, crud_service_1.CrudService], function (backend, crudService) {
        var path = '/orientdb/batch/smsc';
        var className = 'Customer';
        var colsValue = {
            city: 'Test',
            country: 'Test'
        };
        backend.connections.subscribe(function (c) {
            expect(c.request.url).toEqual(path);
            var response = new http_1.ResponseOptions({ body: '{"result": "success"}' });
            c.mockRespond(new http_1.Response(response));
        });
        crudService.initGridData = Promise.resolve();
        crudService.createRecord(colsValue, className)
            .then(function (res) {
            expect(res.json().result).toEqual('success');
        });
    }));
    it('should return a successful result after the record is updated', testing_1.inject([testing_2.MockBackend, crud_service_1.CrudService], function (backend, crudService) {
        var path = '/orientdb/batch/smsc';
        var colsValue = {
            rid: '#1:1',
            version: '2',
            city: 'Test',
            country: 'Test'
        };
        backend.connections.subscribe(function (c) {
            expect(c.request.url).toEqual(path);
            var response = new http_1.ResponseOptions({ body: '{"result": "success"}' });
            c.mockRespond(new http_1.Response(response));
        });
        crudService.initGridData = Promise.resolve();
        crudService.updateRecord(colsValue)
            .then(function (res) {
            expect(res.json().result).toEqual('success');
        });
    }));
    it('should return a successful result after deleting a record', testing_1.inject([testing_2.MockBackend, crud_service_1.CrudService], function (backend, crudService) {
        var path = '/orientdb/batch/smsc';
        var rid = '#1:1';
        backend.connections.subscribe(function (c) {
            expect(c.request.url).toEqual(path);
            var response = new http_1.ResponseOptions({ body: '{"result": "success"}' });
            c.mockRespond(new http_1.Response(response));
        });
        crudService.initGridData = Promise.resolve();
        crudService.deleteRecord([rid])
            .subscribe(function (res) {
            expect(res.json().result).toEqual('success');
        });
    }));
    it('should return a rowData', testing_1.inject([testing_2.MockBackend, crud_service_1.CrudService], function (backend, crudService) {
        var path = '/orientdb/query/smsc/sql/select%20from%20Customer/20';
        var className = 'Customer';
        var body = {
            'result': []
        };
        backend.connections.subscribe(function (c) {
            expect(c.request.url).toEqual(path);
            var response = new http_1.ResponseOptions({ body: JSON.stringify(body) });
            c.mockRespond(new http_1.Response(response));
        });
        crudService.getStore(className)
            .subscribe(function (res) {
            expect(res).toBeDefined();
        });
    }));
    it('should return a metadata', testing_1.inject([testing_2.MockBackend, crud_service_1.CrudService], function (backend, crudService) {
        var className = 'Customer';
        var properties = [
            {
                linkedClass: 'Test',
                type: 'STRING',
                mandatory: true,
            }
        ];
        var columnGrid = {};
        var columnForm = {};
        crudService.className = className;
        crudService.getPropertyMetadata(columnGrid, true, properties);
        expect(columnGrid.hasOwnProperty('type'));
        crudService.getPropertyMetadata(columnForm, false, properties);
        expect(columnForm.hasOwnProperty('type'));
    }));
});
//# sourceMappingURL=crud.service.spec.js.map