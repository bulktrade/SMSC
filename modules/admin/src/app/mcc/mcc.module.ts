import {
    ButtonModule,
    DataTableModule,
    DialogModule,
    DropdownModule,
    InputTextModule,
    MessagesModule,
    PaginatorModule,
    PanelModule,
    SharedModule,
    TabViewModule
} from "primeng/primeng";
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {TranslateModule} from "ng2-translate";

import {MCCRoutingModule} from "./mcc-routing.module";
import {MCCComponent} from "./mcc.component";
import {MCCService} from "./mcc.service";
import {MCCCreateComponent} from "./mcc-create/mcc-create.component";
import {ControlErrorService} from "../services/control-error";
import {ControlErrorsModule} from "../shared/components/control-errors/control-errors.component";

@NgModule({
    imports: [
        MCCRoutingModule,
        TabViewModule,
        DialogModule,
        PaginatorModule,
        DataTableModule,
        DropdownModule,
        ButtonModule,
        SharedModule,
        MessagesModule,
        FormsModule,
        CommonModule,
        TranslateModule,
        InputTextModule,
        ControlErrorsModule,
        PanelModule
    ],
    exports: [MCCComponent],
    declarations: [
        MCCComponent,
        MCCCreateComponent
    ],
    providers: [MCCService, ControlErrorService],
})
export class MCCModule {
}
