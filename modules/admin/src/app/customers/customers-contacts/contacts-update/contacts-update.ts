import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { CustomersService } from "../../customers.service";
import {ActivatedRoute, Router} from "@angular/router";
import { NotificationService } from "../../../services/notification-service";
import { CustomersContactsService } from "../customers-contacts.service";
import {Contact} from "../../model/contact";
import {Entity} from "../../../shared/entity.model";

@Component({
    selector: 'contacts-update',
    templateUrl: './contacts-update.html'
})
export class ContactsUpdateComponent implements OnInit {

    public model: any = {};

    public contactId: number;

    constructor(public customersService: CustomersService,
                public route: ActivatedRoute,
                public customersContactsService: CustomersContactsService,
                public notifications: NotificationService,
                public location: Location) {
    }

    ngOnInit() {
        // get id parameter
        this.route.params.subscribe((params) => {
            this.contactId = +params['contactId'];
        });

        this.model = this.getModel();
    }

    getModel() {
        let model = this.route.snapshot.data['update'];
        return this.route.snapshot.data['update'];
    }

    onSubmit(entity) {
        this.customersContactsService.updateResource(entity)
            .subscribe(() => {
                    this.notifications.createNotification('success', 'SUCCESS', 'customers.successUpdateContact');
                },
                err => {
                    console.error(err);
                    this.notifications.createNotification('error', 'ERROR', 'customers.errorUpdateContact');
                });
    }

}
