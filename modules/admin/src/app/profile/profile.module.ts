import {NgModule, ModuleWithProviders} from "@angular/core";
import {HTTP_INTERCEPTOR_PROVIDER} from "../common/http-interceptor";

@NgModule({
    imports: [],
    exports: [],
    declarations: [],
    providers: [
        HTTP_INTERCEPTOR_PROVIDER
    ]
})
export class ProfileModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: ProfileModule
        };
    }
}
