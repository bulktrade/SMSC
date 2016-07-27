import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs/Rx";
import { TokenService } from "../services/auth/token.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(protected router:Router, protected tokenService:TokenService) {
    }

    canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):Observable<boolean> | boolean {
        if (!this.tokenService.isTokenExpired()) {
            return true;
        }

        this.router.navigateByUrl('/login');
        return false;
    }
}
