import {Component, OnInit, Output, EventEmitter, Input, NgModule} from "@angular/core";
import {Location, CommonModule} from "@angular/common";
import {CustomersService} from "../../customer.service";
import {ActivatedRoute} from "@angular/router";
import {NotificationService} from "../../../services/notification-service";
import {CustomersUsersService} from "../customer-user.service";
import {Action} from "../../../shared/components/one-to-many/one-to-many.model";
import {FormsModule, NgForm} from "@angular/forms";
import {PanelModule} from "primeng/components/panel/panel";
import {InputTextModule} from "primeng/components/inputtext/inputtext";
import {DropdownModule} from "primeng/components/dropdown/dropdown";
import {TranslateModule} from "ng2-translate";
import {ControlErrorsModule} from "../../../shared/components/control-errors/control-errors.component";
import {CheckboxModule} from "primeng/components/checkbox/checkbox";
import {CustomerUser} from "../../model/customer-user";
import {ControlErrorService} from "../../../services/control-error";

@Component({
    selector: 'users-create',
    templateUrl: 'users-create.component.html'
})
export class UsersCreateComponent implements OnInit {

    @Output('onBack')
    public _onBack: EventEmitter<Action> = new EventEmitter();

    public model: any = {};

    @Input('customerId')
    public customerId: number;

    public isDirectiveCall: boolean = false;

    public isLoading: boolean = false;

    constructor(public customersService: CustomersService,
                public route: ActivatedRoute,
                public customersUsersService: CustomersUsersService,
                public notifications: NotificationService,
                public location: Location,
                public controlErrorService: ControlErrorService) {
    }

    ngOnInit() {
        this.isDirectiveCall = !(this.route.component === UsersCreateComponent);

        // get id parameter
        this.route.params.subscribe((params) => {
            this.customerId = this.isDirectiveCall ? this.customerId : params['customerId'];
        });
    }

    onSubmit(model: CustomerUser, usersForm: NgForm) {
        this.model = model;
        this.model['customer'] = this.customersService.getSelfLinkedEntityById(this.customerId)._links.self.href;
        this.toggleLoading();
        this.customersUsersService.createResource(this.model)
            .subscribe(() => {
                    this.onBack();
                    this.toggleLoading();
                    this.notifications.createNotification('success', 'SUCCESS', 'customers.successCreateUser');
                },
                (e) => {
                    this.toggleLoading();
                    this.controlErrorService.controlErrors(e.json(), usersForm);
                });
    }

    onBack() {
        if (this.isDirectiveCall) {
            this._onBack.emit(Action.View);
        } else {
            this.location.back();
        }
    }

    toggleLoading() {
        this.isLoading = !this.isLoading;
    }
}

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        PanelModule,
        InputTextModule,
        DropdownModule,
        TranslateModule,
        ControlErrorsModule,
        CheckboxModule
    ],
    exports: [UsersCreateComponent],
    declarations: [UsersCreateComponent]
})
export class UsersCreateModule {
}
