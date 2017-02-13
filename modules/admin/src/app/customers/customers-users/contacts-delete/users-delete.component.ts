import { Component } from "@angular/core";
import { TranslateService } from "ng2-translate/ng2-translate";
import { Router, ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { Message } from "primeng/components/common/api";
import { CustomersService } from "../customers.service";
import { NotificationService } from "../../../services/notification-service";
import { CustomersContactsService } from "../customers-contacts.service";
import { CustomersUsersService } from "../customers-users.service";

@Component({
    selector: 'customers-delete',
    templateUrl: './../../../shared/templates/delete.component.html',
    styleUrls: ['./../../../shared/styles/delete.component.scss']
})

export class UsersDeleteComponent {
    public id: number;
    public msgs: Message[] = [];

    constructor(public translate: TranslateService,
                public customersUsersService: CustomersUsersService,
                public router: Router,
                public route: ActivatedRoute,
                public location: Location,
                public notifications: NotificationService) {
    }

    ngOnInit() {
        this.translate.get('customers.confirmDeleteMsg')
            .subscribe(detail => {
                this.msgs.push({ severity: 'warn', detail: detail });
            });

        this.route.params.subscribe((params) => {
            this.id = +params['userId'];
        });
    }

    deleteResource() {
        this.customersUsersService.deleteResource(this.id)
            .subscribe(() => {
                this.notifications.createNotification('success', 'SUCCESS', 'customers.successDeleteUser');
                this.location.back();
            }, err => {
                console.error(err);
                this.notifications.createNotification('error', 'ERROR', 'customers.errorDeleteUser');
            })
    }
}
