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
import { Dashboard } from "./dashboard/dashboard.component";
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
import { LoadingGridService } from "./services/loadingGrid.service";
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

const APP_PROVIDERS = [
    ...APP_RESOLVER_PROVIDERS,
    ...COMMON_PROVIDERS,
    LoadingGridService,
    CrudService,
    GridService,
    TokenService,
    AuthService,
    CrudViewResolve,
    NotificationService,
    AuthGuard,
    // DashboardGuard, @todo not yet implemented? No needs?
    AppState,
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
        Dashboard,
        Breadcrumb,
        CrudMetaData,
        CrudMetaFormData,
        CrudClassMetaData,
        CrudMetaGridData
    ],
    imports: [
        Ng2BootstrapModule,
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot(ROUTES, { useHash: false }),
        MdModule.forRoot(),
        TranslateModule.forRoot({
            provide: TranslateLoader,
            useFactory: (http: Http) => new TranslateStaticLoader(http, (typeof PUBLIC_PATH !== 'undefined' ? PUBLIC_PATH : '') + 'assets/i18n', '.json'),
            deps: [Http]
        }),
        SimpleNotificationsModule,
        CrudModule.forRoot()
    ],
    providers: [
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
