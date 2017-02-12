import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {ProfileComponent} from "./profile.component";
import {ProfileResolve} from "./profile.resolve";

const ROUTE_PROVIDER = [
    {
        path: '',
        component: ProfileComponent,
        resolve: {
            user: ProfileResolve
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(ROUTE_PROVIDER)],
    exports: [RouterModule]
})
export class ProfileRoutingModule {
}
