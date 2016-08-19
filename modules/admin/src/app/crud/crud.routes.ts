import { CrudView } from "./crudView/crud.view.component";
import { CrudDelete } from "./crudDelete/crud.delete.component";
import { CrudModify } from "./crudModify/crud.modify.component";

export const CRUD_ROUTE_PROVIDER = [
    { path: '', component: CrudView },
    { path: 'delete/:id', component: CrudDelete },
    { path: 'modify', component: CrudModify },
];