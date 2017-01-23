import { NgModule, ModuleWithProviders } from '@angular/core';
import { MdSelectModule } from '../../../common/material/select/select.component';
import { DropdownModule } from 'primeng/components/dropdown/dropdown';
import { TranslateModule } from 'ng2-translate';
import { GridPaginationComponent } from './grid-pagination.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/components/button/button";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ButtonModule,
        MdSelectModule,
        DropdownModule,
        TranslateModule
    ],
    exports: [GridPaginationComponent],
    declarations: [GridPaginationComponent]
})
export class GridPaginationModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: GridPaginationModule,
            providers: []
        };
    }
}