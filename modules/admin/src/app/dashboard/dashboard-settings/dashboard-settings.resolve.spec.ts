import {inject, TestBed} from "@angular/core/testing";
import {Observable} from "rxjs";
import {HttpModule, XHRBackend} from "@angular/http";

import {DashboardSettingsResolve} from "./dashboard-settings.resolve";
import {DashboardService} from "../dashboard.service";
import {UserService} from "../../users/user.service";
import {DashboardBoxService} from "../dashboard-box/dashboard-box.service";
import {DashboardBoxTypeService} from "../dashboard-box-type/dashboard-box-type.service";
import {MockBackend} from "@angular/http/testing";
import {ConfigService} from "../../config/config.service";
import {ConfigServiceMock} from "../../shared/test/stub/config.service";
import {Dashboard} from "../dashboard.model";


describe('Resolve: DashboardSettingsResolve', () => {
    let resolve: DashboardSettingsResolve, mockBackend;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [
                DashboardSettingsResolve,
                DashboardService,
                UserService,
                DashboardBoxService,
                DashboardBoxTypeService,
                {provide: XHRBackend, useClass: MockBackend},
                {provide: ConfigService, useClass: ConfigServiceMock}
            ]
        });
    });

    beforeEach(inject([DashboardSettingsResolve, XHRBackend], (_resolve, _mockBackend) => {
        resolve = _resolve;
        mockBackend = _mockBackend;
    }));

    it('should retrieve `dashboards` and `dashboard box types`', () => {
        let dashboards: Dashboard[] = [<any>{id: 1}, <any>{id: 2}];
        spyOn(resolve.dashboardService, 'getDashboards').and
            .returnValue(Observable.of(dashboards));
        spyOn(resolve.dashboardBoxTypeService, 'getResources').and
            .returnValue(Observable.of({_embedded: {'dashboard-box-types': []}}));
        spyOn(resolve.dashboardService, 'createDefaultDashboard').and.returnValue(Observable.of({}));
        resolve.resolve(<any>{params: {id: 1}}, <any>{}).subscribe();
    });

    it('should retrieve `dashboards` and `dashboard box types` and create the default dashboard', () => {
        let dashboards: Dashboard[] = []; // the user don't have dashboards
        spyOn(resolve.dashboardService, 'getDashboards').and
            .returnValue(Observable.of(dashboards));
        spyOn(resolve.dashboardBoxTypeService, 'getResources').and
            .returnValue(Observable.of({_embedded: {'dashboard-box-types': [{}]}}));
        spyOn(resolve.dashboardService, 'createDefaultDashboard').and.returnValue(Observable.of({}));
        resolve.resolve(<any>{params: {id: 1}}, <any>{}).subscribe();
    });

    it('should get an error while creating the default dashboard', () => {
        let dashboards: Dashboard[] = [];
        spyOn(resolve.dashboardService, 'getDashboards').and
            .returnValue(Observable.of(dashboards));
        spyOn(resolve.dashboardBoxTypeService, 'getResources').and
            .returnValue(Observable.of({_embedded: {'dashboard-box-types': [{}]}}));
        spyOn(resolve.dashboardService, 'createDefaultDashboard').and.returnValue(Observable.create(obs => obs.error('error')));
        resolve.resolve(<any>{params: {id: 1}}, <any>{}).subscribe(null, err => expect(err).toEqual('error'));
    });

    it('should get an error while retrieving dashboard box types', () => {
        let dashboards: Dashboard[] = [];
        spyOn(resolve.dashboardService, 'getDashboards').and
            .returnValue(Observable.of(dashboards));
        spyOn(resolve.dashboardBoxTypeService, 'getResources').and
            .returnValue(Observable.create(obs => obs.error('error')));
        resolve.resolve(<any>{params: {id: 1}}, <any>{}).subscribe(null, err => expect(err).toEqual('error'));
    });

    it('should get an error while retrieving dashboards', () => {
        spyOn(resolve.dashboardService, 'getDashboards').and
            .returnValue(Observable.create(obs => obs.error('error')));
        resolve.resolve(<any>{params: {id: 1}}, <any>{}).subscribe(null, err => expect(err).toEqual('error'));
    });
});
