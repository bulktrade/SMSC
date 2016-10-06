import { CrudView } from './crudView/crudView.component';
import { CrudDelete } from './crudDelete/crudDelete.component';
import { CrudCreate } from './crudCreate/crudCreate.component';
import { CrudEdit } from './crudEdit/crudEdit.component';
import { CrudViewResolve } from './crudView/crudView.resolve';
import { CrudLinkset } from './crudLinkset/crudLinkset.component';
import { CrudLinksetResolve } from './crudLinkset/crudLinkset.resolve';
import { CrudCreateResolve } from './crudCreate/crudCreate.resolve';
import { CrudEditResolve } from './crudEdit/crudEdit.resolve';

export const CRUD_ROUTE_PROVIDER = [
    { path: '', component: CrudView, resolve: { view: CrudViewResolve } },
    { path: 'delete/:id', component: CrudDelete },
    { path: 'edit/:id', component: CrudEdit, resolve: { edit: CrudEditResolve } },
    { path: 'create/:className', component: CrudCreate, resolve: { create: CrudCreateResolve } },
    { path: 'linkset', component: CrudLinkset, resolve: { linkset: CrudLinksetResolve } },
];
