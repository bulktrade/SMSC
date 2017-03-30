import {async, inject, TestBed} from "@angular/core/testing";
import {MockBackend} from "@angular/http/testing";
import {HttpModule, XHRBackend} from "@angular/http";
import {RouterTestingModule} from "@angular/router/testing";
import {TranslateModule} from "ng2-translate";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import {ComponentHelper} from "../../shared/component-fixture";
import {DashboardSettingsComponent} from "./dashboard-settings.component";
import {DashboardModule} from "../dashboard.module";
import {APP_PROVIDERS} from "../../app.module";
import {ConfigService} from "../../config/config.service";
import {ConfigServiceMock} from "../../shared/test/stub/config.service";
import {Dashboard} from "../dashboard.model";
import {DashboardBoxType} from "../dashboard-box-type/dashboard-box-type.model";

describe('Component: DashboardSettingsComponent', () => {
    let componentFixture: ComponentHelper<DashboardSettingsComponent> =
        new ComponentHelper<DashboardSettingsComponent>(null, null, null, null);
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
        componentFixture.fixture = TestBed.createComponent(DashboardSettingsComponent);
        componentFixture.instance = componentFixture.fixture.componentInstance;
        componentFixture.element = componentFixture.fixture.nativeElement;
        componentFixture.debugElement = componentFixture.fixture.debugElement;

        componentFixture.instance.route.snapshot.paramMap.get = () => '1';
        componentFixture.instance.route.snapshot.data = {
            dashboards: {
                dashboards: [<Dashboard>{name: 'default'}, <Dashboard>{}],
                dashboardBoxTypes: [<DashboardBoxType>{}, <DashboardBoxType>{}]
            }
        };
    });

    beforeEach(inject([XHRBackend], (_mockBackend) => {
        mockBackend = _mockBackend;
    }));

    it('should have the dashboard toolbar', async(() => {
        componentFixture.fixture.detectChanges();
        componentFixture.fixture.whenStable().then(() => {
            expect(componentFixture.element.querySelector('.dashboard-toolbar')).toBeDefined();
        });
    }));

    it('should retrieve dashboards', async(() => {
        expect(componentFixture.instance.getDashboards().length).toEqual(2);
    }));

    it('should retrieve dashboard box types', async(() => {
        expect(componentFixture.instance.getDashboardBoxTypes().length).toEqual(2);
    }));

    it('.isDashboards()', async(() => {
        componentFixture.instance.dashboards = [];
        expect(componentFixture.instance.isDashboards()).toBeFalsy();
    }));

    it('.isDashboardBoxTypes()', async(() => {
        componentFixture.instance.dashboardBoxTypes = [];
        expect(componentFixture.instance.isDashboardBoxTypes()).toBeFalsy();
    }));

    it('.ngOnInit()', async(() => {
        componentFixture.instance.ngOnInit();
        expect(componentFixture.instance.dashboards.length).toEqual(1);
        expect(componentFixture.instance.dashboards[0].name).not.toEqual('default');
        expect(componentFixture.instance.dashboardBoxTypes.length).toEqual(2);
    }));

    it('should remove the default dashboard', async(() => {
        let dashboards: Dashboard[] = [<Dashboard>{name: 'default'}, <Dashboard>{name: 'foo'}];
        componentFixture.instance.removeDefaultDashboard(dashboards);
        expect(dashboards.length).toEqual(1);
        expect(dashboards[0].name).not.toEqual('default');
    }));
});
