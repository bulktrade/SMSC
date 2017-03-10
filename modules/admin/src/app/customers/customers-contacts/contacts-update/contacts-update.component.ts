import {Component, OnInit, Input, EventEmitter, Output, NgModule} from "@angular/core";
import {Location, CommonModule} from "@angular/common";
import {CustomersService} from "../../customer.service";
import {ActivatedRoute} from "@angular/router";
import {NotificationService} from "../../../services/notification-service";
import {CustomersContactsService} from "../customer-contact.service";
import {Action} from "../../../shared/components/one-to-many/one-to-many.model";
import {Contact} from "../../model/contact";
import {FormsModule} from "@angular/forms";
import {PanelModule} from "primeng/components/panel/panel";
import {InputTextModule} from "primeng/components/inputtext/inputtext";
import {DropdownModule} from "primeng/components/dropdown/dropdown";
import {TranslateModule} from "ng2-translate";
import {ControlErrorsModule} from "../../../shared/components/control-errors/control-errors.component";

@Component({
    selector: 'contacts-update',
    templateUrl: 'contacts-update.component.html'
})
export class ContactsUpdateComponent implements OnInit {

    public model: Contact = null;

    public contactId: number;

    @Input('entity')
    public entity: Contact;

    @Output('onBack')
    public _onBack: EventEmitter<Action> = new EventEmitter();

    public isDirectiveCall: boolean = false;

    public isLoading: boolean = false;

    constructor(public customersService: CustomersService,
                public route: ActivatedRoute,
                public contactsService: CustomersContactsService,
                public notifications: NotificationService,
                public location: Location) {
    }

    ngOnInit() {
        // get id parameter
        this.route.params.subscribe((params) => {
            this.contactId = this.isDirectiveCall ? this.contactId : params['contactId'];
        });
        this.isDirectiveCall = !(this.route.component === ContactsUpdateComponent);
        this.model = this.isDirectiveCall ? this.entity : this.getModel();
    }

    getModel() {
        return this.model || this.route.snapshot.data['update'];
    }

    onSubmit(entity) {
        this.toggleLoading(true);
        this.contactsService.updateResource(entity)
            .subscribe(() => {
                    this.onBack();
                    this.toggleLoading(false);
                    this.notifications.createNotification('success', 'SUCCESS', 'customers.successUpdateContact');
                },
                err => {
                    console.error(err);
                    this.toggleLoading(false);
                    this.notifications.createNotification('error', 'ERROR', 'customers.errorUpdateContact');
                });
    }

    onBack() {
        if (this.isDirectiveCall) {
            this._onBack.emit(Action.View);
        } else {
            this.location.back();
        }
    }

    toggleLoading(value: boolean) {
        this.isLoading = value;
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
    exports: [ContactsUpdateComponent],
    declarations: [ContactsUpdateComponent]
})
export class ContactsUpdateModule {
}
