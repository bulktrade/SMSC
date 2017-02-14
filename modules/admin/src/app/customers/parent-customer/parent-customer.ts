import {Component, OnInit, NgModule, ViewEncapsulation, Input} from "@angular/core";
import {Http} from "@angular/http";
import {ActivatedRoute} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {OneToOneComponent} from "../../shared/components/one-to-one/one-to-one.component";
import {NotificationService} from "../../services/notification-service";
import {AutoCompleteModule} from "primeng/components/autocomplete/autocomplete";
import {Customer} from "../model/customer";

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'parent-customer',
    templateUrl: './../../shared/components/one-to-one/one-to-one.component.html',
    styleUrls: ['./../../shared/components/one-to-one/one-to-one.component.scss']
})
export class ParentCustomerComponent extends OneToOneComponent implements OnInit {

    @Input()
    public model: Customer = <Customer>{};

    constructor(public route: ActivatedRoute,
                public notifications: NotificationService,
                public http: Http) {
        super(route, notifications, http);
    }
}

@NgModule({
    imports: [CommonModule, FormsModule, AutoCompleteModule],
    exports: [ParentCustomerComponent],
    declarations: [ParentCustomerComponent],
})
export class ParentCustomerModule {
}

