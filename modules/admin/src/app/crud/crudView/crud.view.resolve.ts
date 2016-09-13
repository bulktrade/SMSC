import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { CrudResolve } from "../common/crudResolve";
import { CrudService } from "../crud.service";
import { LoadingGridService } from "../../services/loading/loadingGrid.service";

@Injectable()
export class CrudViewResolve extends CrudResolve {

    constructor(public crudService: CrudService,
                public loadingGridService: LoadingGridService) {
        super();
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.crudService.setClassName(route.parent.parent.data['crudClass']);
        this.crudService.setParentPath(state.url);

        this.loadingGridService.start();

        return this.crudService.initColumnDefs(this.crudService.getClassName(), true, true)
            .then(initColumnDefs => {
                this.loadingGridService.stop();
                return Promise.resolve(initColumnDefs);
            }, err => {
                this.loadingGridService.stop();
                return Promise.reject(err);
            });
    }

}
