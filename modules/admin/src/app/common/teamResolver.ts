import {ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {NavigationInterceptor} from "./navigationInterceptor";
import {Injectable} from "@angular/core";

@Injectable()
export class TeamResolver {
    constructor(public navigationInterceptor: NavigationInterceptor) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.navigationInterceptor.startLoadingIcon();
    }
}
