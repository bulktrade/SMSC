import { NgModule, ApplicationRef } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { Http, HttpModule, XHRBackend, RequestOptions } from "@angular/http";
import { FormsModule } from "@angular/forms";
import { App } from "./app.component";
import { BreadcrumbModule } from "./breadcrumb/breadcrumb.component";
import { AppRoutingModule } from "./app-routing.module";
import { LoginComponent } from "./login/login.component";
import { NavigationComponent } from "./navigation/navigation.component";
import { NotFoundComponent } from "./not-found/not-found.component";
// import { CrudMetaDataComponent } from "./crud-meta-data/crud-meta-data.components";
import { Router } from "@angular/router";
import { AppState, InternalStateType } from "./app.service";
import { COMMON_PROVIDERS } from "./common";
import { AuthService } from "./services/auth/auth.service";
import { TokenService } from "./services/auth/token.service";
// import { CrudService } from "./crud/crud.service";
import { AuthGuard } from "./common/auth.guard";
import { NotificationService } from "./services/notification-service";
import { LoadingGridService } from "./services/loading/loading-grid.service";
import { APP_RESOLVER_PROVIDERS } from "./app.resolver";
import { createNewHosts, removeNgStyles, createInputTransfer } from "@angularclass/hmr";
import { ENV_PROVIDERS } from "./environment";
import { SimpleNotificationsModule } from "angular2-notifications";
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from "ng2-translate";
import { Ng2BootstrapModule } from "ng2-bootstrap";
import { GridService } from "./services/grid.service";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { SidebarItemComponent } from "./sidebar/sidebar-item.component";
import { LoadingRouterOutletModule } from "./common/loading-router-outlet.component";
import { ConfigService } from "./config/config.service";
import { LoadingRouterOutletService } from "./services/loading/loading-router-outlet.service";
import { LoadingService } from "./services/loading/loading.service";
import { RouterOutletService } from "./services/router-outlet-service";
import { MetaDataPropertyBindingParameterComponent } from "./crud-meta-data/binding-parameter/binding-parameter.component";
import { SidebarService } from "./sidebar/sidebar.service";
// import { DashboardModule } from "./dashboard/dashboard.module";
import { HttpInterceptor } from "./common/http-interceptor";
import { NoInternetModule } from "./common/no-internet/no-internet.component";
// import { CrudMetaFormDataComponent } from "./crud-meta-data/crud-meta-form-data/crud-meta-form-data.component";
// import { CrudClassMetaDataComponent } from "./crud-meta-data/crud-class-meta-data/crud-class-meta-data.component";
// import { CrudMetaGridDataComponent } from "./crud-meta-data/crud-meta-grid-data/crud-meta-grid-data.component";
import { SharedModule } from "./shared.module";
// import { CrudModule } from "./crud/crud.module";
import { GrowlService } from "./services/growl/growl.service";
import { URIHandlingService } from "./services/uri-handling";
// import { CrudLevelService } from "./crud/services/crud-level";
import { CustomersService } from "./customers/customers.service";
import { CustomersContactsService } from "./customers/customers-contacts/customers-contacts.service";
import { CustomersUsersService } from "./customers/customers-users/customers-users.service";

type StoreType = {
    state: InternalStateType,
    restoreInputValues: () => void,
    disposeOldHosts: () => void
};

export const APP_PROVIDERS = [
    ...APP_RESOLVER_PROVIDERS,
    ...COMMON_PROVIDERS,
    CustomersService,
    LoadingGridService,
    LoadingService,
    LoadingRouterOutletService,
    RouterOutletService,
    GridService,
    TokenService,
    AuthService,
    NotificationService,
    AuthGuard,
    AppState,
    SidebarService,
    CustomersContactsService,
    CustomersUsersService,
    {
        provide: Http,
        useFactory: (xhrBackend: XHRBackend, requestOptions: RequestOptions, router: Router) =>
            new HttpInterceptor(xhrBackend, requestOptions, router),
        deps: [XHRBackend, RequestOptions, Router]
    }
];

@NgModule({
    bootstrap: [App],
    declarations: [
        SidebarComponent,
        SidebarItemComponent,
        App,
        LoginComponent,
        NavigationComponent,
        NotFoundComponent,
        // // CrudMetaDataComponent,
        // // CrudMetaFormDataComponent,
        // // CrudClassMetaDataComponent,
        // // CrudMetaGridDataComponent,
        MetaDataPropertyBindingParameterComponent,
    ],
    imports: [
        LoadingRouterOutletModule,
        Ng2BootstrapModule,
        BrowserModule,
        FormsModule,
        NoInternetModule,
        HttpModule,
        AppRoutingModule,
        TranslateModule.forRoot({
            provide: TranslateLoader,
            useFactory: (http: Http, configService: ConfigService) => {
                return new TranslateStaticLoader(http, configService.config.i18nPath, '.json');
            },
            deps: [Http, ConfigService]
        }),
        SharedModule.forRoot(),
        SimpleNotificationsModule,
        // CrudModule,
        // DashboardModule,
        BreadcrumbModule.forRoot()
    ],
    providers: [
        // CrudLevelService,
        // CrudService,
        ConfigService,
        GrowlService,
        URIHandlingService,
        ENV_PROVIDERS,
        APP_PROVIDERS
    ]
})
export class AppModule {
    constructor(public appRef: ApplicationRef,
                public appState: AppState) {
    }

    public hmrOnInit(store: StoreType) {
        if (!store || !store.state) {
            return;
        }
        console.log('HMR store', JSON.stringify(store, null, 2));
        // set state
        this.appState._state = store.state;
        // set input values
        if ('restoreInputValues' in store) {
            let restoreInputValues = store.restoreInputValues;
            setTimeout(restoreInputValues);
        }

        this.appRef.tick();
        delete store.state;
        delete store.restoreInputValues;
    }

    public hmrOnDestroy(store: StoreType) {
        const cmpLocation = this.appRef.components.map((cmp) => cmp.location.nativeElement);
        // save state
        const state = this.appState._state;
        store.state = state;
        // recreate root elements
        store.disposeOldHosts = createNewHosts(cmpLocation);
        // save input values
        store.restoreInputValues = createInputTransfer();
        // remove styles
        removeNgStyles();
    }

    public hmrAfterDestroy(store: StoreType) {
        // display new elements
        store.disposeOldHosts();
        delete store.disposeOldHosts;
    }
}
