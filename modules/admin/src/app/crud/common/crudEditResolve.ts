import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { CrudService } from "../crud.service";
import { CrudResolve } from "./crudResolve";

@Injectable()
export class CrudEditResolve extends CrudResolve {

    constructor(public router:Router,
                public crudService:CrudService) {
        super();
    }

    resolve(route:ActivatedRouteSnapshot, state:RouterStateSnapshot) {
        this.crudService.className = route.parent.parent.data[ 'crudClass' ];
        this.crudService.parentPath = state.url;

        this.crudService.initializationGrid(this.crudService.getClassName(), () => {
            this.crudService.model = this.crudService.crudModel.rowData[this.crudService.focusedRow];
        });
    }

}
