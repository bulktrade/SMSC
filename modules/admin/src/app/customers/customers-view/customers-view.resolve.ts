import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";

import {Customer} from "../model/customer";
import {Pagination} from "../model/pagination";
import {CustomersService} from "../customer.service";
import {Sort, SortType} from "../../shared/sort.model";

@Injectable()
export class CustomersViewResolve implements Resolve<Customer[]> {
    constructor(public customersService: CustomersService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let pagination: Pagination = new Pagination(10, null, null, 0);
        let sort: Sort = new Sort('id', SortType.ASC);
        return this.customersService.getResources(pagination.number, pagination.size, null, sort);
    }
}
