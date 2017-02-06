import { Component } from "@angular/core";
import { TranslateService } from "ng2-translate/ng2-translate";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { NotificationService } from "../../services/notification-service";
import { CustomersService } from "../customers.service";

@Component({
    selector: 'customers-update',
    template: `
        <breadcrumb></breadcrumb>
        <dynamic-form [submitButtonName]="submitButtonName" [model]="model"
                    (onSubmit)="onSubmit($event)"></dynamic-form>
    `,
    styleUrls: [],
    providers: [Location]
})

export class CustomersUpdateComponent {
    public id: number;
    public submitButtonName: string = 'customers.update';
    public model = {};

    constructor(public translate: TranslateService,
                public customersService: CustomersService,
                public route: ActivatedRoute,
                public location: Location,
                public notifications: NotificationService) {
    }

    ngOnInit() {
        // get id parameter
        this.route.params.subscribe((params) => {
            this.id = +params['id'];
        });

        this.model = this.getModel();
    }

    getModel() {
        return this.route.snapshot.data['edit'];
    }

    onSubmit(data) {
        // delete all properties of URI
        delete data['customerUsers'];
        delete data['contacts'];
        delete data['parentCustomer'];

        this.customersService.updateResource(this.id, data)
            .subscribe(() => {
                this.notifications.createNotification('success', 'SUCCESS', 'customers.successUpdate');
            }, err => {
                console.error(err);
                this.notifications.createNotification('error', 'ERROR', 'customers.errorUpdate');
            })
    }

}
