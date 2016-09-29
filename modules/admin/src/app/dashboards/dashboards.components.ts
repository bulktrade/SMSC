import { Component, NgModule } from "@angular/core";
import { Breadcrumb } from "../breadcrumb/breadcrumb.component";

@Component({
    selector: 'dashboard',
    providers: [Breadcrumb],
    template: '<loading-router-outlet></loading-router-outlet>'
})
export class Dashboards {
    constructor() {
    }
}
