import {Component, OnInit, NgModule, Input} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {RequestOptions, RequestMethod, Http} from "@angular/http";
import {CrudRepository} from "../../crud-repository";
import {Link} from "../../entity.model";
import {NotificationService} from "../../../services/notification-service";
import {Observable} from "rxjs";

@Component({
    selector: 'one-to-one',
    template: '',
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
                    this.notifications.createNotification('error', 'ERROR', 'customers.errorUpdate');
                }
            });

        /** get the list of resources */
        this.subEntityService.getResources()
        .map(res => res['_embedded'][this.subEntityService.repositoryName])
            .subscribe(resources => {
                this.resources = resources;
            }, err => {
                this.notifications.createNotification('error', 'ERROR', 'customers.notFound');
            });
    }

    filterResources(event) {
        this.filteredResources = [];
        this.resources.forEach(i => {
            let resource = i,
                titleColumns = i[this.subEntityService.titleColumns] ? this.subEntityService.titleColumns : 'id';
            if (resource[titleColumns].toLowerCase().includes(event.query.toLowerCase()) ||
                String(resource['id']).includes(event.query)) {
                if (!this.hideOwn || this.id != +i['id']) {
                    this.filteredResources.push(resource);
                }
            }
        });
    }

    onDropdownClick() {
        this.filteredResources = [];
        return this.subEntityService.getResources()
            .map(res => res['_embedded'][this.subEntityService.repositoryName])
            .map(resources => {
                resources.forEach(resource => {
                    if (!this.hideOwn || this.id != +resource['id']) {
                        this.filteredResources.push(resource);
                    }
                });
                return this.filteredResources;
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
                .subscribe((res) => {
                    this.notifications.createNotification('success', 'SUCCESS', 'customers.successUpdate');
                }, err => {
                    this.notifications.createNotification('error', 'ERROR', 'customers.errorUpdate');
                });
        } else {
            return Observable.empty();
        }
    }

    removeRelationship() {
        let entity = {
            [this.propertyName]: null,
            _links: this.mainEntityService.getSelfLinkedEntityById(this.id)._links
        };

        this.mainEntityService.updateResource(entity)
            .subscribe((res) => {
                this.notifications.createNotification('success', 'SUCCESS', 'customers.successUpdate');
                this.model = {};
            }, err => {
                this.notifications.createNotification('error', 'ERROR', 'customers.errorUpdate');
            });
    }

    getModelBySchema(model) {
        let result: string = '';

        if (Object.keys(model).length) {
            result = `${model['id']} `;

            this.renderProperties.forEach((item, i) => {
                result += model[item];

                if (i !== this.renderProperties.length - 1) {
                    result += ', '
                }
            });

            return result;
        } else {
            return result;
        }
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
    exports: [OneToOneComponent],
    declarations: [OneToOneComponent]
})
export class OneToOneModule {
}
