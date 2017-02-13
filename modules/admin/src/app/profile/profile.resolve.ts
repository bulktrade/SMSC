import {ActivatedRouteSnapshot, RouterStateSnapshot, Resolve} from "@angular/router";
import {Injectable} from "@angular/core";
import {ProfileService} from "./profile.service";
import {UserService} from "../users/user.service";

@Injectable()
export class ProfileResolve implements Resolve<any> {

    constructor(public userService: UserService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.userService.getLoggedUser();
    }
}
