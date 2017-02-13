import {Injectable} from "@angular/core";
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {CustomersContactsService} from "../customers-contacts.service";

@Injectable()
export class ContactsUpdateResolve implements Resolve<any> {

    constructor(public contactsService: CustomersContactsService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.contactsService.getResourceById(+route.params['contactId']);
    }

}
