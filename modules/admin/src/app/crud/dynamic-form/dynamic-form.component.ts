import { Component, NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'dynamic-form',
    template: ''
})

export class DynamicFormComponent {
}

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [DynamicFormComponent],
    declarations: [DynamicFormComponent]
})
export class DynamicFormModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: DynamicFormModule,
            providers: []
        };
    }
}
