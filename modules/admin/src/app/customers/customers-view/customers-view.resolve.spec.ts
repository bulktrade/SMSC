import {TestBed, inject} from "@angular/core/testing";
import {HttpModule, XHRBackend, ResponseOptions, Response} from "@angular/http";
import {RouterTestingModule} from "@angular/router/testing";
import {CustomersService} from "../customer.service";
import {MockBackend} from "@angular/http/testing";
import {ConfigService} from "../../config/config.service";
import {ConfigServiceMock} from "../../shared/test/stub/config.service";
import {CustomersViewResolve} from "./customers-view.resolve";

describe('Resolve: CustomersViewResolve', () => {
    let customersEditResolve: CustomersViewResolve, mockBackend;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule, RouterTestingModule],
            providers: [
                CustomersViewResolve,
                CustomersService,
                {provide: ConfigService, useClass: ConfigServiceMock},
                {provide: XHRBackend, useClass: MockBackend},
            ]
        });
    });

    beforeEach(inject([CustomersViewResolve, XHRBackend], (_customersEditResolve, _mockBackend) => {
        customersEditResolve = _customersEditResolve;
        mockBackend = _mockBackend;
    }));

    it('.resolve()', () => {
        mockBackend.connections.subscribe(connection => {
            let response = new ResponseOptions({body: {}});
            connection.mockRespond(new Response(response));
        });
        customersEditResolve.resolve(<any>{params: {customerId: 1}}, <any>{})
            .subscribe(response => {
                expect(response).toBeDefined();
            });
    });
});
