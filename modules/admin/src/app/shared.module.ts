import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "ng2-translate";
import { CrudService } from "./crud/crud.service";

@NgModule({
    imports: [
        CommonModule,
        TranslateModule
    ],
    exports: [
        CommonModule,
        TranslateModule
    ],
    providers: []
})
export class SharedModule {

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule
        };
    }
}
