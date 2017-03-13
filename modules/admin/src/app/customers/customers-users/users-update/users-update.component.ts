import {Component, OnInit, Input, EventEmitter, Output, NgModule} from "@angular/core";
import {Location, CommonModule} from "@angular/common";
import {CustomersService} from "../../customer.service";
import {ActivatedRoute} from "@angular/router";
import {NotificationService} from "../../../services/notification-service";
import {CustomersUsersService} from "../customer-user.service";
import {CustomerUser} from "../../model/customer-user";
import {Action} from "../../../shared/components/one-to-many/one-to-many.model";
import {FormsModule, NgForm} from "@angular/forms";
import {PanelModule} from "primeng/components/panel/panel";
import {InputTextModule} from "primeng/components/inputtext/inputtext";
import {DropdownModule} from "primeng/components/dropdown/dropdown";
import {TranslateModule} from "ng2-translate";
import {ControlErrorsModule} from "../../../shared/components/control-errors/control-errors.component";
import {CheckboxModule} from "primeng/components/checkbox/checkbox";
import {ControlErrorService} from "../../../services/control-error";

@Component({
    selector: 'users-update',
    templateUrl: 'users-update.component.html'
})
export class UsersUpdateComponent implements OnInit {

    public model: CustomerUser = null;

    public userId: number;

    @Input('entity')
    public entity: CustomerUser;

    @Output('onBack')
    public _onBack: EventEmitter<Action> = new EventEmitter();

    public isDirectiveCall: boolean = false;

    public isLoading: boolean = false;

    constructor(public customersService: CustomersService,
                public route: ActivatedRoute,
                public customersUsersService: CustomersUsersService,
                public notifications: NotificationService,
                public location: Location,
                public controlErrorService: ControlErrorService
    ) {
    }

    ngOnInit() {
        this.isDirectiveCall = !(this.route.component === UsersUpdateComponent);

        // get id parameter
        this.route.params.subscribe((params) => {
            this.userId = this.isDirectiveCall ? this.userId : params['userId'];
        });

        this.model = this.isDirectiveCall ? this.entity : this.getModel();
    }

    getModel() {
        return this.model || this.route.snapshot.data['update'];
    }

    onSubmit(entity: CustomerUser, usersForm: NgForm) {
        this.toggleLoading();
        this.customersUsersService.updateResource(entity)
            .subscribe(() => {
                    this.onBack();
                    this.toggleLoading();
                    this.notifications.createNotification('success', 'SUCCESS', 'customers.successUpdateUser');
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
    exports: [UsersUpdateComponent],
    declarations: [UsersUpdateComponent]
})
export class UsersUpdateModule {
}
