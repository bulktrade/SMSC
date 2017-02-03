import { Component } from "@angular/core";
import { TranslateService } from "ng2-translate/ng2-translate";
import { BreadcrumbComponent } from "../breadcrumb/breadcrumb.component";

@Component({
    providers: [BreadcrumbComponent],
    selector: 'customers',
    template: ''
})

export class CustomersComponent {
    constructor(public translate: TranslateService) {
    }

    ngOnInit() {
    }
}
