import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {MCCComponent} from "./mcc.component";
import {MCCCreateComponent} from "./mcc-create/mcc-create.component";

const routes: Routes = [
    {path: '', component: MCCComponent},
    {path: 'create', component: MCCCreateComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MCCRoutingModule {
}
