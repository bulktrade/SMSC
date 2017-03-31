import {async, inject, TestBed} from "@angular/core/testing";
import {MockBackend} from "@angular/http/testing";
import {HttpModule, RequestMethod, ResponseOptions, XHRBackend} from "@angular/http";
import {RouterTestingModule} from "@angular/router/testing";
import {TranslateModule} from "ng2-translate";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import {ComponentHelper} from "../../../shared/component-fixture";
import {DashboardBoxCreateComponent} from "./dashboard-box-create.component";
import {DashboardModule} from "../../dashboard.module";
import {APP_PROVIDERS} from "../../../app.module";
import {ConfigService} from "../../../config/config.service";
import {ConfigServiceMock} from "../../../shared/test/stub/config.service";

describe('Component: DashboardBoxCreateComponent', () => {
    let componentFixture: ComponentHelper<DashboardBoxCreateComponent> =
        new ComponentHelper<DashboardBoxCreateComponent>(null, null, null, null);
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

        componentFixture.fixture = TestBed.createComponent(DashboardBoxCreateComponent);
        componentFixture.instance = componentFixture.fixture.componentInstance;
        componentFixture.element = componentFixture.fixture.nativeElement;
        componentFixture.debugElement = componentFixture.fixture.debugElement;

        componentFixture.instance.route.snapshot.paramMap.get = () => '40000';
    });

    beforeEach(inject([XHRBackend], (_mockBackend) => {
        mockBackend = _mockBackend;
    }));

    it('should have dashboard toolbar and input fields', async(() => {
        componentFixture.instance.model = <any>{name: '', icon: ''};
        componentFixture.fixture.detectChanges();
        componentFixture.fixture.whenStable().then(() => {
            expect(componentFixture.element.querySelector('#dashboard-box-form')).toBeDefined();
            // input fields
            expect(componentFixture.element.querySelector('#name')).toBeTruthy();
            expect(componentFixture.element.querySelector('#description')).toBeTruthy();
            expect(componentFixture.element.querySelector('#order')).toBeTruthy();
            expect(componentFixture.element.querySelector('#width')).toBeTruthy();
            expect(componentFixture.element.querySelector('#height')).toBeTruthy();
            expect(componentFixture.element.querySelector('#dashboard-box-type')).toBeTruthy();
        });
    }));

    it('.toggleLoading()', async(() => {
        componentFixture.instance.isLoading = false;
        componentFixture.instance.toggleLoading();
        expect(componentFixture.instance.isLoading).toBeTruthy();
    }));

    it('.ngOnInit()', async(() => {
        componentFixture.instance.ngOnInit();
        expect(componentFixture.instance.dashboardId).toEqual(40000);
    }));

    it('.onSubmit()', async(() => {
        spyOn(componentFixture.instance, 'toggleLoading');
        spyOn(componentFixture.instance.location, 'back');
        spyOn(componentFixture.instance.notification, 'createNotification');
        spyOn(componentFixture.instance.dashboardService, 'getSelfLinkedEntityById').and.callThrough();
        mockBackend.connections.subscribe(c => {
            expect(c.request.method === RequestMethod.Post);
            let response = new ResponseOptions({body: {foo: 'bar'}});
            c.mockRespond(new Response(response));
        });
        componentFixture.instance.onSubmit(<any>{});
        expect(componentFixture.instance.toggleLoading['calls'].count()).toEqual(2);
        expect(componentFixture.instance.location.back).toHaveBeenCalled();
        expect(componentFixture.instance.notification.createNotification)
            .toHaveBeenCalledWith('success', 'SUCCESS', 'dashboardBox.successCreateDashboardBox');
        expect(componentFixture.instance.dashboardService.getSelfLinkedEntityById).toHaveBeenCalled();
    }));

    it('.onSubmit() - should get an error during creating the dashboard', async(() => {
        spyOn(componentFixture.instance, 'toggleLoading');
        spyOn(componentFixture.instance.controlErrorService, 'formControlErrors');
        spyOn(componentFixture.instance.dashboardService, 'getSelfLinkedEntityById').and.callThrough();
        mockBackend.connections.subscribe(c => {
            c.mockError(new Response(new ResponseOptions({body: {}})));
        });
        componentFixture.instance.onSubmit(<any>{});
        expect(componentFixture.instance.toggleLoading['calls'].count()).toEqual(2);
        expect(componentFixture.instance.controlErrorService.formControlErrors).toHaveBeenCalled();
        expect(componentFixture.instance.dashboardService.getSelfLinkedEntityById).toHaveBeenCalled();
    }));
});
