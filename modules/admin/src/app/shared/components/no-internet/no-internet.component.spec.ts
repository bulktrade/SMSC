import {TestBed, async} from "@angular/core/testing";
import {AppComponent} from "./app.component";
import {APP_PROVIDERS} from "./app.module";
import {TranslateModule} from "ng2-translate";
import {XHRBackend} from "@angular/http";
import {MockBackend} from "@angular/http/testing";
import {NoInternetComponent} from "./no-internet.component";
import {ComponentHelper} from "../../component-fixture";
import {ConfigServiceMock} from "../../test/stub/config.service";
import {ConfigService} from "../../../config/config.service";
import {MessagesModule} from "primeng/components/messages/messages";
import {Observable} from "rxjs";

describe('Component: NoInternetComponent', () => {
    let componentFixture: ComponentHelper<NoInternetComponent> =
        new ComponentHelper<NoInternetComponent>(null, null, null, null);

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TranslateModule.forRoot(), MessagesModule],
            providers: [
                {provide: XHRBackend, useClass: MockBackend},
                {provide: ConfigService, useClass: ConfigServiceMock}
            ],
            declarations: [NoInternetComponent]
        });

        componentFixture.fixture = TestBed.createComponent(NoInternetComponent);
        componentFixture.instance = componentFixture.fixture.componentInstance;
        componentFixture.element = componentFixture.fixture.nativeElement;
        componentFixture.debugElement = componentFixture.fixture.debugElement;
    });

    it('.ngOnInit()', async(() => {
        spyOn(window, 'addEventListener').and.callFake((type: string, listener: () => any, useCapture?: boolean) => {listener()});
        spyOn(componentFixture.instance, 'offline');
        spyOn(componentFixture.instance, 'online');
        spyOn(componentFixture.instance.translate, 'get').and.returnValue(Observable.of('translatedValue'));

        componentFixture.instance.ngOnInit();

        expect(componentFixture.instance.msgs[0].detail).toEqual('translatedValue');
        expect(componentFixture.instance.offline).toHaveBeenCalled();
        expect(componentFixture.instance.online).toHaveBeenCalled();
    }));

    it('.offline()', async(() => {
        componentFixture.instance.offline();
        expect(componentFixture.instance.toggle).toBeFalsy();
    }));

    it('.online()', async(() => {
        componentFixture.instance.online();
        expect(componentFixture.instance.toggle).toBeTruthy();
    }));
});
