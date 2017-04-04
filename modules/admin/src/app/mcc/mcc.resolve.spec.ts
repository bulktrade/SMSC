import {inject, TestBed} from "@angular/core/testing";
import {HttpModule, Response, ResponseOptions, XHRBackend} from "@angular/http";
import {RouterTestingModule} from "@angular/router/testing";
import {MockBackend} from "@angular/http/testing";

import {MCCResolve} from "./mcc.resolve";
import {MCCService} from "./mcc.service";
import {ConfigService} from "../config/config.service";
import {ConfigServiceMock} from "../shared/test/stub/config.service";

describe('Resolve: MCCResolve', () => {
    let mccResolve: MCCResolve, mockBackend;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule, RouterTestingModule],
            providers: [
                MCCService,
                MCCResolve,
                {provide: ConfigService, useClass: ConfigServiceMock},
                {provide: XHRBackend, useClass: MockBackend},
            ]
        });
    });

    beforeEach(inject([MCCResolve, XHRBackend], (_customersEditResolve, _mockBackend) => {
        mccResolve = _customersEditResolve;
        mockBackend = _mockBackend;
    }));

    it('.resolve()', () => {
        mockBackend.connections.subscribe(connection => {
            let response = new ResponseOptions({body: {foo: 'bar'}});
            connection.mockRespond(new Response(response));
        });
        mccResolve.resolve(<any>{params: {customerId: 1}}, <any>{})
            .subscribe(
                (response) => {
                    expect(response).toBeDefined();
                }
            );
    });
});
