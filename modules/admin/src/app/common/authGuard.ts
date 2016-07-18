import { Injectable } from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router
} from '@angular/router';
import {Observable} from "rxjs/Rx";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(protected router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        if (localStorage.getItem('adminRight')) {
            return true;
        }

        this.router.navigateByUrl('login');
        return false;
    }
}
