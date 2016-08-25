import { CrudView } from "./crudView/crud.view.component";
import { CrudDelete } from "./crudDelete/crud.delete.component";
import { CrudCreate } from "./crudCreate/crud.create.component";
import { CrudEdit } from "./crudEdit/crud.edit.component";

export const CRUD_ROUTE_PROVIDER = [
    { path: '', component: CrudView },
    { path: 'delete/:id', component: CrudDelete },
    { path: 'create', component: CrudCreate },
    { path: 'edit', component: CrudEdit }, // @todo add /:id and use it
];
