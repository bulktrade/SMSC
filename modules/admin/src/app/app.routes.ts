import { Routes } from "@angular/router";
import { NotFound } from "./notFound/notFound.component";

export const ROUTES: Routes = [
    // {
    //     path: 'login',
    //     component: Login
    // },
    // {
    //     path: '',
    //     component: Navigation,
    //     canActivate: [AuthGuard],
    //     children: [
    //         {
    //             path: '',
    //             component: Dashboard,
    //             data: {
    //                 showInSubNavigation: true,
    //                 icon: 'layers'
    //             }
    //         },
    //         // {
    //         //     path: 'customers',
    //         //     component: Customers,
    //         //     data: {
    //         //         showInSubNavigation: true,
    //         //         paramsAsDefault: '',
    //         //         icon: 'perm_contact_calendar',
    //         //         crudClass: 'Customer'
    //         //     },
    //         //     children: [
    //         //         {
    //         //             path: '',
    //         //             component: Crud,
    //         //             children: CRUD_ROUTE_PROVIDER
    //         //         }
    //         //     ]
    //         // },
    //         // {
    //         //     path: 'metadata',
    //         //     component: CrudMetaData,
    //         //     data: {
    //         //         showInSubNavigation: true,
    //         //         paramsAsDefault: '',
    //         //         icon: 'perm_contact_calendar'
    //         //     },
    //         //     children: [
    //         //         {
    //         //             path: '',
    //         //             component: CrudClassMetaData,
    //         //             data: {
    //         //                 showInSubNavigation: true,
    //         //                 paramsAsDefault: '',
    //         //                 icon: 'perm_data_setting',
    //         //                 crudClass: 'CrudClassMetaData'
    //         //             },
    //         //             children: [
    //         //                 {
    //         //                     path: '',
    //         //                     component: Crud,
    //         //                     children: CRUD_ROUTE_PROVIDER
    //         //                 }
    //         //             ]
    //         //         },
    //         //         {
    //         //             path: 'grid',
    //         //             component: CrudMetaGridData,
    //         //             data: {
    //         //                 showInSubNavigation: true,
    //         //                 paramsAsDefault: '',
    //         //                 icon: 'grid_on',
    //         //                 crudClass: 'CrudMetaGridData'
    //         //             },
    //         //             children: [
    //         //                 {
    //         //                     path: '',
    //         //                     component: Crud,
    //         //                     children: CRUD_ROUTE_PROVIDER
    //         //                 }
    //         //             ]
    //         //         },
    //         //         {
    //         //             path: 'form',
    //         //             component: CrudMetaFormData,
    //         //             data: {
    //         //                 showInSubNavigation: true,
    //         //                 paramsAsDefault: '',
    //         //                 icon: 'format_shapes',
    //         //                 crudClass: 'CrudMetaFormData'
    //         //             },
    //         //             children: [
    //         //                 {
    //         //                     path: '',
    //         //                     component: Crud,
    //         //                     children: CRUD_ROUTE_PROVIDER
    //         //                 }
    //         //             ]
    //         //         }
    //         //     ]
    //         // }
    //     ]
    // },
    {
        path: '**',
        component: NotFound
    }
];
