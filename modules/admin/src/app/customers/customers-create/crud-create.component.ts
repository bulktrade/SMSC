import { Component } from "@angular/core";
import { TranslateService } from "ng2-translate/ng2-translate";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { NotificationService } from "../../services/notification-service";
import { CustomersService } from "../customers.service";

@Component({
    selector: 'customers-create',
    template: `<dynamic-form [submitButtonName]="submitButtonName"
                    (onSubmit)="onSubmit($event)"></dynamic-form>`,
    styleUrls: [],
    providers: [Location]
})

export class CustomersCreateComponent {
    public submitButtonName: string = 'customers.create';

    constructor(public translate: TranslateService,
                public customersService: CustomersService,
                public route: ActivatedRoute,
                public location: Location,
                public notifications: NotificationService) {
    }

    ngOnInit() {
    }

    onSubmit(data) {
        this.customersService.createCustomer(data)
            .subscribe(() => {
                this.notifications.createNotification('success', 'SUCCESS', 'customers.successCreate');
            }, err => {
                console.error(err);
                this.notifications.createNotification('error', 'ERROR', 'customers.errorCreate');
            })
    }

}
