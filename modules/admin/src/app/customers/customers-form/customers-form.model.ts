import {Customer} from "../model/customer";
import {NgForm} from "@angular/forms";

export class CustomersFormModel {
    constructor(public model: Customer,
                public customersForm: NgForm) {
    }
}
