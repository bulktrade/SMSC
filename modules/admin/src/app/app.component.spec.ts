import {TestBed, async} from "@angular/core/testing";
import {SimpleNotificationsModule} from "angular2-notifications";
import {MockBackend} from "@angular/http/testing";
import {TranslateModule} from "ng2-translate";
import {XHRBackend} from "@angular/http";
import {RouterTestingModule} from "@angular/router/testing";

import {ComponentHelper} from "./shared/component-fixture";
import {AppComponent} from "./app.component";
import {APP_PROVIDERS} from "./app.module";
import {ConfigService} from "./config/config.service";
import {ConfigServiceMock} from "./shared/test/stub/config.service";

describe('Component: AppComponent', () => {
    let componentFixture: ComponentHelper<AppComponent> =
        new ComponentHelper<AppComponent>(null, null, null, null);

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TranslateModule.forRoot(), SimpleNotificationsModule, RouterTestingModule],
            providers: [
                APP_PROVIDERS,
                {provide: XHRBackend, useClass: MockBackend},
                {provide: ConfigService, useClass: ConfigServiceMock}
            ],
            declarations: [AppComponent]
        });

        componentFixture.fixture = TestBed.createComponent(AppComponent);
        componentFixture.instance = componentFixture.fixture.componentInstance;
        componentFixture.element = componentFixture.fixture.nativeElement;
        componentFixture.debugElement = componentFixture.fixture.debugElement;
    });

    it('should have `<simple-notifications>`', async(() => {
        componentFixture.fixture.detectChanges();
        componentFixture.fixture.whenStable().then(() => {
            expect(componentFixture.element.querySelector('simple-notifications')).toBeDefined();
        });
    }));

    it('.ngOnInit()', async(() => {
        spyOn(navigator.language, 'split').and.returnValue(['en', 'US']);
        componentFixture.instance.ngOnInit();
        expect(componentFixture.instance.translate.getDefaultLang()).toEqual('en');
    }));
});
