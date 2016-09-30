"use strict";
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var http_1 = require("@angular/http");
var forms_1 = require("@angular/forms");
var app_component_1 = require("./app.component");
var breadcrumb_component_1 = require("./breadcrumb/breadcrumb.component");
var app_routes_1 = require("./app.routes");
var login_component_1 = require("./login/login.component");
var navigation_component_1 = require("./navigation/navigation.component");
var customers_components_1 = require("./customers/customers.components");
var notFound_component_1 = require("./notFound/notFound.component");
var crudMetaFormData_component_1 = require("./crudMetadata/crudMetaFormData/crudMetaFormData.component");
var crudMetaData_components_1 = require("./crudMetadata/crudMetaData.components");
var crudClassMetaData_component_1 = require("./crudMetadata/crudClassMetaData/crudClassMetaData.component");
var crudMetaGridData_component_1 = require("./crudMetadata/crudMetaGridData/crudMetaGridData.component");
var router_1 = require("@angular/router");
var app_service_1 = require("./app.service");
var common_1 = require("./common");
var auth_service_1 = require("./services/auth/auth.service");
var token_service_1 = require("./services/auth/token.service");
var crud_service_1 = require("./crud/crud.service");
var authGuard_1 = require("./common/authGuard");
var notificationService_1 = require("./services/notificationService");
var loadingGrid_service_1 = require("./services/loading/loadingGrid.service");
var app_resolver_1 = require("./app.resolver");
var hmr_1 = require("@angularclass/hmr");
var environment_1 = require("./environment");
var md_module_1 = require("./md.module");
var angular2_notifications_1 = require("angular2-notifications");
var ng2_translate_1 = require("ng2-translate");
var ng2_bootstrap_1 = require("ng2-bootstrap");
var grid_service_1 = require("./services/grid.service");
var sidebar_component_1 = require("./sidebar/sidebar.component");
var sidebaritem_component_1 = require("./sidebar/sidebaritem.component");
var crud_view_resolve_1 = require("./crud/crudView/crud.view.resolve");
var crud_module_1 = require("./crud/crud.module");
var loadingRouterOutlet_1 = require("./common/loadingRouterOutlet");
var configService_1 = require("./config/configService");
var loadingRouterOutlet_service_1 = require("./services/loading/loadingRouterOutlet.service");
var loading_service_1 = require("./services/loading/loading.service");
var routerOutletService_1 = require("./services/routerOutletService");
var metaDataBindingParameter_1 = require("./crudMetadata/metaDataBindingParameter/metaDataBindingParameter");
var dashboard_crud_update_resolve_1 = require("./dashboards/crud/dashboard_crud_update.resolve");
var dashboard_crud_create_resolve_1 = require("./dashboards/crud/dashboard_crud_create.resolve");
var sidebarService_1 = require("./sidebar/sidebarService");
var dashboard_module_1 = require("./dashboards/dashboard.module");
exports.APP_PROVIDERS = app_resolver_1.APP_RESOLVER_PROVIDERS.concat(common_1.COMMON_PROVIDERS, [
    loadingGrid_service_1.LoadingGridService,
    loading_service_1.LoadingService,
    loadingRouterOutlet_service_1.LoadingRouterOutletService,
    crud_service_1.CrudService,
    routerOutletService_1.RouterOutletService,
    grid_service_1.GridService,
    token_service_1.TokenService,
    auth_service_1.AuthService,
    crud_view_resolve_1.CrudViewResolve,
    notificationService_1.NotificationService,
    authGuard_1.AuthGuard,
    app_service_1.AppState,
    dashboard_crud_update_resolve_1.DashboardCrudUpdateResolve,
    dashboard_crud_create_resolve_1.DashboardCrudCreateResolve,
    sidebarService_1.SidebarService,
]);
var AppModule = (function () {
    function AppModule(appRef, appState) {
        this.appRef = appRef;
        this.appState = appState;
    }
    AppModule.prototype.hmrOnInit = function (store) {
        if (!store || !store.state)
            return;
        console.log('HMR store', store);
        this.appState._state = store.state;
        this.appRef.tick();
        delete store.state;
    };
    AppModule.prototype.hmrOnDestroy = function (store) {
        var cmpLocation = this.appRef.components.map(function (cmp) { return cmp.location.nativeElement; });
        // recreate elements
        var state = this.appState._state;
        store.state = state;
        store.disposeOldHosts = hmr_1.createNewHosts(cmpLocation);
        // remove styles
        hmr_1.removeNgStyles();
    };
    AppModule.prototype.hmrAfterDestroy = function (store) {
        // display new elements
        store.disposeOldHosts();
        delete store.disposeOldHosts;
    };
    AppModule = __decorate([
        core_1.NgModule({
            bootstrap: [app_component_1.App],
            declarations: [
                sidebar_component_1.Sidebar,
                sidebaritem_component_1.SidebarItem,
                app_component_1.App,
                login_component_1.Login,
                navigation_component_1.Navigation,
                customers_components_1.Customers,
                notFound_component_1.NotFound,
                crudMetaData_components_1.CrudMetaData,
                crudMetaFormData_component_1.CrudMetaFormData,
                crudClassMetaData_component_1.CrudClassMetaData,
                crudMetaGridData_component_1.CrudMetaGridData,
                metaDataBindingParameter_1.MetaDataPropertyBindingParameter,
            ],
            imports: [
                loadingRouterOutlet_1.LoadingRouterOutletModule,
                ng2_bootstrap_1.Ng2BootstrapModule,
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                router_1.RouterModule.forRoot(app_routes_1.ROUTES, { useHash: false }),
                md_module_1.MdModule.forRoot(),
                ng2_translate_1.TranslateModule.forRoot({
                    provide: ng2_translate_1.TranslateLoader,
                    useFactory: function (http, configService) {
                        return new ng2_translate_1.TranslateStaticLoader(http, configService.config.i18nPath, '.json');
                    },
                    deps: [http_1.Http, configService_1.ConfigService]
                }),
                angular2_notifications_1.SimpleNotificationsModule,
                crud_module_1.CrudModule,
                dashboard_module_1.DashboardModule,
                breadcrumb_component_1.BreadcrumbModule.forRoot()
            ],
            providers: [
                configService_1.ConfigService,
                environment_1.ENV_PROVIDERS,
                exports.APP_PROVIDERS
            ]
        }), 
        __metadata('design:paramtypes', [core_1.ApplicationRef, app_service_1.AppState])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map