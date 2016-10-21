import {
    inject, TestBed
} from '@angular/core/testing';
import { CRUD_PROVIDERS } from './common/crudProviders';
import {
    ResponseOptions,
    Response,
    HttpModule,
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { CrudService } from './crud.service';
import { HTTP_PROVIDERS } from '../common/mock/httpProviders';

describe('CrudComponent Service', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ...CRUD_PROVIDERS,
                ...HTTP_PROVIDERS,
                CrudService,
            ],
            imports: [
                HttpModule
            ]
        });
    });

    it('the type should be text', inject([CrudService], (crudService: CrudService) => {
        expect(crudService.inputType('STRING')).toEqual('text');
        expect(crudService.inputType('TEST')).toBeNull();
    }));

    it('should return a columnDefs with options for grid and form',
        inject([MockBackend, CrudService], (backend: MockBackend, crudService: CrudService) => {
        let bodyResponse = {
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

        backend.connections.subscribe(c => {
            let response = new ResponseOptions({ body: JSON.stringify(bodyResponse) });
            c.mockRespond(new Response(response));
        });

        spyOn(crudService, 'getColumnDefs');
        crudService.getColumnDefs('CustomersComponent', false);
        expect(crudService.getColumnDefs).toHaveBeenCalledWith('CustomersComponent', false);
    }));

    it('should return a successful result after the record is created',
        inject([MockBackend, CrudService], (backend: MockBackend, crudService: CrudService) => {
        let path = '/orientdb/batch/smsc';
        let className = 'Customer';
        let colsValue = {
            city: 'Test',
            country: 'Test'
        };

        backend.connections.subscribe(c => {
            expect(c.request.url).toEqual(path);
            let response = new ResponseOptions({ body: '{"result": "success"}' });
            c.mockRespond(new Response(response));
        });

        crudService.initGridData = Promise.resolve();

        crudService.createRecord(colsValue, className)
            .then(res => {
                expect(res.json().result).toEqual('success');
            });
    }));

    it('should return a successful result after the record is updated',
        inject([MockBackend, CrudService], (backend: MockBackend, crudService: CrudService) => {
        let path = '/orientdb/batch/smsc';
        let colsValue = {
            rid: '#1:1',
            version: '2',
            city: 'Test',
            country: 'Test'
        };

        backend.connections.subscribe(c => {
            expect(c.request.url).toEqual(path);
            let response = new ResponseOptions({ body: '{"result": "success"}' });
            c.mockRespond(new Response(response));
        });

        crudService.initGridData = Promise.resolve();

        crudService.updateRecord(colsValue)
            .then(res => {
                expect(res.json().result).toEqual('success');
            });
    }));

    it('should return a successful result after deleting a record',
        inject([MockBackend, CrudService], (backend: MockBackend, crudService: CrudService) => {
        let path = '/orientdb/batch/smsc';
        let rid = '#1:1';

        backend.connections.subscribe(c => {
            expect(c.request.url).toEqual(path);
            let response = new ResponseOptions({ body: '{"result": "success"}' });
            c.mockRespond(new Response(response));
        });

        crudService.initGridData = Promise.resolve();

        crudService.deleteRecord([rid])
            .subscribe(res => {
                expect(res.json().result).toEqual('success');
            });
    }));

    it('should return a rowData',
        inject([MockBackend, CrudService], (backend: MockBackend, crudService: CrudService) => {
        let path = '/orientdb/query/smsc/sql/select%20from%20Customer/20';
        let className = 'Customer';
        let body = {
            'result': []
        };

        backend.connections.subscribe(c => {
            expect(c.request.url).toEqual(path);
            let response = new ResponseOptions({ body: JSON.stringify(body) });
            c.mockRespond(new Response(response));
        });

        crudService.getStore(className)
            .subscribe(res => {
                expect(res).toBeDefined();
            });
    }));

    it('should return a metadata',
        inject([MockBackend, CrudService], (backend: MockBackend, crudService: CrudService) => {
        let className = 'Customer';
        let properties = [
            {
                linkedClass: 'Test',
                type: 'STRING',
                mandatory: true,
            }
        ];
        let columnGrid: any = {};
        let columnForm: any = {};

        crudService.className = className;

        crudService.getPropertyMetadata(columnGrid, true, properties);
        expect(columnGrid.hasOwnProperty('type'));

        crudService.getPropertyMetadata(columnForm, false, properties);
        expect(columnForm.hasOwnProperty('type'));
    }));

});
