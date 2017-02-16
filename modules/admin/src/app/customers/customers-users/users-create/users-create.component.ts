import {Component, OnInit} from "@angular/core";
import {Location} from "@angular/common";
import {CustomersService} from "../../customer.service";
import {ActivatedRoute} from "@angular/router";
import {NotificationService} from "../../../services/notification-service";
import {CustomersUsersService} from "../customer-user.service";

@Component({
    selector: 'users-users',
    templateUrl: 'users-create.component.html'
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
        model['customer'] = this.customersUsersService.getSelfLinkedEntityById(this.userId)._links.self.href;

        this.customersUsersService.createResource(model)
            .subscribe(() => {
                    this.notifications.createNotification('success', 'SUCCESS', 'customers.successCreateUser');
                },
                err => {
                    console.error(err);
                    this.notifications.createNotification('error', 'ERROR', 'customers.errorCreateUser');
                });
    }

}
