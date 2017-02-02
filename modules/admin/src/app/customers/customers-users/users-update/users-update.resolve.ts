import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { CustomersUsersService } from "../customers-users.service";

@Injectable()
export class UsersUpdateResolve implements Resolve<any> {

    constructor(public customersUsersService: CustomersUsersService,) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let id = route.params['userId'];

        return this.customersUsersService.getUser(id);
    }

}
