"use strict";
var crud_view_component_1 = require('./crudView/crud.view.component');
var crud_delete_component_1 = require('./crudDelete/crud.delete.component');
var crud_create_component_1 = require('./crudCreate/crud.create.component');
var crud_edit_component_1 = require('./crudEdit/crud.edit.component');
var crud_view_resolve_1 = require('./crudView/crud.view.resolve');
var crud_linkset_component_1 = require('./crudLinkset/crud.linkset.component');
var crud_linkset_resolve_1 = require('./crudLinkset/crud.linkset.resolve');
var crud_create_resolve_1 = require('./crudCreate/crud.create.resolve');
var crud_edit_resolve_1 = require('./crudEdit/crud.edit.resolve');
exports.CRUD_ROUTE_PROVIDER = [
    { path: '', component: crud_view_component_1.CrudView, resolve: { view: crud_view_resolve_1.CrudViewResolve } },
    { path: 'delete/:id', component: crud_delete_component_1.CrudDelete },
    { path: 'edit/:id', component: crud_edit_component_1.CrudEdit, resolve: { edit: crud_edit_resolve_1.CrudEditResolve } },
    { path: 'create/:className', component: crud_create_component_1.CrudCreate, resolve: { create: crud_create_resolve_1.CrudCreateResolve } },
    { path: 'linkset', component: crud_linkset_component_1.CrudLinkset, resolve: { linkset: crud_linkset_resolve_1.CrudLinksetResolve } },
];
//# sourceMappingURL=crud.routes.js.map