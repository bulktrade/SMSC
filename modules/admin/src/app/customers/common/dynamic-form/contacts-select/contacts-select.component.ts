import { Component, Input, ModuleWithProviders, NgModule, Output, EventEmitter } from "@angular/core";
import { TranslateService, TranslateModule } from "ng2-translate/ng2-translate";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { Location, CommonModule } from "@angular/common";
import { CrudService } from "../../crud.service";
import { FormsModule } from "@angular/forms";
import { MultipleSelectService } from "./multiple-select.service";
import { CustomersContactsService } from "../../../customers-contacts/customers-contacts.service";
import { NotificationService } from "../../../../services/notification-service";

@Component({
    selector: 'contacts-select',
    template: require('./contacts-select.component.html'),
    styleUrls: ['contacts-select.component.scss']
})

export class MultipleSelectComponent {

    public id: string = '';

    public renderProperties: string[] = ['firstname', 'surname', 'phone', 'mobilePhone', 'emailAddress'];

    @Input()
    public model = [];

    @Output()
    public modelChange = new EventEmitter();

    constructor(public translate: TranslateService,
                public route: ActivatedRoute,
                public router: Router,
                public location: Location,
                public customersContactsService: CustomersContactsService,
                public notifications: NotificationService) {
    }

    ngOnInit() {
        // get id parameter
        this.route.params.subscribe((params) => {
            this.id = params['id'];
        });

        this.modelChange.emit(this.model);
    }

    removeContacts() {
        this.model = [];
        this.modelChange.emit(this.model);
    }

    removeContact(index) {
        this.customersContactsService.deleteCustomerContacts(this.model[index].id)
            .subscribe(() => {
                    this.model.splice(index, 1);
                    this.modelChange.emit(this.model);

                    this.notifications.createNotification('success', 'SUCCESS', 'customers.successDeleteContactFromCustomer');
                },
                err => {
                    console.error(err);
                    this.notifications.createNotification('error', 'ERROR', 'customers.errorDeleteContactFromCustomer');
                });
    }

    updateContact(index) {
    }

}

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TranslateModule,
        RouterModule
    ],
    exports: [MultipleSelectComponent],
    declarations: [MultipleSelectComponent]
})
export class MultipleSelectModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: MultipleSelectModule,
            providers: []
        };
    }
}
