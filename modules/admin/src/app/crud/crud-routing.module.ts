import { CrudViewComponent } from './crud-view/crud-view.component';
import { CrudDeleteComponent } from './crud-delete/crud-delete.component';
import { CrudCreateComponent } from './crud-create/crud-create.component';
import { CrudUpdateComponent } from './crud-update/crud-update.component';
import { CrudViewResolve } from './crud-view/crud-view.resolve';
import { CrudLinksetComponent } from './crud-linkset/crud-linkset.component';
import { CrudLinksetResolve } from './crud-linkset/crud-linkset.resolve';
import { CrudCreateResolve } from './crud-create/crud-create.resolve';
import { CrudEditResolve } from './crud-update/crud-update.resolve';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

const CRUD_ROUTE_PROVIDER = [
    {
        path: '',
        component: CrudViewComponent,
        resolve: { view: CrudViewResolve },
        data: {
            showInBreadcrumb: false,
        }
    },
    {
        path: 'delete/:id',
        component: CrudDeleteComponent,
        data: {
            showInBreadcrumb: false,
        }
    },
    {
        path: 'update/:id',
        component: CrudUpdateComponent,
        resolve: { edit: CrudEditResolve },
        data: {
            showInBreadcrumb: false,
        }
    },
    {
        path: 'create',
        component: CrudCreateComponent,
        resolve: { create: CrudCreateResolve },
        data: {
            showInBreadcrumb: false,
        }
    },
    {
        path: 'linkset/:className', component: CrudLinksetComponent,
        resolve: { linkset: CrudLinksetResolve },
        data: {
            showInBreadcrumb: false,
        }
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(CRUD_ROUTE_PROVIDER)
    ],
    exports: [
        RouterModule
    ]
})
export class CrudRoutingModule {}
