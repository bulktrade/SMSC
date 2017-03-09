import {Component, OnInit, NgModule, Input, Output, EventEmitter} from "@angular/core";
import {Location, CommonModule} from "@angular/common";
import {CustomersService} from "../../customer.service";
import {ActivatedRoute} from "@angular/router";
import {NotificationService} from "../../../services/notification-service";
import {CustomersContactsService} from "../customer-contact.service";
import {FormsModule} from "@angular/forms";
import {PanelModule} from "primeng/components/panel/panel";
import {InputTextModule} from "primeng/components/inputtext/inputtext";
import {DropdownModule} from "primeng/components/dropdown/dropdown";
import {TranslateModule} from "ng2-translate";
import {ControlErrorsModule} from "../../../shared/components/control-errors/control-errors";
import {Action} from "../../../shared/components/one-to-many/one-to-many.model";
import {Observable} from "rxjs";

@Component({
    selector: 'contacts-create',
    templateUrl: 'contacts-create.component.html'
})
export class ContactsCreateComponent implements OnInit {

    @Output('onBack')
    public _onBack: EventEmitter<Action> = new EventEmitter();

    public model: any = {};

    @Input('customerId')
    public customerId: number;

    public isDirectiveCall: boolean = false;

    public isLoading: boolean = false;

    constructor(public customersService: CustomersService,
                public route: ActivatedRoute,
                public customersContactsService: CustomersContactsService,
                public notifications: NotificationService,
                public location: Location) {
    }

    ngOnInit() {
        this.isDirectiveCall = !(this.route.component === ContactsCreateComponent);

        // get id parameter
        this.route.params.subscribe((params) => {
            this.customerId = this.isDirectiveCall ? this.customerId : +params['customerId'];
        });
    }

    onSubmit(model) {
        model['customer'] = this.customersService.getSelfLinkedEntityById(this.customerId)._links.self.href;
        this.isLoading = true;

        return Observable.create(obs => {
            this.customersContactsService.createResource(model)
                .subscribe((res) => {
                        this.onBack();
                        this.isLoading = false;
                        this.notifications.createNotification('success', 'SUCCESS', 'customers.successCreateContact');
                        obs.next(res);
                    },
                    err => {
                        console.error(err);
                        this.isLoading = false;
                        this.notifications.createNotification('error', 'ERROR', 'customers.errorCreateContact');
                        obs.error(err);
                    });
        });
    }

    onBack() {
        if (this.isDirectiveCall) {
            this._onBack.emit(Action.View);
        } else {
            this.location.back();
        }
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
        ControlErrorsModule
    ],
    exports: [ContactsCreateComponent],
    declarations: [ContactsCreateComponent]
})
export class ContactsCreateModule {
}
