import {async, TestBed} from "@angular/core/testing";
import {SimpleNotificationsModule} from "angular2-notifications";
import {MockBackend} from "@angular/http/testing";
import {TranslateModule} from "ng2-translate";
import {XHRBackend} from "@angular/http";
import {RouterTestingModule} from "@angular/router/testing";

import {SidebarItemComponent} from "./sidebar-item.component";
import {ComponentHelper} from "../shared/component-fixture";
import {ConfigService} from "../config/config.service";
import {ConfigServiceMock} from "../shared/test/stub/config.service";
import {DashboardService} from "../dashboard/dashboard.service";
import {UserService} from "../users/user.service";
import {Observable} from "rxjs";
import {SidebarModel} from "./sidebar.model";

describe('Component: SidebarItemComponent', () => {
    let componentFixture: ComponentHelper<SidebarItemComponent> =
        new ComponentHelper<SidebarItemComponent>(null, null, null, null);

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TranslateModule.forRoot(), SimpleNotificationsModule, RouterTestingModule],
            providers: [
                DashboardService,
                UserService,
                {provide: XHRBackend, useClass: MockBackend},
                {provide: ConfigService, useClass: ConfigServiceMock}
            ],
            declarations: [SidebarItemComponent]
        });

        componentFixture.fixture = TestBed.createComponent(SidebarItemComponent);
        componentFixture.instance = componentFixture.fixture.componentInstance;
        componentFixture.element = componentFixture.fixture.nativeElement;
        componentFixture.debugElement = componentFixture.fixture.debugElement;
    });

    it('should have `<sidebar-item>`', async(() => {
        componentFixture.fixture.detectChanges();
        componentFixture.fixture.whenStable().then(() => {
            expect(componentFixture.element.querySelector('sidebar-item')).toBeDefined();
        });
    }));

    it('should navigate to the default dashboard', async(() => {
        let dashboard = {
            id: 1,
            name: 'default',
            icon: 'fa-desktop'
        };
        spyOn(componentFixture.instance.dashboardService, 'getDefaultDashboard').and.returnValue(Observable.of(dashboard));
        spyOn(componentFixture.instance.router, 'navigate');
        componentFixture.instance.navigate(<SidebarModel>{name: 'DASHBOARDS'});
        expect(componentFixture.instance.router.navigate).toHaveBeenCalledWith(['/dashboard', 1]);
    }));

    it('should navigate to the component by the path property', async(() => {
        spyOn(componentFixture.instance.router, 'navigateByUrl');
        componentFixture.instance.navigate(<SidebarModel>{name: 'CUSTOMERS', path: 'customers'});
        expect(componentFixture.instance.router.navigateByUrl).toHaveBeenCalledWith('customers');
    }));
});
