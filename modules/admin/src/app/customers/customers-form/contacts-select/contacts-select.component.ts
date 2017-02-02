import { Component, Input, ModuleWithProviders, NgModule, Output, EventEmitter } from "@angular/core";
import { TranslateService, TranslateModule } from "ng2-translate/ng2-translate";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { Location, CommonModule } from "@angular/common";
import { CrudService } from "../../crud.service";
import { FormsModule } from "@angular/forms";
import { MultipleSelectService } from "./multiple-select.service";
import { CustomersContactsService } from "../../customers-contacts/customers-contacts.service";
import { NotificationService } from "../../../services/notification-service";
import { CustomersUsersService } from "../../customers-users/customers-users.service";
import { Observable } from "rxjs";

@Component({
    selector: 'contacts-select',
    template: require('./contacts-select.component.html'),
    styleUrls: ['contacts-select.component.scss']
})

export class MultipleSelectComponent {

    public id: string = '';

    @Input('renderProperties')
    public renderProperties: string[] = [];

    @Input('property')
    public property: string = '';

    @Input()
    public model = [];

    @Output()
    public modelChange = new EventEmitter();

    constructor(public translate: TranslateService,
                public route: ActivatedRoute,
                public router: Router,
                public location: Location,
                public customersContactsService: CustomersContactsService,
                public customersUsersService: CustomersUsersService,
                public notifications: NotificationService) {
    }

    ngOnInit() {
        // get id parameter
        this.route.params.subscribe((params) => {
            this.id = params['id'];
        });

        this.modelChange.emit(this.model);
    }

    removeContact(index) {
        let deleteResource = Observable.empty();

        if (this.property === 'contacts') {
            deleteResource = this.customersContactsService.deleteCustomerContacts(this.model[index].id);
        } else if (this.property === 'users') {
            deleteResource = this.customersUsersService.deleteUser(this.model[index].id);
        }

        deleteResource.subscribe(() => {
                this.model.splice(index, 1);
                this.modelChange.emit(this.model);
                this.notifications.createNotification('success', 'SUCCESS', 'customers.successDelete');
            },
            err => {
                console.error(err);
                this.notifications.createNotification('error', 'ERROR', 'customers.errorDelete');
            });
    }

}

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TranslateModule,
        RouterModule
    ],
    providers: [CustomersUsersService],
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
