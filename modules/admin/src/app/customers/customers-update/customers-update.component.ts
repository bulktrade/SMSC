import {Component} from "@angular/core";
import {TranslateService} from "ng2-translate/ng2-translate";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {NotificationService} from "../../services/notification-service";
import {CustomersService} from "../customer.service";
import {Customer} from "../model/customer";
import {ControlErrorService} from "../../services/control-error";
import {CustomersFormModel} from "../customers-form/customers-form.model";

@Component({
    selector: 'customers-update',
    template: `
        <customers-form [submitButtonName]="submitButtonName" [model]="model"
                    [isLoading]="isLoading" (onSubmit)="onSubmit($event)"></customers-form>
    `,
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
                public notifications: NotificationService,
                public controlErrorService: ControlErrorService) {
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

    onSubmit(customersFormModel: CustomersFormModel) {
        this.toggleLoading();
        this.customersService.updateResource(customersFormModel.model)
            .subscribe(() => {
                this.toggleLoading();
                this.notifications.createNotification('success', 'SUCCESS', 'customers.successUpdateCustomer');
            }, (e) => {
                this.toggleLoading();
                this.controlErrorService.controlErrors(e.json(), customersFormModel.customersForm);
            });
    }

    toggleLoading() {
        this.isLoading = !this.isLoading;
    }
}
