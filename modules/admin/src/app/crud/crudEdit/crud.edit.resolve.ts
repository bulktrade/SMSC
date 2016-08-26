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
                let result = res.json();
                result['rid'] = result['@rid'];
                result['version'] = result['@version'];

                result = this.crudService.removeProperties(result,
                    ['@class', '@rid', '@type', '@version', '@fieldTypes']);

                if (!Object.keys(this.crudService.model).length) {
                    this.crudService.setModel(result);
                }
            }, error => {
                this.crudService.serviceNotifications.createNotificationOnResponse(error);
                this.location.back();
            })
            .then((res) => {
                this.crudService.initGrid(this.crudService.getClassName(), false);
            }, (error) => {
                this.crudService.serviceNotifications.createNotificationOnResponse(error);
                return Promise.reject(error);
            });
    }

}
