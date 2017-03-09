import {Component} from "@angular/core";
import {TranslateService} from "ng2-translate/ng2-translate";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {NotificationService} from "../../services/notification-service";
import {CustomersService} from "../customer.service";
import {Customer} from "../model/customer";

@Component({
    selector: 'customers-update',
    template: `
        <customers-form [submitButtonName]="submitButtonName" [model]="model"
                    [isLoading]="isLoading" (onSubmit)="onSubmit($event)"></customers-form>
    `,
    styleUrls: [],
    providers: [Location]
})

export class CustomersUpdateComponent {

    public id: number;

    public submitButtonName: string = 'customers.update';

    public model: Customer = <Customer>{};

    public isLoading: boolean = false;

    constructor(public translate: TranslateService,
                public customersService: CustomersService,
                public route: ActivatedRoute,
                public location: Location,
                public notifications: NotificationService) {
    }

    ngOnInit() {
        // get id parameter
        this.route.params.subscribe((params) => {
            this.id = params['customerId'];
        });

        this.model = this.getModel();
    }

    getModel(): Customer {
        return this.route.snapshot.data.hasOwnProperty('edit') ?
            this.route.snapshot.data['edit'] : <Customer>{};
    }

    onSubmit(entity: Customer) {
        this.isLoading = true;
        this.customersService.updateResource(entity)
            .subscribe(() => {
                this.isLoading = false;
                this.notifications.createNotification('success', 'SUCCESS', 'customers.successUpdateCustomer');
            }, err => {
                console.error(err);
                this.isLoading = false;
                this.notifications.createNotification('error', 'ERROR', 'customers.errorUpdateCustomer');
            })
    }

}
