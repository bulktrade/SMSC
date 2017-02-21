import {Component} from "@angular/core";
import {TranslateService} from "ng2-translate/ng2-translate";
import {BreadcrumbComponent} from "../breadcrumb/breadcrumb.component";

@Component({
    selector: 'customers',
    template: '',
    providers: [BreadcrumbComponent]
})

export class CustomersComponent {
    constructor(public translate: TranslateService) {
    }

    ngOnInit() {
    }
}
