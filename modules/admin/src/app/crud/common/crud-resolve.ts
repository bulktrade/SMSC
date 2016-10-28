import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class CrudResolve implements Resolve<any> {

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    }

}
