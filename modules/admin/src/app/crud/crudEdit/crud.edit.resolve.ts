import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { CrudResolve } from "../common/crudResolve";
import { CrudService } from "../crud.service";
import { Response } from "@angular/http";
import { Location } from "@angular/common";

@Injectable()
export class CrudEditResolve extends CrudResolve {

    constructor(public crudService: CrudService,
                public location: Location) {
        super();
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let id = route.params['id'];
        this.crudService.setParentPath(route.parent.parent.routeConfig.path);
        this.crudService.setClassName(route.parent.parent.data['crudClass']);

        return this.crudService.databaseService.load(id)
            .then((res: Response) => {
                let model = res.json();

                if (!Object.keys(this.crudService.model).length) {
                    return Promise.resolve(model);
                }
            }, error => {
                this.crudService.serviceNotifications.createNotificationOnResponse(error);
                this.location.back();
            })
            .then((model) => {
                return this.crudService.initColumnDefs(this.crudService.getClassName(), false)
                    .then((initGridData) => {
                        return Promise.resolve({
                            initGridData: initGridData,
                            model: model
                        });
                    }, (error) => {
                        this.crudService.serviceNotifications.createNotificationOnResponse(error);
                        return Promise.reject(error);
                    });
            }, (error) => {
                this.crudService.serviceNotifications.createNotificationOnResponse(error);
                return Promise.reject(error);
            });
    }

}
