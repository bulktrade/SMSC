import { CrudViewComponent } from './crudView/crudView.component';
import { CrudDeleteComponent } from './crudDelete/crudDelete.component';
import { CrudCreateComponent } from './crudCreate/crudCreate.component';
import { CrudUpdateComponent } from './crudUpdate/crudUpdate.component';
import { CrudViewResolve } from './crudView/crudView.resolve';
import { CrudLinksetComponent } from './crudLinkset/crudLinkset.component';
import { CrudLinksetResolve } from './crudLinkset/crudLinkset.resolve';
import { CrudCreateResolve } from './crudCreate/crudCreate.resolve';
import { CrudEditResolve } from './crudUpdate/crudUpdate.resolve';

export const CRUD_ROUTE_PROVIDER = [
    { path: '', component: CrudViewComponent, resolve: { view: CrudViewResolve } },
    { path: 'delete/:id', component: CrudDeleteComponent },
    { path: 'edit/:id', component: CrudUpdateComponent, resolve: { edit: CrudEditResolve } },
    { path: 'create/:className', component: CrudCreateComponent, resolve: { create: CrudCreateResolve } },
    { path: 'linkset', component: CrudLinksetComponent, resolve: { linkset: CrudLinksetResolve } },
];
