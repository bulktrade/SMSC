import {Component, Inject} from "@angular/core";
import {TranslateService} from "ng2-translate/ng2-translate";
import {ActivatedRoute, Router} from "@angular/router";
import {DOCUMENT} from "@angular/platform-browser";
import {Location} from "@angular/common";

import {Action, OneToMany} from "../../shared/components/one-to-many/one-to-many.model";
import {NotificationService} from "../../services/notification-service";
import {CustomersService} from "../customer.service";
import {ControlErrorService} from "../../services/control-error";
import {Customer} from "../model/customer";
import {CrudViewComponent} from "../../shared/components/crud-view/crud-view.component";

@Component({
    selector: 'customers-view',
    templateUrl: './customers-view.component.html',
    styleUrls: [
        './customers-view.component.scss',
        '../../shared/styles/view.component.scss'
    ]
})
export class CustomersViewComponent extends CrudViewComponent<Customer> {

    public contactsModel: OneToMany[] = [];

    public usersModel: OneToMany[] = [];

    public action = Action;

    constructor(public translate: TranslateService,
                public customersService: CustomersService,
                public router: Router,
                public route: ActivatedRoute,
                public location: Location,
                public notifications: NotificationService,
                public controlErrorService: ControlErrorService,
                @Inject(DOCUMENT) public document) {
        super(translate, route, customersService, controlErrorService, notifications, document);
    }

    onRowExpand(event) {
        this.contactsModel[event.data['id']] = new OneToMany('contacts', Action.View, null);
        this.usersModel[event.data['id']] = new OneToMany('users', Action.View, null);
    }
}
