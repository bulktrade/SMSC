import {inject, TestBed} from "@angular/core/testing";
import {HttpModule, RequestMethod, Response, ResponseOptions, XHRBackend} from "@angular/http";
import {MockBackend} from "@angular/http/testing";

import {MCCUpdateResolve} from "./mcc-update.resolve";
import {MCCService} from "../mcc.service";
import {ConfigService} from "../../config/config.service";
import {ConfigServiceMock} from "../../shared/test/stub/config.service";

describe('Resolve: MCCUpdateResolve', () => {
    let resolve: MCCUpdateResolve, mockBackend;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [
                MCCService,
                MCCUpdateResolve,
                {provide: XHRBackend, useClass: MockBackend},
                {provide: ConfigService, useClass: ConfigServiceMock}
            ]
        });
    });

    beforeEach(inject([MCCUpdateResolve, XHRBackend], (_resolve, _mockBackend) => {
        resolve = _resolve;
        mockBackend = _mockBackend;
    }));

    it('should retrieve the mcc', () => {
        mockBackend.connections.subscribe(c => {
            expect(c.request.method === RequestMethod.Patch);
            let response = new ResponseOptions({body: {foo: 'bar'}});
            c.mockRespond(new Response(response));
        });
        resolve.resolve(<any>{params: {id: 1}}, <any>{}).subscribe(res => expect(res).toBeTruthy());
    });
});
