import {Component, OnInit, NgModule, Input, Output, EventEmitter} from "@angular/core";
import {Location, CommonModule} from "@angular/common";
import {CustomersService} from "../../customer.service";
import {ActivatedRoute} from "@angular/router";
import {NotificationService} from "../../../services/notification-service";
import {CustomersContactsService} from "../customer-contact.service";
import {FormsModule, NgForm} from "@angular/forms";
import {PanelModule} from "primeng/components/panel/panel";
import {InputTextModule} from "primeng/components/inputtext/inputtext";
import {DropdownModule} from "primeng/components/dropdown/dropdown";
import {TranslateModule} from "ng2-translate";
import {ControlErrorsModule} from "../../../shared/components/control-errors/control-errors.component";
import {Action} from "../../../shared/components/one-to-many/one-to-many.model";
import {Contact} from "../../model/contact";
import {ControlErrorService} from "../../../services/control-error";

@Component({
    selector: 'contacts-create',
    templateUrl: 'contacts-create.component.html'
})
export class ContactsCreateComponent implements OnInit {

    @Output('onBack')
    public _onBack: EventEmitter<Action> = new EventEmitter();

    public model: Contact = <Contact>{};

    @Input('customerId')
    public customerId: number;

    public isDirectiveCall: boolean = false;

    public isLoading: boolean = false;

    constructor(public customersService: CustomersService,
                public route: ActivatedRoute,
                public customersContactsService: CustomersContactsService,
                public notifications: NotificationService,
                public location: Location,
                public controlErrorService: ControlErrorService) {
    }

    ngOnInit() {
        this.isDirectiveCall = !(this.route.component === ContactsCreateComponent);
        // get id parameter
        this.route.params.subscribe((params) => {
            this.customerId = this.isDirectiveCall ? this.customerId : params['customerId'];
        });
    }

    onSubmit(model: Contact, contactsForm: NgForm) {
        this.model = model;
        model['customer'] = this.customersService.getSelfLinkedEntityById(this.customerId)._links.self.href;
        this.toggleLoading();
        this.customersContactsService.createResource(model)
            .subscribe(() => {
                    this.onBack();
                    this.toggleLoading();
                    this.notifications.createNotification('success', 'SUCCESS', 'customers.successCreateContact');
                },
                (e) => {
                    this.toggleLoading();
                    this.controlErrorService.formControlErrors(e.json(), contactsForm);
                });
    }

    onBack() {
        if (this.isDirectiveCall) {
            this._onBack.emit(Action.View);
        } else {
            this.location.back();
        }
    }

    toggleLoading() {
        this.isLoading = !this.isLoading;
    }
}


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        PanelModule,
        InputTextModule,
        DropdownModule,
        TranslateModule,
        ControlErrorsModule
    ],
    exports: [ContactsCreateComponent],
    declarations: [ContactsCreateComponent]
})
export class ContactsCreateModule {
}
