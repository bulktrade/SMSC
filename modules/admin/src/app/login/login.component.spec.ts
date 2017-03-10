import {TestBed, async, inject} from "@angular/core/testing";
import {TranslateModule} from "ng2-translate";
import {RouterTestingModule} from "@angular/router/testing";
import {MockBackend} from "@angular/http/testing";
import {XHRBackend, ResponseOptions, Response} from "@angular/http";
import {ComponentHelper} from "../shared/component-fixture";
import {LoginComponent} from "./login.component";
import {ConfigService} from "../config/config.service";
import {APP_PROVIDERS, AppModule} from "../app.module";
import {ConfigServiceMock} from "../shared/test/stub/config.service";
import {LoginModel} from "./login.model";
import {Observable} from "rxjs";

describe('Component: LoginComponent', () => {
    let componentFixture: ComponentHelper<LoginComponent> =
        new ComponentHelper<LoginComponent>(null, null, null, null);
    let mockBackend;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                AppModule,
                RouterTestingModule,
                TranslateModule.forRoot()
            ],
            providers: [
                APP_PROVIDERS,
                {provide: XHRBackend, useClass: MockBackend},
                {provide: ConfigService, useClass: ConfigServiceMock}
            ]
        });

        componentFixture.fixture = TestBed.createComponent(LoginComponent);
        componentFixture.instance = componentFixture.fixture.componentInstance;
        componentFixture.element = componentFixture.fixture.nativeElement;
        componentFixture.debugElement = componentFixture.fixture.debugElement;
    });

    beforeEach(inject([XHRBackend], (_mockBackend) => {
        mockBackend = _mockBackend;
    }));

    it('should render `login.title`', async(() => {
        componentFixture.fixture.detectChanges();
        componentFixture.fixture.whenStable().then(() => {
            expect(componentFixture.element.querySelector('.title').innerText.toLowerCase()).toEqual('login.title');
        });
    }));

    it('should have loadingSpinner and model', async(() => {
        let model = new LoginModel('', '', false);
        expect(componentFixture.instance.loadingSpinner).toBeFalsy();
        expect(componentFixture.instance.model).toEqual(jasmine.objectContaining(model));
    }));

    it('.onSubmit() - status: 200', async(() => {
        spyOn(componentFixture.instance, 'toggleLoading');
        spyOn(componentFixture.instance.router, 'navigateByUrl');
        spyOn(componentFixture.instance.authService, 'login').and.callFake((username: string, password: string) => {
            return Observable.of(new Response(new ResponseOptions({status: 200})));
        });

        componentFixture.instance.onSubmit(new LoginModel('', '', false));

        expect(componentFixture.instance.toggleLoading['calls'].argsFor(0)).toEqual([true]);
        expect(componentFixture.instance.router.navigateByUrl).toHaveBeenCalledWith('/customers');
    }));

    it('.onSubmit() - status: 401', async(() => {
        spyOn(componentFixture.instance, 'toggleLoading');
        spyOn(componentFixture.instance.router, 'navigateByUrl');
        spyOn(componentFixture.instance.growlService, 'show');
        spyOn(componentFixture.instance.authService, 'login').and.callFake((username: string, password: string) => {
            return Observable.throw(new Response(new ResponseOptions({status: 401})));
        });

        componentFixture.instance.onSubmit(new LoginModel('', '', false));

        expect(componentFixture.instance.toggleLoading['calls'].argsFor(0)).toEqual([true]);
        expect(componentFixture.instance.toggleLoading['calls'].argsFor(1)).toEqual([false]);
        expect(componentFixture.instance.growlService.show).toHaveBeenCalledWith({severity: 'error', detail: 'login.userNotFound'});
    }));

    it('.onSubmit() - status: 500', async(() => {
        spyOn(componentFixture.instance, 'toggleLoading');
        spyOn(componentFixture.instance.router, 'navigateByUrl');
        spyOn(componentFixture.instance.growlService, 'show');
        spyOn(componentFixture.instance.authService, 'login').and.callFake((username: string, password: string) => {
            return Observable.throw(new Response(new ResponseOptions({status: 500})));
        });

        componentFixture.instance.onSubmit(new LoginModel('', '', false));

        expect(componentFixture.instance.toggleLoading['calls'].argsFor(0)).toEqual([true]);
        expect(componentFixture.instance.toggleLoading['calls'].argsFor(1)).toEqual([false]);
        expect(componentFixture.instance.growlService.show).toHaveBeenCalledWith({severity: 'error', detail: 'login.commonError'});
    }));
});
