import {NgModule, provide, PLATFORM_DIRECTIVES} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {Http} from '@angular/http';
import {FormsModule, disableDeprecatedForms, provideForms, REACTIVE_FORM_DIRECTIVES} from '@angular/forms';
import {MaterialModule} from "./app.materialModule";
import {App} from "./app.component";
import {Breadcrumb} from "./breadcrumb/breadcrumb.component";
import {TranslateLoader, TranslateStaticLoader} from "ng2-translate";
import {APP_ROUTE_PROVIDER} from "./app.routes";
import {APP_PROVIDERS} from "./index";
import {PLATFORM_PROVIDERS} from "../platform/browser";
import {ENV_PROVIDERS} from "../platform/environment";
import {Login} from "./login/login.component";
import {Navigation} from "./navigation/navigation.component";
import {Customers} from "./customers/customers.components";
import {Crud} from "./crud/crud.component";
import {CrudView} from "./crud/crudView/crud.view";
import {CrudDelete} from "./crud/crudDelete/crud.delete";
import {CrudCreate} from "./crud/crudCreate/crud.create";
import {CrudEdit} from "./crud/crudEdit/crud.edit";
import {Dashboard} from "./dashboard/dashboard.component";
import {NotFound} from "./notFound/notFound.component";

@NgModule({
    imports: [
        BrowserModule,
        MaterialModule,
        FormsModule
    ],
    providers: [
        ...APP_PROVIDERS,
        ...PLATFORM_PROVIDERS,
        ...ENV_PROVIDERS,
        disableDeprecatedForms(),
        provideForms(),
        {
            provide: PLATFORM_DIRECTIVES,
            useValue: [REACTIVE_FORM_DIRECTIVES],
            multi: true
        },
        provide(TranslateLoader, {
            useFactory: (http: Http) => new TranslateStaticLoader(http, (typeof PUBLIC_PATH !== 'undefined' ? PUBLIC_PATH : '') + 'assets/i18n', '.json'),
            deps: [Http]
        }),
        APP_ROUTE_PROVIDER
    ],
    declarations: [
        App,
        Login,
        Navigation,
        Customers,
        Crud,
        CrudView,
        CrudDelete,
        CrudCreate,
        CrudEdit,
        NotFound,
        Dashboard,
        Breadcrumb,
    ],
    entryComponents: [
        App
    ],
    bootstrap: [App]
})
export class DemoAppModule {
}
