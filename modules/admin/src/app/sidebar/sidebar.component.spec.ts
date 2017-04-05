import {async, inject, TestBed} from "@angular/core/testing";
import {SimpleNotificationsModule} from "angular2-notifications";
import {MockBackend} from "@angular/http/testing";
import {TranslateModule} from "ng2-translate";
import {Response, ResponseOptions, XHRBackend} from "@angular/http";
import {RouterTestingModule} from "@angular/router/testing";

import {APP_PROVIDERS} from "../app.module";
import {ComponentHelper} from "../shared/component-fixture";
import {SidebarComponent} from "./sidebar.component";
import {DashboardService} from "../dashboard/dashboard.service";
import {ConfigService} from "../config/config.service";
import {ConfigServiceMock} from "../shared/test/stub/config.service";
import {SidebarItemComponent} from "./sidebar-item.component";

describe('Component: SidebarComponent', () => {
    let componentFixture: ComponentHelper<SidebarComponent> =
        new ComponentHelper<SidebarComponent>(null, null, null, null);
    let mockBackend;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TranslateModule.forRoot(), SimpleNotificationsModule, RouterTestingModule],
            providers: [
                APP_PROVIDERS,
                DashboardService,
                {provide: XHRBackend, useClass: MockBackend},
                {provide: ConfigService, useClass: ConfigServiceMock}
            ],
            declarations: [SidebarComponent, SidebarItemComponent]
        });

        componentFixture.fixture = TestBed.createComponent(SidebarComponent);
        componentFixture.instance = componentFixture.fixture.componentInstance;
        componentFixture.element = componentFixture.fixture.nativeElement;
        componentFixture.debugElement = componentFixture.fixture.debugElement;
    });

    beforeEach(inject([XHRBackend], (_mockBackend) => {
        mockBackend = _mockBackend;
    }));

    it('should update the dashboard', async(() => {
        mockBackend.connections.subscribe(connection => {
            let response = new ResponseOptions({body: {'_embedded': {dashboards: []}}});
            connection.mockRespond(new Response(response));
        });
        componentFixture.instance.updateDashboards();
    }));

    it('.ngOnInit()', async(() => {
        spyOn(componentFixture.instance.sidebarService, 'getSidebarItems');
        spyOn(componentFixture.instance, 'updateDashboards');
        spyOn(componentFixture.instance.dashboardService.onResourceChange, 'subscribe').and
            .callFake((fn: Function) => fn());
        componentFixture.instance.ngOnInit();
        expect(componentFixture.instance.sidebarService.getSidebarItems).toHaveBeenCalled();
        expect(componentFixture.instance.updateDashboards['calls'].count()).toEqual(2);
    }));
});
