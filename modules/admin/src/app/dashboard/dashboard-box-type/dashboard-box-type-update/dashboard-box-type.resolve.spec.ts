import {inject, TestBed} from "@angular/core/testing";
import {HttpModule, RequestMethod, ResponseOptions, XHRBackend, Response} from "@angular/http";
import {MockBackend} from "@angular/http/testing";

import {DashboardBoxTypeUpdateResolve} from "./dashboard-box-type-update.resolve";
import {ConfigService} from "../../../config/config.service";
import {ConfigServiceMock} from "../../../shared/test/stub/config.service";
import {DashboardBoxTypeService} from "../dashboard-box-type.service";

describe('Resolve: DashboardResolve', () => {
    let resolve: DashboardBoxTypeUpdateResolve, mockBackend;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [
                DashboardBoxTypeUpdateResolve,
                DashboardBoxTypeService,
                {provide: XHRBackend, useClass: MockBackend},
                {provide: ConfigService, useClass: ConfigServiceMock}
            ]
        });
    });

    beforeEach(inject([DashboardBoxTypeUpdateResolve, XHRBackend], (_resolve, _mockBackend) => {
        resolve = _resolve;
        mockBackend = _mockBackend;
    }));

    it('should retrieve the dashboard box type', () => {
        mockBackend.connections.subscribe(c => {
            expect(c.request.method === RequestMethod.Patch);
            let response = new ResponseOptions({body: {foo: 'bar'}});
            c.mockRespond(new Response(response));
        });
        resolve.resolve(<any>{params: {id: 1}}, <any>{}).subscribe(res => expect(res).toBeTruthy());
    });
});
