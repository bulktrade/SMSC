import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Http, HttpModule, XHRBackend, RequestOptions } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { App } from './app.component';
import { BreadcrumbModule } from './breadcrumb/breadcrumb.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { NavigationComponent } from './navigation/navigation.component';
import { CustomersComponent } from './customers/customers.components';
import { NotFoundComponent } from './not-found/not-found.component';
import { CrudMetaDataComponent } from './crud-meta-data/crud-meta-data.components';
import { Router } from '@angular/router';
import { AppState } from './app.service';
import { COMMON_PROVIDERS } from './common';
import { AuthService } from './services/auth/auth.service';
import { TokenService } from './services/auth/token.service';
import { CrudService } from './crud/crud.service';
import { AuthGuard } from './common/auth.guard';
import { NotificationService } from './services/notification-service';
import { LoadingGridService } from './services/loading/loading-grid.service';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { createNewHosts, removeNgStyles } from '@angularclass/hmr';
import { ENV_PROVIDERS } from './environment';
import { MdModule } from './md.module';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { GridService } from './services/grid.service';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebarItemComponent } from './sidebar/sidebar-item.component';
import { CrudViewResolve } from './crud/crud-view/crud-view.resolve';
import { CrudModule } from './crud/crud.module';
import { LoadingRouterOutletModule } from './common/loading-router-outlet.component';
import { ConfigService } from './config/config.service';
import { LoadingRouterOutletService } from './services/loading/loading-router-outlet.service';
import { LoadingService } from './services/loading/loading.service';
import { RouterOutletService } from './services/router-outlet-service';
import {
    MetaDataPropertyBindingParameterComponent
} from './crud-meta-data/meta-data-binding-parameter/meta-data-binding-parameter.component';
import { DashboardCrudUpdateResolve } from './dashboards/crud/dashboard-crud-update.resolve';
import { DashboardCrudCreateResolve } from './dashboards/crud/dashboard-crud-create.resolve';
import { SidebarService } from './sidebar/sidebar.service';
import { DashboardModule } from './dashboards/dashboard.module';
import { HttpInterceptor } from './common/http-interceptor';
import { NoInternetModule } from './common/no-internet/no-internet.component';
import {
    CrudMetaFormDataComponent
} from './crud-meta-data/crud-meta-form-data/crud-meta-form-data.component';
import {
    CrudClassMetaDataComponent
} from './crud-meta-data/crud-class-meta-data/crud-class-meta-data.component';
import {
    CrudMetaGridDataComponent
} from './crud-meta-data/crud-meta-grid-data/crud-meta-grid-data.component';

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
    SidebarService,
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
        CustomersComponent,
        NotFoundComponent,
        CrudMetaDataComponent,
        CrudMetaFormDataComponent,
        CrudClassMetaDataComponent,
        CrudMetaGridDataComponent,
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
        MdModule.forRoot(),
        TranslateModule.forRoot({
            provide: TranslateLoader,
            useFactory: (http: Http, configService: ConfigService) => {
                return new TranslateStaticLoader(http, configService.config.i18nPath, '.json');
            },
            deps: [Http, ConfigService]
        }),
        SimpleNotificationsModule,
        CrudModule,
        DashboardModule,
        BreadcrumbModule.forRoot()
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
