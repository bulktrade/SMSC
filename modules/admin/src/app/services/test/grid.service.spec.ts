import { inject, TestBed } from '@angular/core/testing';
import { HttpModule, BaseRequestOptions, Http, ConnectionBackend, ResponseOptions, Response } from "@angular/http";
import { MockBackend } from "@angular/http/testing";
import { CRUD_PROVIDERS } from "../../crud/common/crudProviders";
import { APP_PROVIDERS } from "../../index";
import { GridService } from "../grid.service";

describe('Grid Service', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ...CRUD_PROVIDERS,
                ...APP_PROVIDERS,
                BaseRequestOptions,
                GridService,
                MockBackend,
                {
                    provide: Http, useFactory: (backend: ConnectionBackend,
                                                defaultOptions: BaseRequestOptions) => {
                    return new Http(backend, defaultOptions);
                }, deps: [MockBackend, BaseRequestOptions]
                }
            ],
            imports: [
                HttpModule
            ]
        });
    });

    it('should be replaced RID with titleColumns', inject([MockBackend, GridService], (backend: MockBackend, gridService: GridService) => {
        let columnDefs = [{
            property: "contacts",
            linkedClass: "CustomerContact"
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
            })
    }));

});

