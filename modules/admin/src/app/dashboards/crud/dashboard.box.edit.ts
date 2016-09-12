import { Component } from "@angular/core";
import { TranslatePipe } from "ng2-translate/ng2-translate";
import { CORE_DIRECTIVES } from "@angular/common";
import { ROUTER_DIRECTIVES } from "@angular/router";
import { Router, ActivatedRoute } from "@angular/router";
import { DashboardService } from "../dashboardService";
import { DashboardBox } from "../models/dashboardBox";

@Component({
    selector: 'dashboard-crud-edit',
    template: require('./dashboard.crud.edit.view.html'),
    styles: [
        require('./dashboard.crud.edit.view.scss')
    ],
    directives: [
        ROUTER_DIRECTIVES,
        CORE_DIRECTIVES
    ],
    pipes: [TranslatePipe]
})
export class DashboardCrudEdit {
    constructor(public router: Router,
                public route:ActivatedRoute,
                private dashboardService: DashboardService){

    }

    ngOnInit(){
        console.log(this.route.data);
        /*this.dashboardService.getDashboardBox(this.route.snapshot.data['edit']).then((res:DashboardBox) => {
            console.log(res);
        });*/
    }
}
