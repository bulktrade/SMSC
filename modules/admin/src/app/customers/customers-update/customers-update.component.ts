import {Component} from "@angular/core";
import {TranslateService} from "ng2-translate/ng2-translate";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {NotificationService} from "../../services/notification-service";
import {Customer} from "../model/customer";
import {CustomersService} from "../customer.service";

@Component({
    selector: 'customers-update',
    template: `
        <customers-form [submitButtonName]="submitButtonName" [model]="model"
                    (onSubmit)="onSubmit($event)"></customers-form>
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

    onSubmit(_entity: Customer) {
        this.customersService.updateResource(_entity)
            .subscribe(() => {
                this.notifications.createNotification('success', 'SUCCESS', 'customers.successUpdateCustomer');
            }, err => {
                this.notifications.createNotification('error', 'ERROR', 'customers.errorUpdateCustomer');
            })
    }

}
