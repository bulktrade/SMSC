import {
    Component,
    OnInit,
    NgModule,
    ModuleWithProviders,
    Input,
    Output,
    EventEmitter,
    ViewEncapsulation
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AutoCompleteModule } from "primeng/components/autocomplete/autocomplete";
import { CrudRepository } from "../../crud-repository";
import { ActivatedRoute } from "@angular/router";
import { NotificationService } from "../../../services/notification-service";

@Component({
    selector: 'one-to-one',
    encapsulation: ViewEncapsulation.None,
    template: `
        <div id="one-to-one-component">
            <p-autoComplete [ngModel]="model[subEntityService.titleColumns]" (ngModelChange)="model=$event;onSelectResource($event)"
             [suggestions]="filteredResources" (completeMethod)="filterResources($event)" [size]="30"
                [minLength]="1" [dropdown]="true" (onDropdownClick)="onDropdownClick()">
                <template let-model pTemplate="item">
                    <div class="ui-helper-clearfix">
                        <div class="titleColumns">
                            <span class="id">{{ model['id'] }}</span>
                            <ng-container *ngFor="let item of renderProperties; let last = last;">
                                <span>{{ model[item] }}<span class="separate" *ngIf="!last">, </span></span>
                            </ng-container>
                        </div>
                    </div>
                </template>
            </p-autoComplete>
            <i *ngIf="model.id" class="fa fa-times btn-remove" aria-hidden="true" (click)="removeRelationship()"></i>
        </div>
    `,
    styleUrls: ['./one-to-one.component.scss']
})
export class OneToOneComponent implements OnInit {

    @Input('mainEntityId')
    public id: number;

    // A entity service. See https://en.wikipedia.org/wiki/One-to-one_(data_model)
    @Input('mainEntityService')
    public mainEntityService: CrudRepository<any>;

    // B entity service. See https://en.wikipedia.org/wiki/One-to-one_(data_model)
    @Input('subEntityService')
    public subEntityService: CrudRepository<any>;

    @Input('propertyName')
    public propertyName: string;

    @Input('renderProperties')
    public renderProperties: string[] = [];

    @Input()
    public model;

    @Output()
    public modelChange = new EventEmitter();

    public resources: any[] = [];

    public filteredResources: any[];

    constructor(public route: ActivatedRoute,
                public notifications: NotificationService) {
    }

    ngOnInit() {
        this.model = this.model || {};

        this.subEntityService.getResources()
            .map(res => res['_embedded'][this.subEntityService.repositoryName])
            .subscribe(resources => {
                this.resources = resources;
            });
    }

    filterResources(event) {
        this.filteredResources = [];

        this.resources.forEach(i => {
            let resource = i,
                titleColumns = i[this.subEntityService.titleColumns] ? this.subEntityService.titleColumns : 'id';
            if (resource[titleColumns].toLowerCase().includes(event.query.toLowerCase())) {
                this.filteredResources.push(resource);
            }
        });
    }

    onDropdownClick() {
        this.filteredResources = [];

        this.subEntityService.getResources()
            .map(res => res['_embedded'][this.subEntityService.repositoryName])
            .subscribe(resources => {
                this.filteredResources = resources;
            });
    }

    onSelectResource(event) {
        if (typeof event === 'object') {

            this.model = event;
            this.modelChange.emit(event);

            let _selfLink = event['_links'].self.href;

            this.mainEntityService.getResource(this.id)
                .subscribe(res => {
                    res[this.propertyName] = _selfLink;

                    // delete all properties of URI
                    delete res['customerUsers'];
                    delete res['contacts'];

                    this.mainEntityService.updateResource(this.id, res)
                        .subscribe(() => {
                            this.notifications.createNotification('success', 'SUCCESS', 'customers.successUpdate');
                        }, err => {
                            console.error(err);
                            this.notifications.createNotification('error', 'SUCCESS', 'customers.errorUpdate');
                        });
                });
        }
    }

    removeRelationship() {
        this.mainEntityService.getResource(this.id)
            .subscribe(res => {
                res[this.propertyName] = null;

                this.model = null;
                this.modelChange.emit(event);

                // delete all properties of URI
                delete res['customerUsers'];
                delete res['contacts'];

                this.mainEntityService.updateResource(this.id, res)
                    .subscribe(() => {
                        this.notifications.createNotification('success', 'SUCCESS', 'customers.successUpdate');

                        this.model = {};
                    }, err => {
                        console.error(err);
                        this.notifications.createNotification('error', 'SUCCESS', 'customers.errorUpdate');
                    });
            });
    }

}

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        AutoCompleteModule
    ],
    exports: [OneToOneComponent],
    declarations: [OneToOneComponent]
})
export class OneToOneModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: OneToOneModule,
            providers: []
        };
    }
}
