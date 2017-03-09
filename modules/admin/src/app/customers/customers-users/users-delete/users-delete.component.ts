import {Component, Output, EventEmitter, Input, NgModule} from "@angular/core";
import {TranslateService} from "ng2-translate/ng2-translate";
import {Router, ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {Message} from "primeng/components/common/api";
import {CustomersService} from "../customers.service";
import {NotificationService} from "../../../services/notification-service";
import {CustomersContactsService} from "../customers-contacts.service";
import {CustomersUsersService} from "../customer-user.service";
import {Action} from "../../../shared/components/one-to-many/one-to-many.model";
import {Observable} from "rxjs";
import {Response} from "@angular/http";
import {CustomerUser} from "../../model/customer-user";
import {MessagesModule} from "primeng/components/messages/messages";
import {ButtonModule} from "primeng/components/button/button";
import {TranslateModule} from "ng2-translate";

@Component({
    selector: 'users-delete',
    templateUrl: './../../../shared/templates/delete.component.html',
    styleUrls: ['./../../../shared/styles/delete.component.scss']
})

export class UsersDeleteComponent {

    @Input('entity')
    public entity: CustomerUser = <CustomerUser>{};

    @Output('onBack')
    public _onBack: EventEmitter<Action> = new EventEmitter();

    public id: number;

    public msgs: Message[] = [];

    public isDirectiveCall: boolean = false;

    constructor(public translate: TranslateService,
                public customersUsersService: CustomersUsersService,
                public router: Router,
                public route: ActivatedRoute,
                public location: Location,
                public notifications: NotificationService) {
    }

    ngOnInit() {
        this.translate.get('customers.confirmDeleteMsg')
            .subscribe(detail => {
                this.msgs.push({severity: 'warn', detail: detail});
            });

        this.route.params.subscribe((params) => {
            this.id = +params['userId'];
        });

        this.isDirectiveCall = !(this.route.component === UsersDeleteComponent);
    }

    onBack() {
        if (this.isDirectiveCall) {
            this._onBack.emit(Action.View);
        } else {
            this.location.back();
        }
    }

    deleteResource(): Observable<Response> {
        let observableDelete: Observable<Response>;

        if (this.isDirectiveCall) {
            observableDelete = this.customersUsersService.deleteResource(this.entity);
        } else {
            observableDelete = this.customersUsersService.deleteResourceById(this.id);
        }

        return Observable.create(obs => {
            observableDelete.subscribe((res) => {
                this.notifications.createNotification('success', 'SUCCESS', 'customers.successDeleteUser');
                this.onBack();
                obs.next(res);
            }, err => {
                console.error(err);
                this.notifications.createNotification('error', 'ERROR', 'customers.errorDeleteUser');
                obs.error(err);
            });
        });
    }
}

@NgModule({
    imports: [MessagesModule, ButtonModule, TranslateModule],
    exports: [UsersDeleteComponent],
    declarations: [UsersDeleteComponent]
})
export class UsersDeleteModule {
}
