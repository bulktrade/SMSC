import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { CustomersService } from "../../customers.service";
import { ActivatedRoute } from "@angular/router";
import { NotificationService } from "../../../services/notification-service";
import { CustomersUsersService } from "../customers-users.service";

@Component({
    selector: 'contacts-update',
    templateUrl: 'users-update.html'
})
export class UsersUpdateComponent implements OnInit {

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
            this.userId = +params['userId'];
        });

        this.model = this.getModel();
    }

    getModel() {
        let model = this.route.snapshot.data['update'];
        delete model['customer'];
        return this.route.snapshot.data['update'];
    }

    onSubmit(model) {
        this.customersUsersService.updateUser(this.userId, model)
            .subscribe(() => {
                    this.notifications.createNotification('success', 'SUCCESS', 'customers.successUpdateContact');
                },
                err => {
                    console.error(err);
                    this.notifications.createNotification('error', 'ERROR', 'customers.errorUpdateContact');
                });
    }

}
