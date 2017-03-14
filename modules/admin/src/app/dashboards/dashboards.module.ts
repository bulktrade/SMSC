import {NgModule} from "@angular/core";
import {DashboardsComponent} from "./dashboards.component";
import {DashboardsRoutingModule} from "./dashboards-routing.module";
import {DashboardService} from "./dashboard.service";
import {DashboardsResolve} from "./dashboards.resolve";
import {HTTP_INTERCEPTOR_PROVIDER} from "../shared/http-interceptor";
import {UserService} from "../users/user.service";
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

@NgModule({
    imports: [
        DashboardsRoutingModule,
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
    ],
    exports: [DashboardsComponent],
    declarations: [
        DashboardsComponent,
        DashboardCreateComponent
    ],
    providers: [
        DashboardService,
        UserService,
        ControlErrorService,
        NotificationService,
        DashboardsResolve,
        HTTP_INTERCEPTOR_PROVIDER
    ],
})
export class DashboardsModule {
}
