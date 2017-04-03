import {async, inject, TestBed} from "@angular/core/testing";
import {MockBackend} from "@angular/http/testing";
import {HttpModule, XHRBackend} from "@angular/http";
import {RouterTestingModule} from "@angular/router/testing";
import {TranslateModule} from "ng2-translate";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {Observable} from "rxjs";

import {DashboardBoxComponent} from "./dashboard-box.component";
import {ComponentHelper} from "../../shared/component-fixture";
import {DashboardModule} from "../dashboard.module";
import {APP_PROVIDERS} from "../../app.module";
import {ConfigService} from "../../config/config.service";
import {ConfigServiceMock} from "../../shared/test/stub/config.service";
import {DashboardBox} from "./dashboard-box.model";
import {DashboardBoxType} from "../dashboard-box-type/dashboard-box-type.model";

describe('Component: DashboardBoxComponent', () => {
    let componentFixture: ComponentHelper<DashboardBoxComponent> =
        new ComponentHelper<DashboardBoxComponent>(null, null, null, null);
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
        componentFixture.fixture = TestBed.createComponent(DashboardBoxComponent);
        componentFixture.instance = componentFixture.fixture.componentInstance;
        componentFixture.element = componentFixture.fixture.nativeElement;
        componentFixture.debugElement = componentFixture.fixture.debugElement;

        componentFixture.instance.route.snapshot.paramMap.get = () => '40000';
        componentFixture.instance.dashboardBox = <DashboardBox>{
            name: 'foo',
            description: 'bar',
            width: <any>'WIDTH_25',
            height: <any>'HEIGHT_25',
            order: 3,
            dashboardBoxType: <DashboardBoxType>{
                name: 'foo',
                type: <any>'CHART',
                kind: <any>'PROFIT_STATUS'
            }
        };
    });

    beforeEach(inject([XHRBackend], (_mockBackend) => {
        mockBackend = _mockBackend;
    }));

    it('dashboard box should have the toolbar with buttons', async(() => {
        componentFixture.fixture.detectChanges();
        componentFixture.fixture.whenStable().then(() => {
            expect(componentFixture.element.querySelector('.btn-conf-box')).toBeDefined();
            expect(componentFixture.element.querySelector('.btn-fullscreen-box')).toBeDefined();
            expect(componentFixture.element.querySelector('.cog-width')).toBeDefined();
            expect(componentFixture.element.querySelector('.cog-height')).toBeDefined();
        });
    }));

    it('.ngOnInit()', async(() => {
        spyOn(componentFixture.instance, 'widthChange');
        spyOn(componentFixture.instance, 'heightChange');
        componentFixture.instance.ngOnInit();
        expect(componentFixture.instance.dashboardId).toEqual(40000);
        expect(componentFixture.instance.dashboardBoxType)
            .toEqual(jasmine.objectContaining({name: 'foo', type: <any>'CHART', kind: <any>'PROFIT_STATUS'}));
        expect(componentFixture.instance.dashboardBox.dashboardBoxType).toBeUndefined();
        expect(componentFixture.instance.widthChange).toHaveBeenCalledWith('WIDTH_25');
        expect(componentFixture.instance.heightChange).toHaveBeenCalledWith('HEIGHT_25');
    }));

    it('should enable the fullscreen mode', async(() => {
        componentFixture.instance.fullscreen = false;
        componentFixture.instance.onFullscreenMode();
        expect(componentFixture.instance.fullscreen).toBeTruthy();
    }));

    it('should show the settings panel', async(() => {
        componentFixture.instance.isSettings = false;
        componentFixture.instance.toggleSettings();
        expect(componentFixture.instance.isSettings).toBeTruthy();
    }));

    it('should show the modal window', async(() => {
        componentFixture.instance.displayDialog = false;
        componentFixture.instance.toggleDialog();
        expect(componentFixture.instance.displayDialog).toBeTruthy();
    }));

    it('.onWidthChange()', async(() => {
        spyOn(componentFixture.instance, 'widthChange');
        spyOn(componentFixture.instance.dashboardBoxService, 'updateResource').and.returnValue(Observable.empty());
        componentFixture.instance.onWidthChange({value: 'WIDTH_25'});
        expect(componentFixture.instance.widthChange).toHaveBeenCalledWith('WIDTH_25');
        expect(componentFixture.instance.dashboardBoxService.updateResource).toHaveBeenCalled();
    }));

    it('.onHeightChange()', async(() => {
        spyOn(componentFixture.instance, 'heightChange');
        spyOn(componentFixture.instance.dashboardBoxService, 'updateResource').and.returnValue(Observable.empty());
        componentFixture.instance.onHeightChange({value: 'HEIGHT_25'});
        expect(componentFixture.instance.heightChange).toHaveBeenCalledWith('HEIGHT_25');
        expect(componentFixture.instance.dashboardBoxService.updateResource).toHaveBeenCalled();
    }));

    it('.onModelChange()', async(() => {
        let dashboardBox = <DashboardBox>{
            name: 'foo',
            width: <any>'WIDTH_25',
            height: <any>'HEIGHT_25'
        };
        spyOn(componentFixture.instance, 'heightChange');
        spyOn(componentFixture.instance, 'widthChange');
        spyOn(componentFixture.instance.dashboardBoxService, 'updateResource').and.returnValue(Observable.empty());
        componentFixture.instance.onModelChange(dashboardBox);
        expect(componentFixture.instance.heightChange).toHaveBeenCalledWith('HEIGHT_25');
        expect(componentFixture.instance.widthChange).toHaveBeenCalledWith('WIDTH_25');
        expect(componentFixture.instance.dashboardBox).toEqual(jasmine.objectContaining(dashboardBox))
    }));

    it('should change the width', async(() => {
        componentFixture.instance.widthChange(<any>'WIDTH_25');
        expect(componentFixture.instance.hostClasses).toEqual('ui-g-12 ui-md-3');
        componentFixture.instance.widthChange(<any>'WIDTH_50');
        expect(componentFixture.instance.hostClasses).toEqual('ui-g-12 ui-md-6');
        componentFixture.instance.widthChange(<any>'WIDTH_75');
        expect(componentFixture.instance.hostClasses).toEqual('ui-g-12 ui-md-9');
        componentFixture.instance.widthChange(<any>'WIDTH_100');
        expect(componentFixture.instance.hostClasses).toEqual('ui-g-12 ui-md-12');
    }));

    it('should change the height', async(() => {
        spyOn(componentFixture.instance.renderer, 'setStyle');
        componentFixture.instance.heightChange(<any>'HEIGHT_25');
        expect(componentFixture.instance.renderer.setStyle)
            .toHaveBeenCalledWith(componentFixture.instance.element.nativeElement, 'height', '146px');
        componentFixture.instance.heightChange(<any>'HEIGHT_50');
        expect(componentFixture.instance.renderer.setStyle)
            .toHaveBeenCalledWith(componentFixture.instance.element.nativeElement, 'height', '312px');
        componentFixture.instance.heightChange(<any>'HEIGHT_75');
        expect(componentFixture.instance.renderer.setStyle)
            .toHaveBeenCalledWith(componentFixture.instance.element.nativeElement, 'height', '476px');
        componentFixture.instance.heightChange(<any>'HEIGHT_100');
        expect(componentFixture.instance.renderer.setStyle)
            .toHaveBeenCalledWith(componentFixture.instance.element.nativeElement, 'height', '644px');
    }));

    it('should get kind of chart', async(() => {
        expect(componentFixture.instance.getKindOfChart(<any>'PIE_CHART')).toEqual('pie');
        expect(componentFixture.instance.getKindOfChart(<any>'SERIAL_CHART')).toEqual('doughnut');
        expect(componentFixture.instance.getKindOfChart(<any>'LINE_CHART')).toEqual('line');
        expect(componentFixture.instance.getKindOfChart(<any>'BAR_CHART')).toEqual('bar');
        expect(componentFixture.instance.getKindOfChart(<any>'BUBBLE_CHART')).toEqual('bubble');
        expect(componentFixture.instance.getKindOfChart(<any>'any')).toBeNull();
    }));

    it('.onKeyboard()', async(() => {
        spyOn(componentFixture.instance, 'onFullscreenMode');
        componentFixture.instance.fullscreen = true;
        componentFixture.instance.onKeyboard(<any>{code: 'Escape'});
        expect(componentFixture.instance.onFullscreenMode).toHaveBeenCalled();
    }));
});
