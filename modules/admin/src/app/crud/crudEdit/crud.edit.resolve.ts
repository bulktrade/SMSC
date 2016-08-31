import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { CrudResolve } from "../common/crudResolve";
import { CrudService } from "../crud.service";
import { Response } from "@angular/http";
import { Location } from "@angular/common";
import { GridService } from "../../services/grid.service";

@Injectable()
export class CrudEditResolve extends CrudResolve {

    constructor(public crudService: CrudService,
                public location: Location,
                public gridService: GridService) {
        super();
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let id = route.params['id'];
        this.crudService.setParentPath(route.parent.parent.routeConfig.path);
        this.crudService.setClassName(route.parent.parent.data['crudClass']);

        return this.crudService.initColumnDefs(this.crudService.getClassName(), false)
            .then((initGridData) => {
                return this.crudService.databaseService.load(id)
                    .then((res: Response) => {
                        let model = [];

                        if (!Object.keys(this.crudService.model).length) {
                            model.push(res.json());
                        } else {
                            model.push({});
                        }

                        return this.gridService.selectLinksetProperties(initGridData, model)
                            .then(() => {
                                return Promise.resolve({
                                    initGridData: initGridData,
                                    model: model[0]
                                });
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
