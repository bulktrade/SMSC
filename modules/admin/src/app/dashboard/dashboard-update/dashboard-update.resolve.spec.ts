import {inject, TestBed} from "@angular/core/testing";
import {HttpModule, Response, ResponseOptions, XHRBackend} from "@angular/http";
import {CustomersEditResolve} from "./customers-update.resolve";
import {CustomersService} from "../customer.service";
import {MockBackend} from "@angular/http/testing";
import {ConfigService} from "../../config/config.service";
import {ConfigServiceMock} from "../../shared/test/stub/config.service";
import {DashboardUpdateResolve} from "./dashboard-update.resolve";
import {DashboardService} from "../dashboard.service";
import {UserService} from "../../users/user.service";

describe('Resolve: DashboardUpdateResolve', () => {
    let resolve: DashboardUpdateResolve, mockBackend;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [
                UserService,
                DashboardService,
                DashboardUpdateResolve,
                {provide: XHRBackend, useClass: MockBackend},
                {provide: ConfigService, useClass: ConfigServiceMock}
            ]
        });
    });

    beforeEach(inject([DashboardUpdateResolve, XHRBackend], (_resolve, _mockBackend) => {
        resolve = _resolve;
        mockBackend = _mockBackend;
    }));

    it('should retrieve the dashboard', () => {
        mockBackend.connections.subscribe(connection => {
            let response = new ResponseOptions({body: {id: 40000}});
            connection.mockRespond(new Response(response));
        });
        resolve.resolve(<any>{params: {id: 1}}, <any>{})
            .subscribe(dashboard => expect(dashboard['id']).toEqual(40000));
    });
});
