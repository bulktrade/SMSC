import {inject, TestBed} from "@angular/core/testing";
import {HttpModule, XHRBackend} from "@angular/http";
import {CustomersEditResolve} from "./customers-update.resolve";
import {CustomersService} from "../customer.service";
import {MockBackend} from "@angular/http/testing";
import {DashboardUpdateResolve} from "./dashboard-update.resolve";
import {DashboardResolve} from "./dashboard.resolve";
import {ConfigService} from "../config/config.service";
import {ConfigServiceMock} from "../shared/test/stub/config.service";
import {DashboardService} from "./dashboard.service";
import {UserService} from "../users/user.service";
import {DashboardBoxService} from "./dashboard-box/dashboard-box.service";
import {DashboardBoxTypeService} from "./dashboard-box-type/dashboard-box-type.service";
import {Observable} from "rxjs";
import {DashboardBox} from "./dashboard-box/dashboard-box.model";
import {DashboardBoxType} from "./dashboard-box-type/dashboard-box-type.model";

describe('Resolve: DashboardResolve', () => {
    let resolve: DashboardResolve, mockBackend;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [
                DashboardResolve,
                DashboardService,
                UserService,
                DashboardBoxService,
                DashboardBoxTypeService,
                {provide: XHRBackend, useClass: MockBackend},
                {provide: ConfigService, useClass: ConfigServiceMock}
            ]
        });
    });

    beforeEach(inject([DashboardResolve, XHRBackend], (_resolve, _mockBackend) => {
        resolve = _resolve;
        mockBackend = _mockBackend;
    }));

    it('should retrieve dashboard boxes', () => {
        spyOn(resolve.dashboardService, 'getResourceById').and
            .returnValue(Observable.of({_links: {dashboardBoxes: {href: 'href'}}}));
        spyOn(resolve.dashboardBoxService, 'getDashboardBoxes').and
            .returnValue(Observable.of([{id: 1}, {id: 2}]));
        spyOn(resolve, 'getDashboardBoxTypes').and.returnValue(Observable.of(true));
        resolve.resolve(<any>{params: {id: 1}}, <any>{}).subscribe(res => expect(res).toBeTruthy());
    });

    it('should get an error during retrieving dashboard', () => {
        spyOn(resolve.dashboardService, 'getResourceById').and
            .returnValue(Observable.create(obs => obs.error('error')));
        spyOn(resolve.dashboardBoxService, 'getDashboardBoxes').and
            .returnValue(Observable.of([{id: 1}, {id: 2}]));
        spyOn(resolve, 'getDashboardBoxTypes').and.returnValue(Observable.of(true));
        resolve.resolve(<any>{params: {id: 1}}, <any>{}).subscribe(null, err => {
            expect(err).toEqual('error');
        });
    });

    it('should get an error during retrieving dashboard boxes', () => {
        spyOn(resolve.dashboardService, 'getResourceById').and
            .returnValue(Observable.of({_links: {dashboardBoxes: {href: 'href'}}}));
        spyOn(resolve.dashboardBoxService, 'getDashboardBoxes').and
            .returnValue(Observable.create(obs => obs.error('error')));
        spyOn(resolve, 'getDashboardBoxTypes').and.returnValue(Observable.of(true));
        resolve.resolve(<any>{params: {id: 1}}, <any>{}).subscribe(null, err => {
            expect(err).toEqual('error');
        });
    });
    it('should get an error during retrieving dashboard box types', () => {
        spyOn(resolve.dashboardService, 'getResourceById').and
            .returnValue(Observable.of({_links: {dashboardBoxes: {href: 'href'}}}));
        spyOn(resolve.dashboardBoxService, 'getDashboardBoxes').and
            .returnValue(Observable.of([{id: 1}, {id: 2}]));
        spyOn(resolve, 'getDashboardBoxTypes').and.returnValue(Observable.create(obs => obs.error('error')));
        resolve.resolve(<any>{params: {id: 1}}, <any>{}).subscribe(null, err => {
            expect(err).toEqual('error');
        });
    });

    it('should retrieve dashboard box types', () => {
        let dashboardBoxes: DashboardBox[] = [<DashboardBox>{}, <DashboardBox>{}];
        spyOn(resolve.dashboardBoxTypeService, 'getDashboardBoxType').and
            .returnValue(Observable.of(<DashboardBoxType>{name: 'foo'}));
        resolve.getDashboardBoxTypes(dashboardBoxes).subscribe(() => {
            expect(dashboardBoxes[0].dashboardBoxType).toEqual(jasmine.objectContaining({name: 'foo'}));
            expect(dashboardBoxes[1].dashboardBoxType).toEqual(jasmine.objectContaining({name: 'foo'}));
        });
    });

    it('should get an error during retrieving dashboard box types', () => {
        let dashboardBoxes: DashboardBox[] = [<DashboardBox>{}, <DashboardBox>{}];
        spyOn(resolve.dashboardBoxTypeService, 'getDashboardBoxType').and
            .returnValue(Observable.create(obs => obs.error('error')));
        resolve.getDashboardBoxTypes(dashboardBoxes).subscribe(null, (err) => {
            expect(err).toEqual('error');
        });
    });
});
