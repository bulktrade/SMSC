import { Component, OnInit, NgModule, ModuleWithProviders, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AutoCompleteModule } from "primeng/components/autocomplete/autocomplete";
import { CrudRepository } from "../../interfaces/crud-repository";

@Component({
    selector: 'one-to-one',
    templateUrl: ''
})
export class OneToOneComponent implements OnInit {

    @Input('crudRepository')
    public crudRepository: CrudRepository;

    constructor() {
    }

    ngOnInit() {
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
