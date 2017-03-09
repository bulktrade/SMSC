import {Component, Input, NgModule, Output, EventEmitter} from "@angular/core";
import {Location, CommonModule} from "@angular/common";
import {Router, ActivatedRoute, RouterModule} from "@angular/router";
import {TranslateModule} from "ng2-translate/ng2-translate";
import {FormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/components/button/button";
import {CheckboxModule} from "primeng/components/checkbox/checkbox";
import {OneToManyModule} from "../../shared/components/one-to-many/one-to-many.component";
import {ControlErrorsModule} from "../../shared/components/control-errors/control-errors.component";
import {PanelModule} from "primeng/components/panel/panel";
import {InputTextModule} from "primeng/components/inputtext/inputtext";
import {DropdownModule} from "primeng/components/dropdown/dropdown";
import {OneToOneModule} from "../../shared/components/one-to-one/one-to-one.component";
import {CustomersService} from "../customer.service";
import {ParentCustomerModule} from "../parent-customer/parent-customer";
import {OneToMany} from "../../shared/components/one-to-many/one-to-many.model";
import {TabViewModule} from "primeng/components/tabview/tabview";
import {Customer} from "../model/customer";

@Component({
    selector: 'customers-form',
    templateUrl: './customers-form.component.html',
    styleUrls: ['customers-form.component.scss']
})

export class CustomersFormComponent {
    @Input('submitButtonName')
    public submitButtonName: string;

    @Input('isLoading')
    public isLoading: boolean = false;

    @Input('model')
    public model: Customer = <Customer>{};

    @Output('onSubmit')
    public _onSubmit = new EventEmitter();

    public id: number;

    constructor(public router: Router,
                public route: ActivatedRoute,
                public location: Location,
                public customersService: CustomersService) {
    }

    ngOnInit() {
        this.id = this.route.params['value'].customerId;
    }

    onSubmit() {
        this._onSubmit.emit(this.model);
    }

    back() {
        this.location.back();
    }

    onCreate(event: OneToMany) {
        this.router.navigate(['/customers', this.id, event.propertyName, 'create']);
    }

    onUpdate(event: OneToMany) {
        this.router.navigate(['/customers', this.id, event.propertyName, 'update', event.entity['id']]);
    }

    onDelete(event: OneToMany) {
        this.router.navigate(['/customers', this.id, event.propertyName, 'delete', event.entity['id']]);
    }
}

@NgModule({
    imports: [
        CommonModule,
        CheckboxModule,
        RouterModule,
        FormsModule,
        OneToManyModule,
        TranslateModule,
        PanelModule,
        InputTextModule,
        ButtonModule,
        DropdownModule,
        ControlErrorsModule,
        OneToOneModule,
        ParentCustomerModule,
        TabViewModule
    ],
    exports: [CustomersFormComponent],
    declarations: [CustomersFormComponent]
})
export class CustomersFormModule {
}
