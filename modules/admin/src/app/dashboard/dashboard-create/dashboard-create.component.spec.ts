import {async, inject, TestBed} from "@angular/core/testing";
import {MockBackend} from "@angular/http/testing";
import {HttpModule, RequestMethod, ResponseOptions, XHRBackend} from "@angular/http";
import {RouterTestingModule} from "@angular/router/testing";
import {TranslateModule} from "ng2-translate";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import {ComponentHelper} from "../../shared/component-fixture";
import {DashboardCreateComponent} from "./dashboard-create.component";
import {DashboardModule} from "../dashboard.module";
import {APP_PROVIDERS} from "../../app.module";
import {ConfigService} from "../../config/config.service";
import {ConfigServiceMock} from "../../shared/test/stub/config.service";
import {Observable} from "rxjs";

describe('Component: DashboardCreateComponent', () => {
    let componentFixture: ComponentHelper<DashboardCreateComponent> =
        new ComponentHelper<DashboardCreateComponent>(null, null, null, null);
    let mockBackend;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                HttpModule,
                DashboardModule,
                TranslateModule.forRoot(),
                BrowserAnimationsModule
            ],
            providers: [
                APP_PROVIDERS,
                {provide: XHRBackend, useClass: MockBackend},
                {provide: ConfigService, useClass: ConfigServiceMock}
            ]
        });
        TestBed.compileComponents();
        componentFixture.fixture = TestBed.createComponent(DashboardCreateComponent);
        componentFixture.instance = componentFixture.fixture.componentInstance;
        componentFixture.element = componentFixture.fixture.nativeElement;
        componentFixture.debugElement = componentFixture.fixture.debugElement;
    });

    beforeEach(inject([XHRBackend], (_mockBackend) => {
        mockBackend = _mockBackend;
    }));

    it('should have dashboard toolbar and input fields', async(() => {
        componentFixture.instance.model = <any>{name: '', icon: ''};
        componentFixture.fixture.detectChanges();
        componentFixture.fixture.whenStable().then(() => {
            expect(componentFixture.element.querySelector('.dashboard-toolbar')).toBeDefined();
            // input fields
            expect(componentFixture.element.querySelector('#name')).toBeTruthy();
            expect(componentFixture.element.querySelector('#icon')).toBeTruthy();
        });
    }));

    it('.toggleLoading()', async(() => {
        componentFixture.instance.isLoading = false;
        componentFixture.instance.toggleLoading();
        expect(componentFixture.instance.isLoading).toBeTruthy();
    }));

    it('.onSubmit()', async(() => {
        spyOn(componentFixture.instance, 'toggleLoading');
        spyOn(componentFixture.instance.location, 'back');
        spyOn(componentFixture.instance.notification, 'createNotification');
        spyOn(componentFixture.instance.userService, 'getLoggedUser').and
            .returnValue(Observable.of({_links: {self: {href: 'href'}}}));
        mockBackend.connections.subscribe(c => {
            expect(c.request.method === RequestMethod.Post);
            let response = new ResponseOptions({body: {foo: 'bar'}});
            c.mockRespond(new Response(response));
        });
        componentFixture.instance.onSubmit(<any>{});
        expect(componentFixture.instance.toggleLoading['calls'].count()).toEqual(2);
        expect(componentFixture.instance.location.back).toHaveBeenCalled();
        expect(componentFixture.instance.notification.createNotification)
            .toHaveBeenCalledWith('success', 'SUCCESS', 'dashboard.successCreateDashboard');
    }));

    it('.onSubmit() - should get an error during creating the dashboard', async(() => {
        spyOn(componentFixture.instance, 'toggleLoading');
        spyOn(componentFixture.instance.controlErrorService, 'formControlErrors');
        spyOn(componentFixture.instance.userService, 'getLoggedUser').and
            .returnValue(Observable.of({_links: {self: {href: 'href'}}}));
        mockBackend.connections.subscribe(c => {
            c.mockError(new Response(new ResponseOptions({body: {}})));
        });
        componentFixture.instance.onSubmit(<any>{});
        expect(componentFixture.instance.toggleLoading['calls'].count()).toEqual(2);
        expect(componentFixture.instance.controlErrorService.formControlErrors).toHaveBeenCalled()
    }));

    it('.onSubmit() - should get an error during updating the logged user', async(() => {
        spyOn(componentFixture.instance, 'toggleLoading');
        spyOn(componentFixture.instance.notification, 'createNotification');
        spyOn(componentFixture.instance.userService, 'getLoggedUser').and
            .returnValue(Observable.create(obs => obs.error(false)));
        mockBackend.connections.subscribe(c => {
            c.mockError(new Error('error'));
        });
        componentFixture.instance.onSubmit(<any>{});
        expect(componentFixture.instance.toggleLoading['calls'].count()).toEqual(2);
        expect(componentFixture.instance.notification.createNotification)
            .toHaveBeenCalledWith('error', 'ERROR', 'user.notFound');
    }));
});
