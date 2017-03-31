import {async, inject, TestBed} from "@angular/core/testing";
import {TranslateModule} from "ng2-translate";
import {RouterTestingModule} from "@angular/router/testing";
import {MockBackend} from "@angular/http/testing";
import {Response, ResponseOptions, XHRBackend} from "@angular/http";

import {ComponentHelper} from "../../../shared/component-fixture";
import {DashboardBoxDeleteComponent} from "./dashboard-box-delete.component";
import {DashboardModule} from "../../dashboard.module";
import {APP_PROVIDERS} from "../../../app.module";
import {ConfigService} from "../../../config/config.service";
import {ConfigServiceMock} from "../../../shared/test/stub/config.service";

describe('Component: DashboardBoxDeleteComponent', () => {
    let componentFixture: ComponentHelper<DashboardBoxDeleteComponent> =
        new ComponentHelper<DashboardBoxDeleteComponent>(null, null, null, null);
    let mockBackend;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [DashboardModule, RouterTestingModule, TranslateModule.forRoot()],
            providers: [
                APP_PROVIDERS,
                {provide: XHRBackend, useClass: MockBackend},
                {provide: ConfigService, useClass: ConfigServiceMock},
            ]
        });

        componentFixture.fixture = TestBed.createComponent(DashboardBoxDeleteComponent);
        componentFixture.instance = componentFixture.fixture.componentInstance;
        componentFixture.element = componentFixture.fixture.nativeElement;
        componentFixture.debugElement = componentFixture.fixture.debugElement;

        componentFixture.instance.route.snapshot.paramMap.get = () => '40000';
    });

    beforeEach(inject([XHRBackend], (_mockBackend) => {
        mockBackend = _mockBackend;
    }));

    it('should have the cancel button and confirm button', async(() => {
        componentFixture.fixture.detectChanges();
        componentFixture.fixture.whenStable().then(() => {
            expect(componentFixture.element.querySelector('#cancel-button').innerText).toEqual('CANCEL');
            expect(componentFixture.element.querySelector('#ok-button').innerText).toEqual('OK');
        });
    }));

    it('should get a success message about delete dashboard box', async(() => {
        mockBackend.connections.subscribe(connection => {
            let response = new ResponseOptions({body: {id: 1}});
            connection.mockRespond(new Response(response));
        });
        spyOn(componentFixture.instance.notifications, 'createNotification');
        spyOn(componentFixture.instance.location, 'back');

        componentFixture.instance.deleteResource();

        expect(componentFixture.instance.notifications.createNotification)
            .toHaveBeenCalledWith('success', 'SUCCESS', 'dashboardBox.successDeleteDashboardBox');
        expect(componentFixture.instance.location.back).toHaveBeenCalled();
    }));

    it('should get an error if dashboard box was not deleted', async(() => {
        mockBackend.connections.subscribe(connection => {
            let response = new ResponseOptions({status: 500});
            connection.mockError(new Response(response));
        });
        spyOn(componentFixture.instance.notifications, 'createNotification');
        spyOn(console, 'error');

        componentFixture.instance.deleteResource();

        expect(componentFixture.instance.notifications.createNotification)
            .toHaveBeenCalledWith('error', 'ERROR', 'dashboardBox.errorDeleteDashboardBox');
    }));

    it('.onBack()', async(() => {
        spyOn(componentFixture.instance.location, 'back');
        componentFixture.instance.onBack();
        expect(componentFixture.instance.location.back).toHaveBeenCalled();
    }));

    it('.ngOnInit()', async(() => {
        componentFixture.instance.ngOnInit();
        expect(componentFixture.instance.id).toEqual(40000);
    }));
});
