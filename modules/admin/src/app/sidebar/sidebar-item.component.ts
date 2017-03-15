import {Component, Input, trigger, style, animate, state, transition} from "@angular/core";
import {DashboardService} from "../dashboard/dashboard.service";
import {Dashboard} from "../dashboard/dashboard.model";
import {Router} from "@angular/router";

@Component({
    selector: 'sidebar-item',
    templateUrl: './sidebar-item.component.html',
    providers: [],
    animations: [
        trigger('state', [
            state('closed', style({height: 0})),
            state('open', style({height: '*'})),
            transition('closed => open', [animate('200ms ease-out')]),
            transition('open => closed', [animate('200ms ease-out')])
        ]),
    ],
    styleUrls: ['./sidebar-item.component.scss']
})
export class SidebarItemComponent {
    @Input('icon') public icon;

    @Input('path') public path;

    @Input('paramsAsDefault') public paramsAsDefault;

    @Input('nameItem') public nameItem;

    @Input('showInSubNavigation') public showInSubNavigation;

    @Input('submenu') public submenu;

    @Input('toggle') public toggle;

    public dashboards: Dashboard[] = [];

    public navItemState: boolean[] = [];

    constructor(public dashboardService: DashboardService,
                public router: Router) {
    }

    isActive(instruction: any[]): boolean {
        return this.router.isActive(this.router.createUrlTree(instruction), true);
    }

    ngOnInit() {
        this.dashboardService.onResourceChange.subscribe(() => this.updateDashboards());
        this.updateDashboards();
    }

    updateDashboards() {
        this.dashboardService.getDashboards().subscribe((_dashboards: Dashboard[]) => this.dashboards = _dashboards);
    }
}
