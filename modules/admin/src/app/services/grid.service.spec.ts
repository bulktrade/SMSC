import { TestBed } from "@angular/core/testing";
import { HttpModule } from "@angular/http";
import { GridService } from "./grid.service";
import { APP_PROVIDERS } from "../app.module";
import { HTTP_PROVIDERS } from "../shared/components/mock/http-providers";

describe('Grid Service', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ...APP_PROVIDERS,
                ...HTTP_PROVIDERS,
                GridService,
            ],
            imports: [
                HttpModule
            ]
        });
    });

    // it('should be replaced RID with titleColumns', inject([MockBackend, GridService],
    //     (backend: MockBackend, gridService: GridService) => {
    //     let columnDefs = [{
    //         property: 'contacts',
    //         linkedClass: 'CustomerContact'
    //     }];
    //
    //     let rowData = [{
    //         customerId: 211,
    //         users: ['#5:0']
    //     }];
    //
    //     backend.connections.subscribe(c => {
    //         let response = new ResponseOptions({ body: '{"result": "success"}' });
    //         c.mockRespond(new Response(response));
    //     });
    //
    //     gridService.selectLinksetProperties(columnDefs, rowData)
    //         .then(res => {
    //             expect(typeof res).toEqual('object');
    //         });
    // }));
    //
    // it('should be called method combineOperators', inject([MockBackend, GridService],
    //     (backend: MockBackend, gridService: GridService) => {
    //     let inputModel = {
    //         city: 'Odessa',
    //         postcode: 65000
    //     };
    //     let linksetProperty: LinksetProperty = {
    //         name: 'city',
    //         type: 'STRING',
    //         data: inputModel,
    //         bingingProperties: ['#5:1', '#5:2']
    //     };
    //     let currentCrudLevel: CrudLevel = {
    //         inputModel: inputModel,
    //         linksetProperty: linksetProperty
    //     };
    //
    //     backend.connections.subscribe(c => {
    //         let response = new ResponseOptions({ body: '{"result": "success"}' });
    //         c.mockRespond(new Response(response));
    //     });
    //
    //     spyOn(gridService, 'combineOperators');
    //     gridService.combineOperators(currentCrudLevel);
    //     expect(gridService.combineOperators).toHaveBeenCalledWith(currentCrudLevel);
    // }));

});

