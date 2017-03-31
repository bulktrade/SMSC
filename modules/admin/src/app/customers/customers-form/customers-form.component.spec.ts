import {TestBed, async} from "@angular/core/testing";
import {TranslateModule} from "ng2-translate";
import {RouterTestingModule} from "@angular/router/testing";
import {MockBackend} from "@angular/http/testing";
import {XHRBackend} from "@angular/http";
import {ActivatedRoute} from "@angular/router";
import {ComponentHelper} from "../../shared/component-fixture";
import {CustomersFormComponent, CustomersFormModule} from "./customers-form.component";
import {APP_PROVIDERS} from "../../app.module";
import {ConfigService} from "../../config/config.service";
import {ConfigServiceMock} from "../../shared/test/stub/config.service";
import {Customer} from "../model/customer";
import {OneToMany, Action} from "../../shared/components/one-to-many/one-to-many.model";
import {CustomersFormModel} from "./customers-form.model";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('Component: CustomersFormComponent', () => {
    let componentFixture: ComponentHelper<CustomersFormComponent> =
        new ComponentHelper<CustomersFormComponent>(null, null, null, null);
    let model: Customer = <Customer>{
        country: 'country',
        city: 'city',
        companyName: 'companyName',
        street: 'street',
        street2: 'street2',
        postcode: 'postcode',
        vatid: 'vatid',
        contacts: [],
        users: [],
        parent: <Customer>{},
        _links: {}
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [BrowserAnimationsModule, CustomersFormModule, RouterTestingModule, TranslateModule.forRoot()],
            providers: [
                APP_PROVIDERS,
                {provide: XHRBackend, useClass: MockBackend},
                {provide: ActivatedRoute, useValue: {params: {value: {customerId: 40000}}}},
                {provide: ConfigService, useClass: ConfigServiceMock},
            ]
        });

        componentFixture.fixture = TestBed.createComponent(CustomersFormComponent);
        componentFixture.instance = componentFixture.fixture.componentInstance;
        componentFixture.element = componentFixture.fixture.nativeElement;
        componentFixture.debugElement = componentFixture.fixture.debugElement;

        componentFixture.instance.model = model;
    });

    it('should have the `customers-form`, title should render `CUSTOMERS`', async(() => {
        componentFixture.fixture.detectChanges();
        componentFixture.fixture.whenStable().then(() => {
            expect(componentFixture.element.querySelector('#customers-form')).toBeDefined();
            expect(componentFixture.element.querySelector('p-header span').innerText).toEqual('CUSTOMERS');
        });
    }));

    it('.ngOnInit()', async(() => {
        componentFixture.instance.ngOnInit();
        expect(componentFixture.instance.id).toEqual(40000);
    }));

    it('.onSubmit()', async(() => {
        spyOn(componentFixture.instance._onSubmit, 'emit');
        componentFixture.instance.onSubmit(<any>{});
        expect(componentFixture.instance._onSubmit.emit)
            .toHaveBeenCalledWith(new CustomersFormModel(componentFixture.instance.model, <any>{}));
    }));

    it('.back()', async(() => {
        spyOn(componentFixture.instance.location, 'back');
        componentFixture.instance.back();
        expect(componentFixture.instance.location.back).toHaveBeenCalled();
    }));

    it('should navigate to the create component', async(() => {
        spyOn(componentFixture.instance.router, 'navigate');
        componentFixture.instance.ngOnInit();
        componentFixture.instance.onCreate(<OneToMany>{propertyName: 'users', action: Action.Create});
        expect(componentFixture.instance.router.navigate).toHaveBeenCalledWith(['/customers', 40000, 'users', 'create']);
    }));

    it('should navigate to the update component', async(() => {
        spyOn(componentFixture.instance.router, 'navigate');
        componentFixture.instance.ngOnInit();
        componentFixture.instance.onUpdate(<OneToMany>{propertyName: 'users', action: Action.Update, entity: {id: 1}});
        expect(componentFixture.instance.router.navigate).toHaveBeenCalledWith(['/customers', 40000, 'users', 'update', 1]);
    }));

    it('should navigate to the delete component', async(() => {
        spyOn(componentFixture.instance.router, 'navigate');
        componentFixture.instance.ngOnInit();
        componentFixture.instance.onDelete(<OneToMany>{propertyName: 'users', action: Action.Delete, entity: {id: 1}});
        expect(componentFixture.instance.router.navigate).toHaveBeenCalledWith(['/customers', 40000, 'users', 'delete', 1]);
    }));
});
