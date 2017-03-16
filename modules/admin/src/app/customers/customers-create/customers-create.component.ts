import {Component} from "@angular/core";
import {TranslateService} from "ng2-translate/ng2-translate";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {NotificationService} from "../../services/notification-service";
import {CustomersService} from "../customer.service";
import {Customer} from "../model/customer";
import {CustomersFormModel} from "../customers-form/customers-form.model";
import {ControlErrorService} from "../../services/control-error";

@Component({
    selector: 'customers-create',
    template: `
        <customers-form [submitButtonName]="submitButtonName"
                    (onSubmit)="onSubmit($event)"></customers-form>
    `,
    providers: [Location]
})
export class CustomersCreateComponent {

    public submitButtonName: string = 'customers.create';

    public isLoading: boolean = false;

    constructor(public translate: TranslateService,
                public customersService: CustomersService,
                public route: ActivatedRoute,
                public router: Router,
                public location: Location,
                public notifications: NotificationService,
                public controlErrorService: ControlErrorService) {
    }

    onSubmit(customersFormModel: CustomersFormModel) {
        this.toggleLoading();
        this.customersService.createResource(customersFormModel.model)
            .subscribe((customer: Customer) => {
                this.toggleLoading();
                this.notifications.createNotification('success', 'SUCCESS', 'customers.successCreateCustomer');
                this.router.navigate(['/customers', customer['id'], 'update']);
            }, (e) => {
                this.toggleLoading();
                this.controlErrorService.formControlErrors(e.json(), customersFormModel.customersForm);
            });
    }

    toggleLoading() {
        this.isLoading = !this.isLoading;
    }
}
