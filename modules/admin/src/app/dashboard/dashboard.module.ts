import {NgModule} from "@angular/core";
import {DashboardComponent} from "./dashboard.component";
import {DashboardRoutingModule} from "./dashboard-routing.module";
import {DashboardResolve} from "./dashboard.resolve";
import {HTTP_INTERCEPTOR_PROVIDER} from "../shared/http-interceptor";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {TranslateModule} from "ng2-translate";
import {PanelModule} from "primeng/components/panel/panel";
import {InputTextModule} from "primeng/components/inputtext/inputtext";
import {ButtonModule} from "primeng/components/button/button";
import {DropdownModule} from "primeng/components/dropdown/dropdown";
import {ControlErrorsModule} from "../shared/components/control-errors/control-errors.component";
import {OneToOneModule} from "../shared/components/one-to-one/one-to-one.component";
import {DashboardCreateComponent} from "./dashboard-create/dashboard-create.component";
import {CommonModule} from "@angular/common";
import {NotificationService} from "../services/notification-service";
import {ControlErrorService} from "../services/control-error";
import {SplitButtonModule} from "primeng/components/splitbutton/splitbutton";
import {DashboardUpdateComponent} from "./dashboard-update/dashboard-update.component";
import {DashboardUpdateResolve} from "./dashboard-update/dashboard-update.resolve";
import {DashboardDeleteComponent} from "./dashboard-delete/dashboard-delete.component";
import {MessagesModule} from "primeng/components/messages/messages";
import {DashboardSettingsComponent} from "./dashboard-settings/dashboard-settings.component";
import {DashboardSettingsResolve} from "./dashboard-settings/dashboard-settings.resolve";
import {DashboardBoxService} from "./dashboard-box/dashboard-box.service";
import {DashboardBoxComponent} from "./dashboard-box/dashboard-box.component";
import {DashboardBoxTypeService} from "./dashboard-box-type/dashboard-box-type.service";
import {ChartModule} from "primeng/components/chart/chart";
import {DragulaModule} from "ng2-dragula";
import {DashboardBoxDeleteComponent} from "./dashboard-box/dashboard-box-delete/dashboard-box-delete.component";
import {DashboardBoxUpdateComponent} from "./dashboard-box/dashboard-box-update/dashboard-box-update.component";
import {DialogModule} from "primeng/components/dialog/dialog";
import {DashboardBoxCreateComponent} from "./dashboard-box/dashboard-box-create/dashboard-box-create.component";
import {DataGridModule} from "primeng/components/datagrid/datagrid";
import {TabViewModule} from "primeng/components/tabview/tabview";
import {DashboardBoxTypeCreateComponent} from "./dashboard-box-type/dashboard-box-type-create/dashboard-box-type-create.component";
import {DashboardBoxTypeUpdateResolve} from "./dashboard-box-type/dashboard-box-type-update/dashboard-box-type-update.resolve";
import {DashboardBoxTypeUpdateComponent} from "./dashboard-box-type/dashboard-box-type-update/dashboard-box-type-update.component";
import {DashboardBoxTypeDeleteComponent} from "./dashboard-box-type/dashboard-box-type-delete/dashboard-box-type-delete.component";

@NgModule({
    imports: [
        DashboardRoutingModule,
        CommonModule,
        RouterModule,
        FormsModule,
        TranslateModule,
        PanelModule,
        InputTextModule,
        ButtonModule,
        DropdownModule,
        ControlErrorsModule,
        OneToOneModule,
        SplitButtonModule,
        MessagesModule,
        ChartModule,
        DragulaModule,
        DialogModule,
        DataGridModule,
        TabViewModule
    ],
    exports: [DashboardComponent],
    declarations: [
        DashboardComponent,
        DashboardCreateComponent,
        DashboardUpdateComponent,
        DashboardDeleteComponent,
        DashboardBoxComponent,
        DashboardSettingsComponent,
        DashboardBoxDeleteComponent,
        DashboardBoxUpdateComponent,
        DashboardBoxCreateComponent,
        DashboardBoxTypeCreateComponent,
        DashboardBoxTypeUpdateComponent,
        DashboardBoxTypeDeleteComponent
    ],
    providers: [
        ControlErrorService,
        NotificationService,
        DashboardResolve,
        DashboardSettingsResolve,
        DashboardBoxTypeUpdateResolve,
        DashboardUpdateResolve,
        DashboardBoxService,
        DashboardBoxTypeService,
        HTTP_INTERCEPTOR_PROVIDER
    ],
})
export class DashboardModule {
}
