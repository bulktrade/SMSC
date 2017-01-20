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
    styleUrls: [
        require('./multiple-select.component.scss')
    ],
    providers: []
})

export class MultipleSelectComponent {
    @Input('property')
    public property: any;

    @Input('model')
    public model = [];

    @Output('model')
    public modelChange = new EventEmitter();

    public items: SelectItem[] = [];

    constructor(public translate: TranslateService,
                public route: ActivatedRoute,
                public router: Router,
                public location: Location,
                public crudService: CrudService) {
    }

    ngOnInit() {
        if (this.model) {
            // create array of links and push to the model
            this.model.forEach((item, i, arr) => {
                this.items.push({
                    label: item.title,
                    value: item.link
                });
                arr[i] = item.link;
            });

            this.modelChange.emit(this.model);
        }
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
     * Navigate to the linkset component with the linkedClass & the linkedRepository params
     */
    navigateToLinkedRepository() {
        this.router.navigate([this.crudService.getCrudRootPath(), 'linkset',
            this.property.linkedClass, this.property.linkedRepository]);
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
