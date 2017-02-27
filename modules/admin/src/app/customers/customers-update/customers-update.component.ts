import {Component} from "@angular/core";
import {TranslateService} from "ng2-translate/ng2-translate";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {NotificationService} from "../../services/notification-service";
import {CustomersService} from "../customer.service";
import {Customer} from "../model/customer";
import {Observable} from "rxjs";

@Component({
    selector: 'customers-update',
    template: `
        <customers-form [submitButtonName]="submitButtonName" [model]="model"
                    [isLoading]="isLoading" (onSubmit)="onSubmit($event).subscribe()"></customers-form>
    `,
    styleUrls: [],
    providers: [Location]
})

export class CustomersUpdateComponent {

    public id: number;

    public submitButtonName: string = 'customers.update';

    public model: Customer = null;

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
        return this.model || this.route.snapshot.data['edit'];
    }

    onSubmit(entity: Customer) {
        this.isLoading = true;
        return Observable.create(obs => {
            this.customersService.updateResource(entity)
                .subscribe((res) => {
                    this.isLoading = false;
                    this.notifications.createNotification('success', 'SUCCESS', 'customers.successUpdateCustomer');
                    obs.next(res);
                }, err => {
                    console.error(err);
                    this.isLoading = false;
                    this.notifications.createNotification('error', 'ERROR', 'customers.errorUpdateCustomer');
                    obs.error(err);
                });
        });
    }

}
