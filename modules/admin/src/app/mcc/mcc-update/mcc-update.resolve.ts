import {ActivatedRouteSnapshot, RouterStateSnapshot, Resolve} from "@angular/router";
import {Injectable} from "@angular/core";

import {MCC} from "../mcc.model";
import {MCCService} from "../mcc.service";

@Injectable()
export class MCCUpdateResolve implements Resolve<MCC> {

    constructor(public mccService: MCCService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.mccService.getResourceById(Number(route.params['id']));
    }
}
