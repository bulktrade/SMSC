import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {MCCComponent} from "./mcc.component";
import {MCCCreateComponent} from "./mcc-create/mcc-create.component";
import {MCCDeleteComponent} from "./mcc-delete/mcc-delete.component";

const routes: Routes = [
    {path: '', component: MCCComponent},
    {path: 'create', component: MCCCreateComponent},
    {path: ':id/delete', component: MCCDeleteComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MCCRoutingModule {
}
