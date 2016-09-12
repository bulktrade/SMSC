import { Component } from "@angular/core";
import { TranslateService } from "ng2-translate/ng2-translate";
import { Breadcrumb } from "../breadcrumb/breadcrumb.component";

@Component({
    selector: 'customers',
    template: require('./customers.html'),
    styleUrls: [
        require('./customers.scss')
    ],
    providers: [Breadcrumb]
})

export class Customers {
    constructor(public translate:TranslateService) {
    }

    ngOnInit() {
    }
}
