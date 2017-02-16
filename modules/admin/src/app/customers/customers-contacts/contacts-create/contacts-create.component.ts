import {Component, OnInit} from "@angular/core";
import {Location} from "@angular/common";
import {CustomersService} from "../../customer.service";
import {ActivatedRoute} from "@angular/router";
import {NotificationService} from "../../../services/notification-service";
import {CustomersContactsService} from "../customer-contact.service";

@Component({
    selector: 'contacts-create',
    templateUrl: 'contacts-create.component.html'
})
export class ContactsCreateComponent implements OnInit {
    public model: any = {};

    public customerId: number;

    constructor(public customersService: CustomersService,
                public route: ActivatedRoute,
                public customersContactsService: CustomersContactsService,
                public notifications: NotificationService,
                public location: Location) {
    }

    ngOnInit() {
        // get id parameter
        this.route.params.subscribe((params) => {
            this.customerId = +params['customerId'];
        });
    }

    onSubmit(model) {
        model['customer'] = this.customersService.getSelfLinkedEntityById(this.customerId)._links.self.href;

        this.customersContactsService.createResource(model)
            .subscribe(() => {
                    this.notifications.createNotification('success', 'SUCCESS', 'customers.successCreateContact');
                },
                err => {
                    console.error(err);
                    this.notifications.createNotification('error', 'ERROR', 'customers.errorCreateContact');
                });
    }
}
