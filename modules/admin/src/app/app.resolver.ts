import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";
import { CustomersViewResolve } from "./customers/customers-view/customers-view.resolve";
import { CustomersEditResolve } from "./customers/customers-update/customers-update.resolve";
import { ContactsUpdateResolve } from "./customers/customers-contacts/contacts-update/contacts-update.resolve";
import { UsersUpdateResolve } from "./customers/customers-users/users-update/users-update.resolve";

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
    CustomersViewResolve,
    CustomersEditResolve,
    ContactsUpdateResolve,
    UsersUpdateResolve
];
