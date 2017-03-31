import {async, inject, TestBed} from "@angular/core/testing";
import {MockBackend} from "@angular/http/testing";
import {HttpModule, RequestMethod, ResponseOptions, XHRBackend} from "@angular/http";
import {RouterTestingModule} from "@angular/router/testing";
import {TranslateModule} from "ng2-translate";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";

import {ComponentHelper} from "../shared/component-fixture";
import {DashboardComponent} from "./dashboard.component";
import {DashboardModule} from "./dashboard.module";
import {ConfigService} from "../config/config.service";
import {ConfigServiceMock} from "../shared/test/stub/config.service";
import {APP_PROVIDERS} from "../app.module";
import {DashboardBox} from "./dashboard-box/dashboard-box.model";

const ActivatedRouteStub = {
    paramMap: Observable.of({
        get: () => {
            return 1;
        }
    }),
    snapshot: {data: {dashboard: []}}
};

describe('Component: DashboardComponent', () => {
    let componentFixture: ComponentHelper<DashboardComponent> =
        new ComponentHelper<DashboardComponent>(null, null, null, null);
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
                {provide: ActivatedRoute, useValue: ActivatedRouteStub},
                {provide: ConfigService, useClass: ConfigServiceMock}
            ]
        });
        TestBed.compileComponents();
        componentFixture.fixture = TestBed.createComponent(DashboardComponent);
        componentFixture.instance = componentFixture.fixture.componentInstance;
        componentFixture.element = componentFixture.fixture.nativeElement;
        componentFixture.debugElement = componentFixture.fixture.debugElement;
    });

    beforeEach(inject([XHRBackend], (_mockBackend) => {
        mockBackend = _mockBackend;
    }));

    it('should have dashboard toolbar', async(() => {
        componentFixture.fixture.detectChanges();
        componentFixture.fixture.whenStable().then(() => {
            expect(componentFixture.element.querySelector('.dashboard-toolbar')).toBeDefined();
        });
    }));

    it('.ngOnInit()', async(() => {
        spyOn(componentFixture.instance.dragulaService, 'setOptions');
        spyOn(componentFixture.instance, 'getDashboardBoxes');
        spyOn(componentFixture.instance, 'sortDashboardBoxes');
        spyOn(componentFixture.instance.dragulaService, 'dropModel').and.returnValue(Observable.of(true));
        componentFixture.instance.ngOnInit();
        expect(componentFixture.instance.id).toEqual(1);
        expect(componentFixture.instance.getDashboardBoxes).toHaveBeenCalled();
        expect(componentFixture.instance.sortDashboardBoxes).toHaveBeenCalled();
        expect(componentFixture.instance.dragulaService.setOptions)
            .toHaveBeenCalledWith('dashboard-boxes', {direction: 'horizontal'});
    }));

    it('should retrieve dashboard boxes', async(() => {
        expect(componentFixture.instance.getDashboardBoxes() instanceof Array).toBeTruthy();
    }));

    it('.isDashboardBoxes()', async(() => {
        componentFixture.instance.dashboardBoxes = [];
        expect(componentFixture.instance.isDashboardBoxes()).toBeFalsy();
    }));

    it('should sort dashboard boxes', async(() => {
        let dashboardBoxes: DashboardBox[] =
            [<DashboardBox>{order: 2}, <DashboardBox>{order: 1}, <DashboardBox>{order: 3}];
        let sortedDashboardBoxes: DashboardBox[] =
            componentFixture.instance.sortDashboardBoxes(dashboardBoxes);
        expect(sortedDashboardBoxes[0].order).toEqual(1);
        expect(sortedDashboardBoxes[1].order).toEqual(2);
        expect(sortedDashboardBoxes[2].order).toEqual(3);
    }));

    it('.onDropModel()', async(() => {
        componentFixture.instance.dashboardBoxes =
            [
                <DashboardBox>{order: 1, _links: {self: {href: 'http://foo.bar'}}},
                <DashboardBox>{order: 2, _links: {self: {href: 'http://foo.bar'}}},
                <DashboardBox>{order: 4, _links: {self: {href: 'http://foo.bar'}}}, // the dashboard boxes
                <DashboardBox>{order: 3, _links: {self: {href: 'http://foo.bar'}}}  // which were reordered
            ];
        mockBackend.connections.subscribe(c => {
            expect(c.request.method === RequestMethod.Patch);
            let response = new ResponseOptions({body: {foo: 'bar'}});
            c.mockRespond(new Response(response));
        });
        componentFixture.instance.onDropModel();
        expect(componentFixture.instance.dashboardBoxes[2].order).toEqual(3);
        expect(componentFixture.instance.dashboardBoxes[3].order).toEqual(4);
    }));

    it('.onDropModel() - should get an error during updating the dashboard box', async(() => {
        componentFixture.instance.dashboardBoxes =
            [
                <DashboardBox>{order: 1, _links: {self: {href: 'http://foo.bar'}}},
                <DashboardBox>{order: 2, _links: {self: {href: 'http://foo.bar'}}},
                <DashboardBox>{order: 4, _links: {self: {href: 'http://foo.bar'}}}, // the dashboard boxes
                <DashboardBox>{order: 3, _links: {self: {href: 'http://foo.bar'}}}  // which were reordered
            ];
        mockBackend.connections.subscribe(c => {
            expect(c.request.method === RequestMethod.Patch);
            c.mockError(new Error('error'));
        });
        spyOn(componentFixture.instance.notification, 'createNotification');
        componentFixture.instance.onDropModel();
        expect(componentFixture.instance.notification.createNotification)
            .toHaveBeenCalledWith('error', 'ERROR', 'ERROR_UPDATE');
    }));
});
