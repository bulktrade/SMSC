import { inject, TestBed } from '@angular/core/testing';
import {
    HttpModule,
    ResponseOptions,
    Response
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { CRUD_PROVIDERS } from '../crud/common/crudProviders';

import { GridService } from './grid.service';
import { APP_PROVIDERS } from '../app.module';
import { CrudLevel } from '../crud/model/crudLevel';
import { LinksetProperty } from '../crud/model/linksetProperty';
import { HTTP_PROVIDERS } from '../common/mock/httpProviders';

describe('Grid Service', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ...CRUD_PROVIDERS,
                ...APP_PROVIDERS,
                ...HTTP_PROVIDERS,
                GridService,
            ],
            imports: [
                HttpModule
            ]
        });
    });

    it('should be replaced RID with titleColumns', inject([MockBackend, GridService],
        (backend: MockBackend, gridService: GridService) => {
        let columnDefs = [{
            property: 'contacts',
            linkedClass: 'CustomerContact'
        }];

        let rowData = [{
            customerId: 211,
            users: ['#5:0']
        }];

        backend.connections.subscribe(c => {
            let response = new ResponseOptions({ body: '{"result": "success"}' });
            c.mockRespond(new Response(response));
        });

        gridService.selectLinksetProperties(columnDefs, rowData)
            .then(res => {
                expect(typeof res).toEqual('object');
            });
    }));

    it('should be called method combineOperators', inject([MockBackend, GridService],
        (backend: MockBackend, gridService: GridService) => {
        let inputModel = {
            city: 'Odessa',
            postcode: 65000
        };
        let linksetProperty: LinksetProperty = {
            name: 'city',
            type: 'STRING',
            data: inputModel,
            bingingProperties: ['#5:1', '#5:2']
        };
        let currentCrudLevel: CrudLevel = {
            className: 'Dashboard',
            inputModel: inputModel,
            linksetProperty: linksetProperty
        };

        backend.connections.subscribe(c => {
            let response = new ResponseOptions({ body: '{"result": "success"}' });
            c.mockRespond(new Response(response));
        });

        spyOn(gridService, 'combineOperators');
        gridService.combineOperators(currentCrudLevel);
        expect(gridService.combineOperators).toHaveBeenCalledWith(currentCrudLevel);
    }));

});

