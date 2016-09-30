"use strict";
var authGuard_1 = require('./common/authGuard');
var login_component_1 = require('./login/login.component');
var navigation_component_1 = require('./navigation/navigation.component');
var customers_components_1 = require('./customers/customers.components');
var crud_component_1 = require('./crud/crud.component');
var notFound_component_1 = require('./notFound/notFound.component');
var crudMetaData_components_1 = require('./crudMetadata/crudMetaData.components');
var crud_routes_1 = require('./crud/crud.routes');
var crudMetaGridData_component_1 = require('./crudMetadata/crudMetaGridData/crudMetaGridData.component');
var crudMetaFormData_component_1 = require('./crudMetadata/crudMetaFormData/crudMetaFormData.component');
var crudClassMetaData_component_1 = require('./crudMetadata/crudClassMetaData/crudClassMetaData.component');
var metaDataBindingParameter_1 = require('./crudMetadata/metaDataBindingParameter/metaDataBindingParameter');
var dashboard_view_component_1 = require("./dashboards/dashboard_view.component");
var dashboard_box_update_1 = require("./dashboards/crud/dashboard_box_update");
var dashboard_crud_update_resolve_1 = require("./dashboards/crud/dashboard_crud_update.resolve");
var dashboard_box_create_1 = require("./dashboards/crud/dashboard_box_create");
var dashboard_crud_create_resolve_1 = require("./dashboards/crud/dashboard_crud_create.resolve");
var crud_linkset_component_1 = require("./crud/crudLinkset/crud.linkset.component");
var crud_linkset_resolve_1 = require("./crud/crudLinkset/crud.linkset.resolve");
var dashboards_components_1 = require("./dashboards/dashboards.components");
var dashboard_component_1 = require("./dashboards/dashboard.component");
var DASHBOARD_ROUTER_PROVIDER = [
    {
        path: '',
        component: dashboard_component_1.Dashboard,
        data: {
            showInSubNavigation: false,
            icon: 'layers',
            crudClass: 'DashboardBox',
            dashboard: 'default'
        },
        children: [
            { path: '', component: dashboard_view_component_1.DashboardView },
            { path: 'edit/:id', component: dashboard_box_update_1.DashboardCrudUpdate, resolve: { edit: dashboard_crud_update_resolve_1.DashboardCrudUpdateResolve } },
            { path: 'create/:className', component: dashboard_box_create_1.DashboardCrudCreate, resolve: { create: dashboard_crud_create_resolve_1.DashboardCrudCreateResolve } },
            { path: 'linkset', component: crud_linkset_component_1.CrudLinkset, resolve: { linkset: crud_linkset_resolve_1.CrudLinksetResolve } }
        ]
    },
    {
        path: 'dashboard',
        component: dashboard_component_1.Dashboard,
        data: {
            crudClass: 'DashboardBox'
        },
        children: [
            { path: '', component: dashboard_view_component_1.DashboardView },
            { path: 'edit/:id', component: dashboard_box_update_1.DashboardCrudUpdate, resolve: { edit: dashboard_crud_update_resolve_1.DashboardCrudUpdateResolve } },
            { path: 'create/:className', component: dashboard_box_create_1.DashboardCrudCreate, resolve: { create: dashboard_crud_create_resolve_1.DashboardCrudCreateResolve } },
            { path: 'linkset', component: crud_linkset_component_1.CrudLinkset, resolve: { linkset: crud_linkset_resolve_1.CrudLinksetResolve } }
        ]
    }
];
exports.ROUTES = [
    {
        path: 'login',
        component: login_component_1.Login
    },
    {
        path: '',
        component: navigation_component_1.Navigation,
        canActivate: [authGuard_1.AuthGuard],
        children: [
            {
                path: '',
                component: dashboards_components_1.Dashboards,
                children: DASHBOARD_ROUTER_PROVIDER,
                data: {
                    similarPath: 'dasboards' //@todo Impement in sidenav
                }
            },
            {
                path: 'dashboards',
                component: dashboards_components_1.Dashboards,
                data: {
                    showInSubNavigation: true,
                    icon: 'layers'
                },
                children: DASHBOARD_ROUTER_PROVIDER
            },
            {
                path: 'customers',
                component: customers_components_1.Customers,
                data: {
                    showInSubNavigation: true,
                    paramsAsDefault: '',
                    icon: 'perm_contact_calendar',
                    crudClass: 'Customer'
                },
                children: [
                    {
                        path: '',
                        component: crud_component_1.Crud,
                        children: crud_routes_1.CRUD_ROUTE_PROVIDER
                    }
                ]
            },
            {
                path: 'customers',
                component: customers_components_1.Customers,
                data: {
                    showInSubNavigation: true,
                    icon: 'perm_contact_calendar',
                    crudClass: 'Customer'
                },
                children: [
                    {
                        path: '',
                        component: crud_component_1.Crud,
                        children: crud_routes_1.CRUD_ROUTE_PROVIDER
                    }
                ]
            },
            {
                path: 'metadata',
                component: crudMetaData_components_1.CrudMetaData,
                data: {
                    showInSubNavigation: true,
                    icon: 'perm_contact_calendar'
                },
                children: [
                    {
                        path: '',
                        component: crudClassMetaData_component_1.CrudClassMetaData,
                        data: {
                            showInSubNavigation: true,
                            icon: 'perm_data_setting',
                            crudClass: 'CrudClassMetaData'
                        },
                        children: [
                            {
                                path: '',
                                component: crud_component_1.Crud,
                                children: crud_routes_1.CRUD_ROUTE_PROVIDER
                            }
                        ]
                    },
                    {
                        path: 'binding',
                        component: metaDataBindingParameter_1.MetaDataPropertyBindingParameter,
                        data: {
                            showInSubNavigation: true,
                            icon: 'perm_data_setting',
                            crudClass: 'MetaDataPropertyBindingParameter'
                        },
                        children: [
                            {
                                path: '',
                                component: crud_component_1.Crud,
                                children: crud_routes_1.CRUD_ROUTE_PROVIDER
                            }
                        ]
                    },
                    {
                        path: 'grid',
                        component: crudMetaGridData_component_1.CrudMetaGridData,
                        data: {
                            showInSubNavigation: true,
                            icon: 'grid_on',
                            crudClass: 'CrudMetaGridData'
                        },
                        children: [
                            {
                                path: '',
                                component: crud_component_1.Crud,
                                children: crud_routes_1.CRUD_ROUTE_PROVIDER
                            }
                        ]
                    },
                    {
                        path: 'form',
                        component: crudMetaFormData_component_1.CrudMetaFormData,
                        data: {
                            showInSubNavigation: true,
                            icon: 'format_shapes',
                            crudClass: 'CrudMetaFormData'
                        },
                        children: [
                            {
                                path: '',
                                component: crud_component_1.Crud,
                                children: crud_routes_1.CRUD_ROUTE_PROVIDER
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        path: '**',
        component: notFound_component_1.NotFound
    }
];
//# sourceMappingURL=app.routes.js.map