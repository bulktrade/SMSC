import {NgModule, ModuleWithProviders} from "@angular/core";
import {HTTP_INTERCEPTOR_PROVIDER} from "../shared/http-interceptor";
import {ProfileComponent} from "./profile.component";
import {ProfileService} from "./profile.service";
import {ProfileRoutingModule} from "./profile-routing.module";
import {ProfileResolve} from "./profile.resolve";
import {UserService} from "./user.service";

@NgModule({
    imports: [],
    exports: [],
    declarations: [],
    providers: [
        HTTP_INTERCEPTOR_PROVIDER,
        UserService
    ]
})
export class UsersModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: UsersModule
        };
    }
}
