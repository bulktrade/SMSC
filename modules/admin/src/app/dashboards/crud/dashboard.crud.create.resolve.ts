import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { Response } from "@angular/http";
import { Location } from "@angular/common";
import { GridService } from "../../services/grid.service";
import { CrudService } from "../../crud/crud.service";
import { CrudResolve } from "../../crud/common/crudResolve";
import { DashboardService } from "../dashboardService";

@Injectable()
export class DashboardCrudCreateResolve extends CrudResolve {
    constructor(public crudService: CrudService,
                public location: Location,
                public gridService: GridService,
                public dashboardService: DashboardService) {
        super();
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let className = route.parent.data['crudClass'];

        this.crudService.setParentPath(route.parent.pathFromRoot);
        this.crudService.getColumnDefs(className, false).subscribe((res) => {
            console.log(res);
        })
        return this.crudService.getColumnDefs(className, false);
    }
}
