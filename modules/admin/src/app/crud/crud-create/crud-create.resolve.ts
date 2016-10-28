import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { CrudResolve } from '../common/crud-resolve';
import { CrudService } from '../crud.service';

@Injectable()
export class CrudCreateResolve extends CrudResolve {

    constructor(public crudService: CrudService) {
        super();
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let className = route.params['className'];

        return this.crudService.getColumnDefs(className, false);
    }

}
