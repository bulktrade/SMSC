import {ActivatedRouteSnapshot, RouterStateSnapshot, Resolve} from "@angular/router";
import {Injectable} from "@angular/core";
import {Location} from "@angular/common";
import {NotificationService} from "../../services/notification-service";
import {CustomersService} from "../customers.service";

@Injectable()
export class CustomersEditResolve implements Resolve<any> {
    constructor(public customersService: CustomersService,
                public location: Location,
                public notification: NotificationService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.customersService.getResourceById(route.params['id']);
    }
}
