import {TestBed, async} from "@angular/core/testing";
import {TranslateModule} from "ng2-translate";
import {RouterTestingModule} from "@angular/router/testing";
import {MockBackend} from "@angular/http/testing";
import {XHRBackend} from "@angular/http";
import {ComponentHelper} from "../shared/component-fixture";
import {NavigationComponent} from "./navigation.component";
import {APP_PROVIDERS, AppModule} from "../app.module";
import {ConfigService} from "../config/config.service";
import {ConfigServiceMock} from "../shared/test/stub/config.service";
import {Observable} from "rxjs";
import {NavigationStart, NavigationEnd} from "@angular/router";

describe('Component: NavigationComponent', () => {
    let componentFixture: ComponentHelper<NavigationComponent> =
        new ComponentHelper<NavigationComponent>(null, null, null, null);

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [AppModule, RouterTestingModule, TranslateModule.forRoot()],
            providers: [
                APP_PROVIDERS,
                {provide: XHRBackend, useClass: MockBackend},
                {provide: ConfigService, useClass: ConfigServiceMock},
            ]
        });

        componentFixture.fixture = TestBed.createComponent(NavigationComponent);
        componentFixture.instance = componentFixture.fixture.componentInstance;
        componentFixture.element = componentFixture.fixture.nativeElement;
        componentFixture.debugElement = componentFixture.fixture.debugElement;
    });

    it('should have the `navigation-window`, `sidebar`, `main-content`', async(() => {
        componentFixture.fixture.detectChanges();
        componentFixture.fixture.whenStable().then(() => {
            expect(componentFixture.element.querySelector('#navigation-window')).toBeDefined();
            expect(componentFixture.element.querySelector('sidebar')).toBeDefined();
            expect(componentFixture.element.querySelector('.main-content')).toBeDefined();
        });
    }));

    it('should logout', async(() => {
        spyOn(localStorage, 'removeItem');
        spyOn(componentFixture.instance.router, 'navigateByUrl');

        componentFixture.instance.logout();

        expect(componentFixture.instance.router.navigateByUrl).toHaveBeenCalledWith('/login');
        expect(localStorage.removeItem).toHaveBeenCalledWith('AdminToken')
    }));

    it('.ngOnInit()', async(() => {
        spyOn(componentFixture.instance.loadingROService, 'start');
        spyOn(componentFixture.instance.loadingROService, 'stop');
        spyOn(componentFixture.instance, 'hideSidebarOnLargeScreen');
        componentFixture.instance.router = <any>{events: Observable.of(new NavigationStart(1, ''), new NavigationEnd(1, '', ''))};

        componentFixture.instance.ngOnInit();

        expect(componentFixture.instance.loadingROService.start).toHaveBeenCalled();
        expect(componentFixture.instance.loadingROService.stop).toHaveBeenCalled();
        expect(componentFixture.instance.hideSidebarOnLargeScreen).toHaveBeenCalled();
    }));

    it('.hideSidebarOnLargeScreen()', async(() => {
        document.querySelector('body').style.width = '500px';
        componentFixture.instance.hideSidebarOnLargeScreen();
        expect(componentFixture.instance.toggleUpSidebar).toBeTruthy();
    }));
});
