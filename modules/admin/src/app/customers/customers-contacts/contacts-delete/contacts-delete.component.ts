import {Component, Output, EventEmitter, NgModule, Input} from "@angular/core";
import {TranslateService} from "ng2-translate/ng2-translate";
import {Router, ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {Message} from "primeng/components/common/api";
import {NotificationService} from "../../../services/notification-service";
import {CustomersContactsService} from "../customer-contact.service";
import {Action} from "../../../shared/components/one-to-many/one-to-many.model";
import {ButtonModule} from "primeng/components/button/button";
import {MessagesModule} from "primeng/components/messages/messages";
import {TranslateModule} from "ng2-translate";
import {Observable} from "rxjs";
import {Response} from "@angular/http";
import {Contact} from "../../model/contact";

@Component({
    selector: 'contacts-delete',
    templateUrl: './../../../shared/templates/delete.component.html',
    styleUrls: ['./../../../shared/styles/delete.component.scss']
})

export class ContactsDeleteComponent {

    @Input('entity')
    public entity: Contact = <Contact>{};

    @Output('onBack')
    public _onBack: EventEmitter<Action> = new EventEmitter();

    public id: number;

    public msgs: Message[] = [];

    public isDirectiveCall: boolean = false;

    constructor(public translate: TranslateService,
                public contactsService: CustomersContactsService,
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
            this.id = +params['contactId'];
        });

        this.isDirectiveCall = !(this.route.component === ContactsDeleteComponent);
    }

    onBack() {
        if (this.isDirectiveCall) {
            this._onBack.emit(Action.View);
        } else {
            this.location.back();
        }
    }

    deleteResource() {
        let observableDelete: Observable<Response>;

        if (this.isDirectiveCall) {
            observableDelete = this.contactsService.deleteResource(this.entity);
        } else {
            observableDelete = this.contactsService.deleteResourceById(this.id);
        }

        observableDelete.subscribe(() => {
            this.notifications.createNotification('success', 'SUCCESS', 'customers.successDeleteUser');
            this.onBack();
        }, err => {
            console.error(err);
            this.notifications.createNotification('error', 'ERROR', 'customers.errorDeleteUser');
        });
    }
}

@NgModule({
    imports: [MessagesModule, ButtonModule, TranslateModule],
    exports: [ContactsDeleteComponent],
    declarations: [ContactsDeleteComponent]
})
export class ContactsDeleteModule {
}
