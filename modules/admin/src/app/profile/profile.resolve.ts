import {ActivatedRouteSnapshot, RouterStateSnapshot, Resolve} from "@angular/router";
import {Injectable} from "@angular/core";
import {ProfileService} from "./profile.service";

@Injectable()
export class ProfileResolve implements Resolve<any> {

    constructor(public profileService: ProfileService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.profileService.getProfile();
    }
}
