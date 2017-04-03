import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {MCCComponent} from "./mcc.component";

const routes: Routes = [
    { path: '', component: MCCComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MCCRoutingModule {
}
