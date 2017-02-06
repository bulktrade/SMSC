import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { CustomersService } from "../../customers.service";
import { ActivatedRoute } from "@angular/router";
import { NotificationService } from "../../../services/notification-service";
import { CustomersUsersService } from "../customers-users.service";

@Component({
    selector: 'users-users',
    templateUrl: 'users-create.html'
})
export class UsersCreateComponent implements OnInit {
    public model: any = {};

    public userId: number;

    constructor(public customersService: CustomersService,
                public route: ActivatedRoute,
                public customersUsersService: CustomersUsersService,
                public notifications: NotificationService,
                public location: Location) {
    }

    ngOnInit() {
        // get id parameter
        this.route.params.subscribe((params) => {
            this.userId = +params['customerId'];
        });
    }

    onSubmit(model) {
        this.addCustomerURI(this.userId)
            .subscribe((customerURI) => {
                model['customer'] = customerURI;

                this.customersUsersService.createResource(model)
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
