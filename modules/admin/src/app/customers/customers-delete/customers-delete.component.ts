import { Component } from "@angular/core";
import { TranslateService } from "ng2-translate/ng2-translate";
import { Router, ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { Message } from "primeng/components/common/api";
import { BackendService } from "../../services/backend/backend.service";
import { NotificationService } from "../../services/notification-service";
import { CustomersService } from "../customers.service";

@Component({
    selector: 'customers-delete',
    template: require('./customers-delete.component.html'),
    styleUrls: [require('./customers-delete.component.scss')],
    providers: []
})

export class CustomersDeleteComponent {
    public id;
    public msgs: Message[] = [];

    constructor(public translate: TranslateService,
                public customersService: CustomersService,
                public router: Router,
                public route: ActivatedRoute,
                public location: Location,
                public backendService: BackendService,
                public notifications: NotificationService) {
    }

    ngOnInit() {
        this.translate.get('customers.confirmDeleteMsg')
            .subscribe(detail => {
                this.msgs.push({ severity: 'warn', detail: detail });
            });

        this.route.params.subscribe((params) => {
            this.id = params['id'];
        });
    }

    delete() {
        this.customersService.deleteCustomer(this.id)
            .subscribe(res => {
                this.notifications.createNotification('success', 'SUCCESS', 'customers.successDelete');
            }, err => {
                console.error(err);
                this.notifications.createNotification('error', 'ERROR', 'customers.errorDelete');
            })
    }
}
