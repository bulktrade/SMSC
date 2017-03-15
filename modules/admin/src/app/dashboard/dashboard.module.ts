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
import {DashboardsComponent} from "./dashboards/dashboards.component";
import {DashboardsResolve} from "./dashboards/dashboards.resolve";
import {DataScrollerModule} from "primeng/components/datascroller/datascroller";

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
        DataScrollerModule
    ],
    exports: [DashboardComponent],
    declarations: [
        DashboardComponent,
        DashboardCreateComponent,
        DashboardUpdateComponent,
        DashboardDeleteComponent,
        DashboardsComponent
    ],
    providers: [
        ControlErrorService,
        NotificationService,
        DashboardResolve,
        DashboardsResolve,
        DashboardUpdateResolve,
        HTTP_INTERCEPTOR_PROVIDER
    ],
})
export class DashboardModule {
}
