import { Component, Input, ModuleWithProviders, NgModule } from "@angular/core";
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
    @Input('property') public property: any;

    public requiredSymb = ' ';
    public items: SelectItem[] = [
        { label: 'Admin', value: 'http://......' },
        { label: 'User', value: 'http://......' },
    ];

    constructor(public translate: TranslateService,
                public route: ActivatedRoute,
                public router: Router,
                public location: Location,
                public crudService: CrudService) {
    }

    removeItem(index) {
        this.items.splice(index, 1);
    }

    ngOnInit() {
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
