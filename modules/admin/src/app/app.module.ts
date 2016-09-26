import { NgModule, ApplicationRef } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { Http, HttpModule } from "@angular/http";
import { FormsModule } from "@angular/forms";
import { App } from "./app.component";
import { Breadcrumb } from "./breadcrumb/breadcrumb.component";
import { ROUTES } from "./app.routes";
import { Login } from "./login/login.component";
import { Navigation } from "./navigation/navigation.component";
import { Customers } from "./customers/customers.components";
import { NotFound } from "./notFound/notFound.component";
import { CrudMetaFormData } from "./crudMetadata/crudMetaFormData/crudMetaFormData.component";
import { CrudMetaData } from "./crudMetadata/crudMetaData.components";
import { CrudClassMetaData } from "./crudMetadata/crudClassMetaData/crudClassMetaData.component";
import { CrudMetaGridData } from "./crudMetadata/crudMetaGridData/crudMetaGridData.component";
import { RouterModule } from "@angular/router";
import { AppState } from "./app.service";
import { COMMON_PROVIDERS } from "./common";
import { AuthService } from "./services/auth/auth.service";
import { TokenService } from "./services/auth/token.service";
import { CrudService } from "./crud/crud.service";
import { AuthGuard } from "./common/authGuard";
import { NotificationService } from "./services/notificationService";
import { LoadingGridService } from "./services/loading/loadingGrid.service";
import { APP_RESOLVER_PROVIDERS } from "./app.resolver";
import { createNewHosts, removeNgStyles } from "@angularclass/hmr";
import { ENV_PROVIDERS } from "./environment";
import { MdModule } from "./md.module";
import { SimpleNotificationsModule } from "angular2-notifications";
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from "ng2-translate";
import { Ng2BootstrapModule } from "ng2-bootstrap";
import { GridService } from "./services/grid.service";
import { Sidebar } from "./sidebar/sidebar.component";
import { SidebarItem } from "./sidebar/sidebaritem.component";
import { CrudViewResolve } from "./crud/crudView/crud.view.resolve";
import { CrudModule } from "./crud/crud.module";
import { LoadingRouterOutletModule } from "./common/loadingRouterOutlet";
import { ConfigService } from "./config/configService";
import { LoadingRouterOutletService } from "./services/loading/loadingRouterOutlet.service";
import { LoadingService } from "./services/loading/loading.service";
import { RouterOutletService } from "./services/routerOutletService";
import { MetaDataPropertyBindingParameter } from "./crudMetadata/metaDataBindingParameter/metaDataBindingParameter";
import { DragulaModule } from "ng2-dragula/ng2-dragula";
import { DashboardsComponent } from "./dashboards/dashboards.components";
import { DashboardCrudCreateResolve } from "./dashboards/crud/dashboard.crud.create.resolve";
import { DashboardCrudUpdateResolve } from "./dashboards/crud/dashboard.crud.update.resolve";
import { OrderBy } from "./dashboards/sorts/orderby";
import { Dashboard } from "./dashboards/dashboard.component";
import { DashboardBoxComponent } from "./dashboards/dashboard.box.component";
import { DashboardView } from "./dashboards/dashboard.view.component";
import { DashboardCrudUpdate } from "./dashboards/crud/dashboard.box.update";
import { DashboardCrudCreate } from "./dashboards/crud/dashboard.box.create";
import { MdSelectModule } from "./common/material/select/select";
import { MultipleSelectModule } from "./crud/directives/multipleSelect/multipleSelect.component";
import { DynamicFormModule } from "./dynamicForm/dynamic.form";
import { DashboardService } from "./dashboards/dashboardService";
import { SidebarService } from "./sidebar/sidebarService";

export const APP_PROVIDERS = [
    ...APP_RESOLVER_PROVIDERS,
    ...COMMON_PROVIDERS,
    LoadingGridService,
    LoadingService,
    LoadingRouterOutletService,
    CrudService,
    RouterOutletService,
    GridService,
    TokenService,
    AuthService,
    CrudViewResolve,
    NotificationService,
    AuthGuard,
    AppState,
    DashboardCrudUpdateResolve,
    DashboardCrudCreateResolve,
    DashboardService,
    SidebarService
];

@NgModule({
    bootstrap: [App],
    declarations: [
        Sidebar,
        SidebarItem,
        App,
        Login,
        Navigation,
        Customers,
        NotFound,
        Breadcrumb,
        CrudMetaData,
        CrudMetaFormData,
        CrudClassMetaData,
        CrudMetaGridData,
        MetaDataPropertyBindingParameter,
        OrderBy,
        Dashboard,
        DashboardsComponent,
        DashboardView,
        DashboardBoxComponent,
        DashboardCrudUpdate,
        DashboardCrudCreate
    ],
    imports: [
        LoadingRouterOutletModule,
        Ng2BootstrapModule,
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot(ROUTES, { useHash: false }),
        MdModule.forRoot(),
        TranslateModule.forRoot({
            provide: TranslateLoader,
            useFactory: (http: Http, configService: ConfigService) => {
                return new TranslateStaticLoader(http, configService.config.i18nPath, '.json');
            },
            deps: [Http, ConfigService]
        }),
        SimpleNotificationsModule,
        CrudModule.forRoot(),
        DragulaModule,
        MdSelectModule,
        MultipleSelectModule,
        DynamicFormModule
    ],
    providers: [
        ConfigService,
        ENV_PROVIDERS,
        APP_PROVIDERS
    ]
})
export class AppModule {
    constructor(public appRef: ApplicationRef, public appState: AppState) {
    }

    hmrOnInit(store) {
        if (!store || !store.state) return;
        console.log('HMR store', store);
        this.appState._state = store.state;
        this.appRef.tick();
        delete store.state;
    }

    hmrOnDestroy(store) {
        const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
        // recreate elements
        const state = this.appState._state;
        store.state = state;
        store.disposeOldHosts = createNewHosts(cmpLocation);
        // remove styles
        removeNgStyles();
    }

    hmrAfterDestroy(store) {
        // display new elements
        store.disposeOldHosts();
        delete store.disposeOldHosts;
    }
}
