import {ActivatedRouteSnapshot, RouterStateSnapshot, Resolve} from "@angular/router";
import {Injectable} from "@angular/core";
import {CustomersService} from "../customer.service";

@Injectable()
export class CustomersEditResolve implements Resolve<any> {
    constructor(public customersService: CustomersService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.customersService.getResourceById(route.params['customerId']);
    }
}
