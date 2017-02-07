import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { CustomersUsersService } from "../customers-users.service";

@Injectable()
export class UsersUpdateResolve implements Resolve<any> {

    constructor(public customersUsersService: CustomersUsersService,) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.customersUsersService.getResource(+route.params['userId']);
    }

}
