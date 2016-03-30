import {Component} from 'angular2/core';
import {CustomersGrid} from "./directives/customers-grid";

@Component({
    selector: 'customers',
    templateUrl: 'app/components/customers/customers.html',
    styleUrls: ['app/components/customers/customers.css'],
    providers: [],
    directives: [CustomersGrid],
    pipes: []
})
export class Customers {

    constructor() {}

    ngOnInit() {

    }

}