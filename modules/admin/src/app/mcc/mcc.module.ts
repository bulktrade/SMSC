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
import {DeleteResourceModule} from "../shared/components/delete-resource/delete-resource.component";
import {MCCDeleteComponent} from "./mcc-delete/mcc-delete.component";
import {HTTP_INTERCEPTOR_PROVIDER} from "../shared/http-interceptor";
import {MCCUpdateComponent} from "./mcc-update/mcc-update.component";
import {MCCUpdateResolve} from "./mcc-update/mcc-update.resolve";
import {MCCResolve} from "./mcc.resolve";
import {CubeGridModule} from "../shared/components/cube-grid/cube-grid.component";

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
        PanelModule,
        DeleteResourceModule,
        CubeGridModule
    ],
    exports: [MCCComponent],
    declarations: [
        MCCComponent,
        MCCCreateComponent,
        MCCDeleteComponent,
        MCCUpdateComponent
    ],
    providers: [
        MCCService,
        ControlErrorService,
        HTTP_INTERCEPTOR_PROVIDER,
        MCCUpdateResolve,
        MCCResolve
    ],
})
export class MCCModule {
}
