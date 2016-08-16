import { CrudView } from "./crudView/crud.view";
import { CrudResolve } from "./common/crudResolve";
import { CrudDelete } from "./crudDelete/crud.delete";
import { CrudCreate } from "./crudCreate/crud.create";
import { CrudEdit } from "./crudEdit/crud.edit";

export const CRUD_ROUTE_PROVIDER = [
    { path: '', component: CrudView, resolve: [ CrudResolve ] },
    { path: 'delete/:id', component: CrudDelete },
    { path: 'create', component: CrudCreate },
    { path: 'edit', component: CrudEdit }
];