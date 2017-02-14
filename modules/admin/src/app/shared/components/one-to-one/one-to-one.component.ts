import {Component, OnInit, NgModule, ModuleWithProviders, Input, ViewEncapsulation} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {AutoCompleteModule} from "primeng/components/autocomplete/autocomplete";
import {CrudRepository} from "../../crud-repository";
import {ActivatedRoute} from "@angular/router";
import {NotificationService} from "../../../services/notification-service";
import {Link} from "../../entity.model";
import {RequestOptions, RequestMethod, Http} from "@angular/http";

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
                        <div class="titleColumns" *ngIf="!hideOwn || id != +model['id']">
                            <span class="id">{{ model['id'] }}</span>
                            <ng-container *ngFor="let item of renderProperties; let last = last;">
                                <span>{{ model[item] }}<span class="separate" *ngIf="!last">, </span></span>
                            </ng-container>
                        </div>
                    </div>
                </template>
            </p-autoComplete>
            <i *ngIf="model.hasOwnProperty('id')" class="fa fa-times btn-remove" aria-hidden="true" (click)="removeRelationship()"></i>
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

    @Input('hideOwn')
    public hideOwn: boolean = false;

    @Input('link')
    public link: Link;

    @Input()
    public model = {};

    public resources: any[] = [];

    public filteredResources: any[];

    constructor(public route: ActivatedRoute,
                public notifications: NotificationService,
                public http: Http) {
    }

    ngOnInit() {
        /** get the model resources */
        this.getResource(this.link)
            .subscribe(_model => {
                this.model = _model;
            }, err => {
                if (err.status === 404) {
                    this.model = {};
                } else {
                    console.error(err);
                    this.notifications.createNotification('success', 'SUCCESS', 'customers.successUpdate');
                }
            });

        /** get the list of resources */
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
                if (!this.hideOwn || this.id != +i['id']) {
                    this.filteredResources.push(resource);
                }
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

            let entity = {
                [this.propertyName]: event['_links'].self.href,
                _links: this.mainEntityService.getSelfLinkedEntityById(this.id)._links
            };

            this.mainEntityService.updateResource(entity)
                .subscribe(() => {
                    this.notifications.createNotification('success', 'SUCCESS', 'customers.successUpdate');
                }, err => {
                    console.error(err);
                    this.notifications.createNotification('error', 'SUCCESS', 'customers.errorUpdate');
                });
        }
    }

    removeRelationship() {
        let entity = {
            [this.propertyName]: null,
            _links: this.mainEntityService.getSelfLinkedEntityById(this.id)._links
        };

        this.mainEntityService.updateResource(entity)
            .subscribe(() => {
                this.notifications.createNotification('success', 'SUCCESS', 'customers.successUpdate');
                this.model = {};
            }, err => {
                console.error(err);
                this.notifications.createNotification('error', 'SUCCESS', 'customers.errorUpdate');
            });
    }

    /**
     * Retrieves a single resource with the given link
     * @param link
     * @returns {Observable<T>}
     */
    getResource(link: Link) {
        let requestOptions = new RequestOptions({
            method: RequestMethod.Get,
        });

        return this.http.request(link.href, requestOptions)
            .map(res => res.json())
            .share();
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
