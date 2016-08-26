import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { CrudResolve } from "../common/crudResolve";
import { CrudService } from "../crud.service";

@Injectable()
export class CrudViewResolve extends CrudResolve {

    constructor(public crudService: CrudService) {
        super();
    }

    resolve(route:ActivatedRouteSnapshot, state:RouterStateSnapshot) {
        this.crudService.setClassName(route.parent.parent.data['crudClass']);
        this.crudService.setParentPath(state.url);

        return this.crudService.initGrid(this.crudService.getClassName(), true);
    }

}
