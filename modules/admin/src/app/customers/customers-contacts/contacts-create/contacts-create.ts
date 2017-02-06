import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { CustomersService } from "../../customers.service";
import { ActivatedRoute } from "@angular/router";
import { NotificationService } from "../../../services/notification-service";
import { CustomersContactsService } from "../customers-contacts.service";

@Component({
    selector: 'contacts-create',
    templateUrl: './contacts-create.html'
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
        this.addCustomerURI(this.customerId)
            .subscribe((customerURI) => {
                model['customer'] = customerURI;

                this.customersContactsService.createResource(model)
                    .subscribe(() => {
                            this.notifications.createNotification('success', 'SUCCESS', 'customers.successCreateContact');
                        },
                        err => {
                            console.error(err);
                            this.notifications.createNotification('error', 'ERROR', 'customers.errorCreateContact');
                        });
            });
    }

    addCustomerURI(id: number) {
        return this.customersService.getResource(id)
            .map(res => res['_links'].self.href);
    }

}
