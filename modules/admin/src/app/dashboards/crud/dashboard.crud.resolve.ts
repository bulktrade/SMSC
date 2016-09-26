import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { Response } from "@angular/http";
import { Location } from "@angular/common";
import { GridService } from "../../services/grid.service";
import { CrudService } from "../../crud/crud.service";
import { CrudResolve } from "../../crud/common/crudResolve";

@Injectable()
export class DashboardCrudEditResolve extends CrudResolve {
    constructor(public crudService: CrudService,
                public location: Location,
                public gridService: GridService) {
        super();
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let id = route.params['id'];

        this.crudService.setParentPath(route.parent.parent.routeConfig.path);
        this.crudService.setClassName('DashboardBox');

       return  this.crudService.initColumnDefs(this.crudService.getClassName(), false)
            .then((initGridData) => {
                return this.crudService.databaseService.load(id)
                    .then((res: Response) => {
                        let model = [];

                        if (!Object.keys(this.crudService.model).length) {
                            model.push(res.json());
                        }

                        return this.gridService.selectLinksetProperties(initGridData, model)
                            .then(() => {
                                return '';
                                /*console.log({
                                    initGridData: initGridData,
                                    model: model[0]
                                });*/
                                // return Promise.resolve({
                                //     initGridData: initGridData,
                                //     model: model[0]
                                // });
                            });
                    }, error => {
                        this.crudService.serviceNotifications.createNotificationOnResponse(error);
                        this.location.back();
                    })
            }, (error) => {
                this.crudService.serviceNotifications.createNotificationOnResponse(error);
                return Promise.reject(error);
            });
    }
}
