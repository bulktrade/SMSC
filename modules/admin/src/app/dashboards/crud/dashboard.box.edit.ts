import { Component } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { DashboardService } from "../dashboardService";

@Component({
    selector: 'dashboard-crud-edit',
    template: require('./dashboard.crud.edit.view.html'),
    styleUrls: [
        require('./dashboard.crud.edit.view.scss')
    ]
})
export class DashboardCrudEdit {
    constructor(public router: Router,
                public route: ActivatedRoute,
                private dashboardService: DashboardService) {

    }

    ngOnInit() {
        console.log(this.route.snapshot.data['edit']);
        /*this.dashboardService.getDashboardBox(this.route.snapshot.data['edit']).then((res:DashboardBox) => {
         console.log(res);
         });*/
    }
}
