import {inject, TestBed} from "@angular/core/testing";
import {MockBackend} from "@angular/http/testing";
import {Http, HttpModule, XHRBackend} from "@angular/http";
import {DashboardService} from "./dashboard.service";
import {ConfigService} from "../config/config.service";
import {ConfigServiceMock} from "../shared/test/stub/config.service";
import {CrudRepositoryService} from "../shared/crud-repository.spec";
import {UserService} from "../users/user.service";
import {Observable} from "rxjs";
import {Dashboard} from "./dashboard.model";

describe('Service: DashboardService', () => {
    let mockBackend, service: DashboardService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [
                DashboardService,
                UserService,
                {
                    provide: CrudRepositoryService,
                    useFactory: (http: Http, configService: ConfigService) => {
                        return new CrudRepositoryService(http, configService)
                    },
                    deps: [Http, ConfigService]
                },
                {provide: XHRBackend, useClass: MockBackend},
                {provide: ConfigService, useClass: ConfigServiceMock}
            ]
        })
    });

    beforeEach(inject([DashboardService, XHRBackend], (_service, _mockBackend) => {
        service = _service;
        mockBackend = _mockBackend;
    }));

    it('.createDefaultDashboard() - should create a new default dashboard', () => {
        spyOn(service.userService, 'getLoggedUser').and.returnValue(Observable.of({_links: {self: {href: 'href'}}}));
        spyOn(service, 'createResource').and.returnValue(Observable.of(<Dashboard>{name: 'name', icon: 'icon'}));
        service.createDefaultDashboard()
            .subscribe((res) => expect(res).toEqual(jasmine.objectContaining({name: 'name', icon: 'icon'})));
    });

    it('.createDefaultDashboard() - should get an error during getting the logged user', () => {
        let error: Error = new Error('the user not found');
        spyOn(service.userService, 'getLoggedUser').and
            .returnValue(Observable.create(obs => obs.error(error)));
        service.createDefaultDashboard().subscribe(null,
            (e) => expect(e.message).toEqual(error.message)
        );
    });

    it('.createDefaultDashboard() - should get an error during creating the default dashboard', () => {
        let error: Error = new Error('the dashboards was not created');
        spyOn(service, 'createResource').and.returnValue(Observable.create(obs => obs.error(error)));
        spyOn(service.userService, 'getLoggedUser').and
            .returnValue(Observable.of({_links: {self: {href: 'href'}}}));
        service.createDefaultDashboard().subscribe(null,
            (e) => expect(e.message).toEqual(error.message)
        );
    });

    it('.getDashboards() - should retrieve all dashboard boxes', () => {
        let response = {
            json: () => {
                return {
                    _embedded: {
                        dashboards: [
                            {
                                name: 'dashboard',
                                icon: 'fa-rocket'
                            }
                        ]
                    }
                }
            }
        };
        spyOn(service.userService, 'getLoggedUser').and
            .returnValue(Observable.of({_links: {dashboards: {href: 'href'}}}));
        spyOn(service.http, 'request').and.returnValue(Observable.of(response));
        service.getDashboards().subscribe(
            (res) => expect(res).toEqual(jasmine.objectContaining(response.json()['_embedded']['dashboards']))
        );
    });

    it('.getDashboards() - should get an error during getting the logged user', () => {
        let error: Error = new Error('the user not found');
        spyOn(service.userService, 'getLoggedUser').and.returnValue(Observable.create(obs => obs.error(error)));
        service.getDashboards().subscribe(null, (e) => expect(e.message).toEqual(error.message));
    });

    it('.getDashboards() - should get an error during retrieving dashboards', () => {
        let error: Error = new Error('the dashboards was not found');
        spyOn(service.userService, 'getLoggedUser').and
            .returnValue(Observable.of({_links: {dashboards: {href: 'href'}}}));
        spyOn(service.http, 'request').and.returnValue(Observable.create(obs => obs.error(error)));
        service.getDashboards().subscribe(null, (e) => expect(e.message).toEqual(error.message));
    });
});
