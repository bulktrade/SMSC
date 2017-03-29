import {async, inject, TestBed} from "@angular/core/testing";
import {MockBackend} from "@angular/http/testing";
import {HttpModule, RequestMethod, Response, ResponseOptions, XHRBackend} from "@angular/http";
import {RouterTestingModule} from "@angular/router/testing";
import {TranslateModule} from "ng2-translate";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import {ComponentHelper} from "../../shared/component-fixture";
import {DashboardModule} from "../dashboard.module";
import {APP_PROVIDERS} from "../../app.module";
import {ConfigService} from "../../config/config.service";
import {ConfigServiceMock} from "../../shared/test/stub/config.service";
import {DashboardUpdateComponent} from "./dashboard-update.component";

describe('Component: DashboardUpdateComponent', () => {
    let componentFixture: ComponentHelper<DashboardUpdateComponent> =
        new ComponentHelper<DashboardUpdateComponent>(null, null, null, null);
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
        componentFixture.fixture = TestBed.createComponent(DashboardUpdateComponent);
        componentFixture.instance = componentFixture.fixture.componentInstance;
        componentFixture.element = componentFixture.fixture.nativeElement;
        componentFixture.debugElement = componentFixture.fixture.debugElement;
    });

    beforeEach(inject([XHRBackend], (_mockBackend) => {
        mockBackend = _mockBackend;
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
        componentFixture.instance.model = <any>{_links: {self: {href: 'href'}}};
        mockBackend.connections.subscribe(c => {
            expect(c.request.method === RequestMethod.Post);
            let response = new ResponseOptions({body: {foo: 'bar'}});
            c.mockRespond(new Response(response));
        });
        componentFixture.instance.onSubmit(<any>{});
        expect(componentFixture.instance.toggleLoading['calls'].count()).toEqual(2);
        expect(componentFixture.instance.location.back).toHaveBeenCalled();
        expect(componentFixture.instance.notification.createNotification)
            .toHaveBeenCalledWith('success', 'SUCCESS', 'dashboard.successUpdateDashboard');
    }));

    it('.onSubmit() - should get an error during creating the dashboard', async(() => {
        spyOn(componentFixture.instance, 'toggleLoading');
        spyOn(componentFixture.instance.controlErrorService, 'formControlErrors');
        componentFixture.instance.model = <any>{_links: {self: {href: 'href'}}};
        mockBackend.connections.subscribe(c => {
            let response = new ResponseOptions({body: {foo: 'bar'}});
            c.mockError(new Response(response));
        });
        componentFixture.instance.onSubmit(<any>{});
        expect(componentFixture.instance.toggleLoading['calls'].count()).toEqual(2);
        expect(componentFixture.instance.controlErrorService.formControlErrors).toHaveBeenCalled()
    }));

    it('should retrieve the dashboard', async(() => {
        componentFixture.instance.route.snapshot.data['update'] = [{}, {}];
        expect(componentFixture.instance.getDashboard()['length']).toEqual(2);
    }));

    it('.ngOnInit()', async(() => {
        componentFixture.instance.route.snapshot.paramMap.get = () => '54';
        componentFixture.instance.ngOnInit();
        expect(componentFixture.instance.id).toEqual(54);
    }));
});
