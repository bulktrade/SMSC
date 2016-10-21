import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';

@Component({
    selector: 'dashboard',
    providers: [BreadcrumbComponent],
    template: '<loading-router-outlet></loading-router-outlet>',
})
export class DashboardComponent {
    constructor() {
    }
}
