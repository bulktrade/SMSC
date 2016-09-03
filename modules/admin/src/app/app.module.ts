import { NgModule, ApplicationRef } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpModule, Http } from "@angular/http";
import { FormsModule } from "@angular/forms";
import { App } from "./app.component";
import { ROUTES } from "./app.routes";
import { NotFound } from "./notFound/notFound.component";
import { RouterModule } from "@angular/router";
import { AppState } from "./app.service";
import { COMMON_PROVIDERS } from "./common";
import { APP_RESOLVER_PROVIDERS } from "./app.resolver";
import { createNewHosts, removeNgStyles } from "@angularclass/hmr";
import { ENV_PROVIDERS } from "./environment";
import { MdModule } from "./md.module";
import { SimpleNotificationsModule } from "angular2-notifications";
import { LocationStrategy, PathLocationStrategy } from "@angular/common";
import { Ng2BootstrapModule } from "ng2-bootstrap";
import { LoadingRouterOutlet } from "./common/loadingRouterOutlet";
import { CubeGridComponent } from "./common/spinner/cubeGrid/cubeGrid.component";
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from "ng2-translate";

const APP_PROVIDERS = [
    ...APP_RESOLVER_PROVIDERS,
    ...COMMON_PROVIDERS,
    // LoadingGridService,
    // CrudService,
    // GridService,
    // TokenService,
    // AuthService,
    // AuthGuard,
    // DashboardGuard,
    AppState,
    // ServiceNotifications
];

@NgModule({
    bootstrap: [App],
    declarations: [
        App,
        // Login,
        // Navigation,
        // Customers,
        // Crud,
        // CrudView,
        // CrudEdit,
        // CrudLinkset,
        // CrudDelete,
        // CrudCreate,
        NotFound,
        // Dashboard,
        // Breadcrumb,
        // CrudMetaData,
        // CrudMetaFormData,
        // CrudClassMetaData,
        // CrudMetaGridData,
        // Sidebar,
        // SidebarItem,
        LoadingRouterOutlet,
        // GridPagination,
        // LoadingGrid,
        // MultipleSelect,
        CubeGridComponent,
        // MdSelect,

        // @todo check vendor packages here?
        // AgGridNg2,
        // SELECT_DIRECTIVES, @todo not working with ng2 RC6
        // OffClickDirective @todo not working with ng2 RC6
    ],
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        Ng2BootstrapModule,
        RouterModule.forRoot(ROUTES, { useHash: true }),
        MdModule.forRoot(),
        TranslateModule.forRoot({
            provide: TranslateLoader,
            useFactory: (http: Http) => {
                console.log(http);
                return new TranslateStaticLoader(http, (typeof PUBLIC_PATH !== 'undefined' ? PUBLIC_PATH : '') + 'assets/i18n', '.json');
            },
            deps: [Http] // @todo Http is null..
        }),
        SimpleNotificationsModule
    ],
    providers: [
        ENV_PROVIDERS,
        APP_PROVIDERS,
        {
            provide: LocationStrategy,
            useClass: PathLocationStrategy
        }
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
