import {TestBed, async, inject} from "@angular/core/testing";
import {TranslateModule} from "ng2-translate";
import {RouterTestingModule} from "@angular/router/testing";
import {MockBackend} from "@angular/http/testing";
import {XHRBackend, ResponseOptions, Response} from "@angular/http";
import {ComponentHelper} from "../../../shared/component-fixture";
import {UsersCreateComponent} from "./users-create.component";
import {APP_PROVIDERS} from "../../../app.module";
import {ConfigService} from "../../../config/config.service";
import {UsersModule} from "../customers-users.module";
import {ConfigServiceMock} from "../../../shared/test/stub/config.service";
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {UsersUpdateComponent} from "./users-update.component";

describe('Component: UsersUpdateComponent', () => {
    let componentFixture: ComponentHelper<UsersUpdateComponent> =
        new ComponentHelper<UsersUpdateComponent>(null, null, null, null);
    let mockBackend;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                UsersModule,
                RouterTestingModule,
                TranslateModule.forRoot()
            ],
            providers: [
                APP_PROVIDERS,
                {provide: XHRBackend, useClass: MockBackend},
                {
                    provide: ActivatedRoute,
                    useValue: {params: Observable.of({userId: 40000}), component: UsersUpdateComponent}
                },
                {provide: ConfigService, useClass: ConfigServiceMock}
            ]
        });

        componentFixture.fixture = TestBed.createComponent(UsersUpdateComponent);
        componentFixture.instance = componentFixture.fixture.componentInstance;
        componentFixture.element = componentFixture.fixture.nativeElement;
        componentFixture.debugElement = componentFixture.fixture.debugElement;

        componentFixture.instance.model = <any>{};
    });

    beforeEach(inject([XHRBackend], (_mockBackend) => {
        mockBackend = _mockBackend;
    }));

    it('should have `<p-panel>` and `<form>`', async(() => {
        componentFixture.fixture.detectChanges();
        componentFixture.fixture.whenStable().then(() => {
            expect(componentFixture.element.querySelector('p-panel')).toBeTruthy();
            expect(componentFixture.element.querySelector('form')).toBeTruthy();
        });
    }));

    it('should get a success message about create new user', async(() => {
        mockBackend.connections.subscribe(connection => {
            let response = new ResponseOptions({body: {id: 1}});
            connection.mockRespond(new Response(response));
        });
        spyOn(componentFixture.instance.notifications, 'createNotification');
        spyOn(componentFixture.instance.location, 'back');
        spyOn(componentFixture.instance, 'toggleLoading');

        componentFixture.instance.onSubmit(<any>{id: 1, _links: {self: {href: ''}}});

        expect(componentFixture.instance.toggleLoading['calls'].argsFor(0)).toEqual([true]);
        expect(componentFixture.instance.toggleLoading['calls'].argsFor(1)).toEqual([false]);
        expect(componentFixture.instance.notifications.createNotification)
            .toHaveBeenCalledWith('success', 'SUCCESS', 'customers.successUpdateUser');
        expect(componentFixture.instance.location.back).toHaveBeenCalled();
    }));

    it('should get an error if user was not created', async(() => {
        mockBackend.connections.subscribe(connection => {
            let response = new ResponseOptions({status: 500});
            connection.mockError(new Response(response));
        });
        spyOn(componentFixture.instance.notifications, 'createNotification');
        spyOn(componentFixture.instance, 'toggleLoading');

        componentFixture.instance.onSubmit(<any>{id: 1, _links: {self: {href: ''}}});

        expect(componentFixture.instance.toggleLoading['calls'].argsFor(0)).toEqual([true]);
        expect(componentFixture.instance.toggleLoading['calls'].argsFor(1)).toEqual([false]);
        expect(componentFixture.instance.notifications.createNotification)
            .toHaveBeenCalledWith('error', 'ERROR', 'customers.errorUpdateUser');
    }));

    it('.ngOnInit()', async(() => {
        componentFixture.instance.ngOnInit();
        expect(componentFixture.instance.isDirectiveCall).toBeFalsy();
        expect(componentFixture.instance.userId).toEqual(40000);
    }));

    it('.onBack()', async(() => {
        spyOn(componentFixture.instance.location, 'back');
        componentFixture.instance.onBack();
        expect(componentFixture.instance.location.back).toHaveBeenCalled();
    }));
});
