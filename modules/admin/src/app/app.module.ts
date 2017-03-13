import {NgModule, ApplicationRef} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {Http, HttpModule, XSRFStrategy, CookieXSRFStrategy} from "@angular/http";
import {FormsModule} from "@angular/forms";
import {AppComponent} from "./app.component";
import {AppRoutingModule} from "./app-routing.module";
import {LoginComponent} from "./login/login.component";
import {NavigationComponent} from "./navigation/navigation.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {AppState, InternalStateType} from "./app.service";
import {AuthService} from "./services/auth/auth.service";
import {TokenService} from "./services/auth/token.service";
import {AuthGuard} from "./shared/auth.guard";
import {LoadingGridService} from "./services/loading/loading-grid.service";
import {APP_RESOLVER_PROVIDERS} from "./app.resolver";
import {createNewHosts, removeNgStyles, createInputTransfer} from "@angularclass/hmr";
import {ENV_PROVIDERS} from "./environment";
import {SimpleNotificationsModule, NotificationsService} from "angular2-notifications";
import {TranslateModule, TranslateLoader, TranslateStaticLoader} from "ng2-translate";
import {SidebarComponent} from "./sidebar/sidebar.component";
import {SidebarItemComponent} from "./sidebar/sidebar-item.component";
import {ConfigService} from "./config/config.service";
import {LoadingRouterOutletService} from "./services/loading/loading-router-outlet.service";
import {LoadingService} from "./services/loading/loading.service";
import {HTTP_INTERCEPTOR_PROVIDER} from "./shared/http-interceptor";
import {NoInternetModule} from "./shared/components/no-internet/no-internet.component";
import {SharedModule} from "./shared.module";
import {GrowlService} from "./services/growl/growl.service";
import {CustomersService} from "./customers/customer.service";
import {CustomersContactsService} from "./customers/customers-contacts/customer-contact.service";
import {CustomersUsersService} from "./customers/customers-users/customer-user.service";
import {MessagesModule} from "primeng/components/messages/messages";
import {LoadingRouterOutletModule} from "./shared/components/loading-router-outlet/loading-router-outlet.component";
import {NotificationService} from "./services/notification-service";
import "../styles/styles.scss";

type StoreType = {
    state: InternalStateType,
    restoreInputValues: () => void,
    disposeOldHosts: () => void
};

export function translateFactory(http: Http, configService: ConfigService) {
    return new TranslateStaticLoader(http, configService.config.i18nPath, '.json');
}

export function _XSRFFactory() {
    return new CookieXSRFStrategy('XSRF-TOKEN', 'X-XSRF-TOKEN');
}

export const APP_PROVIDERS = [
    ...APP_RESOLVER_PROVIDERS,
    CustomersService,
    LoadingGridService,
    LoadingService,
    LoadingRouterOutletService,
    TokenService,
    AuthService,
    NotificationsService,
    NotificationService,
    AuthGuard,
    AppState,
    ConfigService,
    GrowlService,
    CustomersContactsService,
    CustomersUsersService,
    HTTP_INTERCEPTOR_PROVIDER,
    {
        provide: XSRFStrategy,
        useFactory: _XSRFFactory
    }
];

export const APP_DECLARATIONS = [
    AppComponent,
    LoginComponent,
    SidebarComponent,
    NotFoundComponent,
    NavigationComponent,
    SidebarItemComponent
];

export const APP_IMPORTS = [
    MessagesModule,
    LoadingRouterOutletModule,
    BrowserModule,
    FormsModule,
    NoInternetModule,
    HttpModule,
    AppRoutingModule,
    SimpleNotificationsModule,
    TranslateModule.forRoot({
        provide: TranslateLoader,
        useFactory: translateFactory,
        deps: [Http, ConfigService]
    })
];

@NgModule({
    bootstrap: [AppComponent],
    declarations: [APP_DECLARATIONS],
    imports: [APP_IMPORTS],
    providers: [ENV_PROVIDERS, APP_PROVIDERS]
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
