import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";

import {MCC} from "./mcc.model";
import {MCCService} from "./mcc.service";
import {Sort, SortType} from "../shared/sort.model";
import {Pagination} from "../customers/model/pagination";

@Injectable()
export class MCCResolve implements Resolve<MCC[]> {
    constructor(public mccService: MCCService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let pagination: Pagination = new Pagination(10, null, null, 0);
        let sort: Sort = new Sort('id', SortType.ASC);
        return this.mccService.getResources(pagination.number, pagination.size, null, sort);
    }
}
