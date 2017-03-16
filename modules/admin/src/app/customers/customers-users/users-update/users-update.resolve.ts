import {Injectable} from "@angular/core";
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {CustomersUsersService} from "../customer-user.service";

@Injectable()
export class UsersUpdateResolve implements Resolve<any> {

    constructor(public customersUsersService: CustomersUsersService,) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.customersUsersService.getResourceById(route.params['userId']);
    }

}
