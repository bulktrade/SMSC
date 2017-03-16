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
    template: `
    <div id="one-to-one-component" class="parent-customer">
        <p-autoComplete [ngModel]="getModelBySchema(model)" (ngModelChange)="onSelectResource($event)"
                        [suggestions]="filteredResources" (completeMethod)="filterResources($event)" [size]="30"
                         styleClass="ui-sm-12 ui-md-12 ui-g-nopad" [minLength]="1" [dropdown]="true" (onDropdownClick)="onDropdownClick()">
            <template let-model pTemplate="item">
                <div class="ui-helper-clearfix">
                    {{ getModelBySchema(model) }}
                </div>
            </template>
        </p-autoComplete>
        <i *ngIf="model.hasOwnProperty('id')" class="fa fa-times btn-remove" aria-hidden="true" (click)="removeRelationship()"></i>
    </div>
    `,
    styles: [`
        #one-to-one-component {position: relative;padding-top:7px;}
        p-autoComplete {display: block;}
        #one-to-one-component .ui-button {height: 34px;}
        #one-to-one-component .btn-remove:hover {color: #d04242;}
        #one-to-one-component .btn-remove {
            top: 14px;
            right: 39px;
            color: #929292;
            cursor: pointer;
            position: absolute;
        }
    `]
})
export class ParentCustomerComponent extends OneToOneComponent implements OnInit {

    @Input()
    public model: Customer = <Customer>{};

    constructor(public route: ActivatedRoute,
                public notifications: NotificationService,
                public http: Http) {
        super(route, notifications, http);
    }

    filterResources(event) {
        this.filteredResources = [];
        this.resources.forEach(i => {
            let resource = i;
            if (resource['companyName'].toLowerCase().includes(event.query.toLowerCase()) ||
                String(resource['id']).includes(event.query)) {
                if (!this.hideOwn || this.id != +i['id']) {
                    this.filteredResources.push(resource);
                }
            }
        });
    }
}

@NgModule({
    imports: [CommonModule, FormsModule, AutoCompleteModule],
    exports: [ParentCustomerComponent],
    declarations: [ParentCustomerComponent],
})
export class ParentCustomerModule {
}

