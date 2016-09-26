import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { CrudResolve } from '../common/crudResolve';
import { CrudService } from '../crud.service';

@Injectable()
export class CrudCreateResolve extends CrudResolve {

    constructor(public crudService: CrudService) {
        super();
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let className = route.params['className'];
        this.crudService.setParentPath(route.parent.parent.pathFromRoot);

        return this.crudService.getColumnDefs(className, false);
    }

}
