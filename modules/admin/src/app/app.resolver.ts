import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";
import { CrudResolve } from "./crud/common/crud-resolve";
import { CrudViewResolve } from "./crud/crud-view/crud-view.resolve";
import { CrudCreateResolve } from "./crud/crud-create/crud-create.resolve";
import { CrudEditResolve } from "./crud/crud-update/crud-update.resolve";
import { CustomersViewResolve } from "./customers/customers-view/customers-view.resolve";

@Injectable()
export class DataResolver implements Resolve<any> {
    constructor() {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return Observable.of({ res: 'I am data' });
    }
}

// an array of services to resolve routes with data
export const APP_RESOLVER_PROVIDERS = [
    DataResolver,
    CrudEditResolve,
    CrudCreateResolve,
    CrudResolve,
    CrudViewResolve,

    CustomersViewResolve
];
