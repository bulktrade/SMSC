import { Component, OnInit, NgModule, ModuleWithProviders, Input, Output, EventEmitter } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AutoCompleteModule } from "primeng/components/autocomplete/autocomplete";
import { CrudRepository } from "../../interfaces/crud-repository";

@Component({
    selector: 'one-to-one',
    templateUrl: `
        <p-autoComplete [ngModel]="model" (ngModelChange)="model=$event[crudRepository.titleColumns];onSelectResource($event)"
         [suggestions]="filteredResources" (completeMethod)="filterResources($event)" [size]="30"
            [minLength]="1" [dropdown]="true" (onDropdownClick)="handleDropdownClick($event)">
            <template let-model pTemplate="item">
                <div class="ui-helper-clearfix">
                    <div class="titleColumns">{{ model[crudRepository.titleColumns] || model['id'] }}</div>
                </div>
            </template>
        </p-autoComplete>
    `
})
export class OneToOneComponent implements OnInit {

    @Input('crudRepository')
    public crudRepository: CrudRepository;

    @Input('propertyName')
    public propertyName: string;

    @Input()
    public model;

    @Output()
    public modelChange = new EventEmitter();

    public resources: any[] = [];

    public filteredResources: any[];

    constructor() {
    }

    ngOnInit() {
        this.crudRepository.getResources()
            .map(res => res['_embedded'][this.crudRepository.repositoryName])
            .subscribe(resources => {
                this.resources = resources;
            });
    }

    filterResources(event) {
        this.filteredResources = [];

        this.resources.forEach(i => {
            let resource = i,
                titleColumns = i[this.crudRepository.titleColumns] ? this.crudRepository.titleColumns : 'id';

            if (resource[titleColumns].toLowerCase().includes(event.query.toLowerCase())) {
                this.filteredResources.push(resource);
            }
        })
    }

    handleDropdownClick() {
        this.filteredResources = [];

        //mimic remote call
        setTimeout(() => {
            this.filteredResources = this.resources;
        }, 100)
    }

    onSelectResource(event) {
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
