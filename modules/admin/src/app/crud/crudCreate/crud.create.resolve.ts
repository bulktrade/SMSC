import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { CrudResolve } from "../common/crudResolve";
import { CrudService } from "../crud.service";

@Injectable()
export class CrudCreateResolve extends CrudResolve {

    constructor(public crudService: CrudService) {
        super();
    }

    resolve(route:ActivatedRouteSnapshot, state:RouterStateSnapshot) {
        this.crudService.setClassName(route.parent.parent.data['crudClass']);

        return this.crudService.initColumnDefs(this.crudService.getClassName(), false);
    }

}
