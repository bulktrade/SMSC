import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { CustomersService } from "../../customers.service";
import { ActivatedRoute } from "@angular/router";
import { NotificationService } from "../../../services/notification-service";
import { CustomersContactsService } from "../customers-contacts.service";

@Component({
    selector: 'contacts-update',
    templateUrl: './contacts-update.html'
})
export class ContactsUpdateComponent implements OnInit {

    public model: any = {};

    public contactId: string = '';

    constructor(public customersService: CustomersService,
                public route: ActivatedRoute,
                public customersContactsService: CustomersContactsService,
                public notifications: NotificationService,
                public location: Location) {
    }

    ngOnInit() {
        // get id parameter
        this.route.params.subscribe((params) => {
            this.contactId = params['contactId'];
        });

        this.model = this.getModel();
    }

    getModel() {
        let model = this.route.snapshot.data['update'];
        delete model['customer'];
        return this.route.snapshot.data['update'];
    }

    onSubmit(model) {
        this.customersContactsService.updateContact(this.contactId, model)
            .subscribe(() => {
                    this.notifications.createNotification('success', 'SUCCESS', 'customers.successUpdateContact');
                },
                err => {
                    console.error(err);
                    this.notifications.createNotification('error', 'ERROR', 'customers.errorUpdateContact');
                });
    }

}
