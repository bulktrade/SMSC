import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from "@angular/router";
import { Injectable } from "@angular/core";
// import { Location } from "@angular/common";
// import { GridService } from "../../services/grid.service";
// import { DashboardService } from "../dashboard.service";
// import { Observable } from "rxjs";

@Injectable()
export class DashboardCrudCreateResolve implements Resolve<any> {
    // constructor(public crudService: CrudService,
    //             public location: Location,
    //             public gridService: GridService,
    //             public dashboardService: DashboardService) {
    //     super();
    // }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let className = route.params['className'];

        // return Observable.create((observer) => {
        //     this.crudService.getFormColumnDefs(className).subscribe((res) => {
        //         this.crudService.model['dashboard'] = route.params['dashboard'];
        //
        //         observer.next(res);
        //         observer.complete();
        //     });
        // });
    }
}
