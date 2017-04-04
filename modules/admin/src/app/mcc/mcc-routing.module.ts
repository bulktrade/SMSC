import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {MCCComponent} from "./mcc.component";
import {MCCCreateComponent} from "./mcc-create/mcc-create.component";
import {MCCDeleteComponent} from "./mcc-delete/mcc-delete.component";
import {MCCUpdateComponent} from "./mcc-update/mcc-update.component";
import {MCCUpdateResolve} from "./mcc-update/mcc-update.resolve";
import {MCCResolve} from "./mcc.resolve";

const routes: Routes = [
    {
        path: '',
        component: MCCComponent,
        resolve: {mcc: MCCResolve},
    },
    {
        path: 'create',
        component: MCCCreateComponent
    },
    {
        path: ':id/update',
        component: MCCUpdateComponent,
        resolve: {update: MCCUpdateResolve}
    },
    {
        path: ':id/delete',
        component: MCCDeleteComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MCCRoutingModule {
}
