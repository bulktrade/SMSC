import { Component, Input, ModuleWithProviders, NgModule, Output, EventEmitter } from "@angular/core";
import { TranslateService, TranslateModule } from "ng2-translate/ng2-translate";
import { ActivatedRoute, Router } from "@angular/router";
import { Location, CommonModule } from "@angular/common";
import { CrudService } from "../../crud.service";
import { FormsModule } from "@angular/forms";
import { SelectItem } from "primeng/components/common/api";
import { MultipleSelectService } from "./multiple-select.service";

@Component({
    selector: 'multiple-select',
    template: require('./multiple-select.component.html'),
    styleUrls: ['./multiple-select.component.scss']
})

export class MultipleSelectComponent {
    @Input('property')
    public property: string = '';

    @Input('byProperties')
    public byProperties: string[] = [];

    @Input()
    public model = [];

    @Output()
    public modelChange = new EventEmitter();

    @Output('onAdd')
    public _onAdd = new EventEmitter();

    public items: SelectItem[] = [];

    constructor(public translate: TranslateService,
                public route: ActivatedRoute,
                public router: Router,
                public location: Location,
                public multipleSelectService: MultipleSelectService) {
    }

    ngOnInit() {
        this.model = this.multipleSelectService.getItems(this.model, this.byProperties);
        this.modelChange.emit(this.model);
    }

    /**
     * Removes the item by index
     * @param index
     */
    removeItem(index) {
        this.items.splice(index, 1);
        this.model.splice(index, 1);

        this.modelChange.emit(this.model);
    }

    /**
     * Removes all items
     */
    removeItems() {
        this.items = [];
        this.model = [];

        this.modelChange.emit(this.model);
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
