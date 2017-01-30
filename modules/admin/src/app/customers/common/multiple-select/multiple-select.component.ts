import { Component, Input, ModuleWithProviders, NgModule, Output, EventEmitter } from "@angular/core";
import { TranslateService, TranslateModule } from "ng2-translate/ng2-translate";
import { ActivatedRoute, Router } from "@angular/router";
import { Location, CommonModule } from "@angular/common";
import { CrudService } from "../../crud.service";
import { FormsModule } from "@angular/forms";
import { SelectItem } from "primeng/components/common/api";

@Component({
    selector: 'multiple-select',
    template: require('./multiple-select.component.html'),
    styleUrls: ['./multiple-select.component.scss']
})

export class MultipleSelectComponent {
    @Input('property')
    public property: any;

    @Input('model')
    public propertyModel = [];

    @Output('model')
    public propertyModelChange = new EventEmitter();

    @Output('onAdd')
    public _onAdd = new EventEmitter();

    public items: SelectItem[] = [];

    constructor(public translate: TranslateService,
                public route: ActivatedRoute,
                public router: Router,
                public location: Location) {
    }

    ngOnInit() {
        if (this.propertyModel) {
            // create array of links and push to the propertyModel

            switch (this.property.type) {
                case 'Linkset':
                    this.propertyModel.forEach((item, i, arr) => {
                        this.items.push({
                            label: item.label,
                            value: item.value
                        });
                        arr[i] = item.value;
                    });
                    break;

                case 'Link':
                    this.items.push({
                        label: this.propertyModel['label'],
                        value: this.propertyModel['value']
                    });

                    this.propertyModel = this.propertyModel['value'];
                    break;

                default:
                    break;
            }

            this.propertyModelChange.emit(this.propertyModel);
        }
    }

    /**
     * Removes the item by index
     * @param index
     */
    removeItem(index) {
        this.items.splice(index, 1);
        this.propertyModel.splice(index, 1);

        this.propertyModelChange.emit(this.propertyModel);
    }

    /**
     * Removes all items
     */
    removeItems() {
        this.items = [];
        this.propertyModel = [];

        this.propertyModelChange.emit(this.propertyModel);
    }

    /**
     * Calls when click on the add button
     */
    onAdd() {
        this._onAdd.emit(this.property);
    }

}

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TranslateModule
    ],
    exports: [MultipleSelectComponent],
    declarations: [MultipleSelectComponent]
})
export class MultipleSelectModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: MultipleSelectModule,
            providers: []
        };
    }
}
