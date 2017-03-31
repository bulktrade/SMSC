import {Component, NgModule, OnInit, forwardRef, Input, ViewEncapsulation} from "@angular/core";
import {Http, RequestMethod} from "@angular/http";
import {NotificationService} from "../../../services/notification-service";
import {FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {DropdownModule} from "primeng/components/dropdown/dropdown";
import {CrudRepository} from "../../crud-repository";
import {SelectItem} from "primeng/components/common/api";
import {Entity} from "../../entity.model";
import {HTTP_INTERCEPTOR_PROVIDER} from "../../http-interceptor";

export const ONE_TO_ONE_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => OneToOneComponent),
    multi: true
};

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'one-to-one',
    template: `<p-dropdown [options]="options" class="one-to-one-element" [filter]="true" (onChange)="onChange($event)" [(ngModel)]="value"></p-dropdown>`,
    providers: [ONE_TO_ONE_VALUE_ACCESSOR],
    styles: ['.one-to-one-element .ui-inputtext { color: #555 }']
})
export class OneToOneComponent implements OnInit, ControlValueAccessor {

    @Input() crudRepositoryA: CrudRepository<any>;

    @Input() crudRepositoryB: CrudRepository<any>;

    @Input() fields: string[] = [];

    @Input() entity: Entity = <Entity>{};

    @Input() name: string;

    @Input() hideOwn: boolean = false;

    @Input() updateResource: boolean = false;

    private _value: any;

    onModelChange: Function = () => {};

    options: SelectItem[] = [{label: '', value: null}];

    constructor(public notification: NotificationService,
                public http: Http) {
    }

    get value(): any {
        return this._value;
    }

    set value(value: any) {
        this._value = value;
        this.onModelChange(value);
    }

    writeValue(value) {
        if (value) {
            this.value = value;
        }
    }

    registerOnChange(fn) {
        this.onModelChange = fn;
    }

    registerOnTouched() {
    }

    onChange(event) {
        if (this.crudRepositoryA && this.updateResource && this.name) {
            this.entity[this.name] = event.value;
            this.crudRepositoryA.updateResource(this.entity)
                .subscribe(
                    () => this.notification.createNotification('success', 'SUCCESS', 'oneToOne.successUpdate'),
                    () => this.notification.createNotification('error', 'ERROR', 'oneToOne.errorUpdate')
                );
        }
    }

    retrieveValue() {
        if (this.name && this.entity.hasOwnProperty('_links') && this.entity['_links'].hasOwnProperty(this.name)) {
            this.http.request(this.entity._links[this.name].href, {method: RequestMethod.Get})
                .map(data => data.json())
                .subscribe(resource => {
                    this.value = resource._links.self.href;
                });
        }
    }

    retrieveOptions() {
        if (this.crudRepositoryB) {
            this.crudRepositoryB.getResources()
                .map(res => res['_embedded'][this.crudRepositoryB.repositoryName])
                .subscribe((resources: any[]) => {
                    resources.forEach(resource => {
                        // hide own resource if the id equal to the id of resource
                        if (!this.hideOwn || resource['id'] !== Number(this.entity['id'])) {
                            this.options.push({
                                label: this.getLabelByFileds(resource),
                                value: resource._links.self.href
                            });
                        }
                    });
                }, () => this.notification.createNotification('error', 'ERROR', 'oneToOne.notFound'));
        }
    }

    ngOnInit(): void {
        this.retrieveValue();
        this.retrieveOptions();
    }

    getLabelByFileds(resource: any): string {
        let _label: string = resource['id'];
        if (this.fields.length) {
            for (let i = 0; i < this.fields.length; i++) {
                _label += ` ${resource[this.fields[i]]}`;
                if (this.fields.length - 1 !== i) {
                    _label += ',';
                }
            }
        }
        return _label;
    }

}

@NgModule({
    imports: [CommonModule, FormsModule, DropdownModule],
    exports: [OneToOneComponent],
    declarations: [OneToOneComponent],
    providers: [HTTP_INTERCEPTOR_PROVIDER]
})
export class OneToOneModule {
}
