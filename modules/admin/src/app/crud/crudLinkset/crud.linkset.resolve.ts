import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { CrudResolve } from "../common/crudResolve";
import { CrudService } from "../crud.service";

@Injectable()
export class CrudLinksetResolve extends CrudResolve {

    constructor(public crudService: CrudService) {
        super();
    }

    resolve(route:ActivatedRouteSnapshot, state:RouterStateSnapshot) {
        return this.crudService.initGrid(this.crudService.getLinkedClass(), true);
    }

}
