import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from "@angular/router";
import { Injectable } from "@angular/core";
import { Location } from "@angular/common";
import { BackendService } from "../../services/backend/backend.service";
import { NotificationService } from "../../services/notification-service";
import { GetDataFromURIService } from "../../services/get-data-from-URI";
import { CustomersService } from "../customers.service";

@Injectable()
export class CustomersEditResolve implements Resolve<any> {

    constructor(public customersService: CustomersService,
                public location: Location,
                public notification: NotificationService,
                public backendService: BackendService,
                public URIService: GetDataFromURIService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let id = route.params['id'];

        return this.customersService.getCustomer(id);
    }

}
