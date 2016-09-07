import { Component, ViewEncapsulation, Input } from "@angular/core";
import { TranslatePipe, TranslateService } from "ng2-translate/ng2-translate";
import { CORE_DIRECTIVES } from "@angular/common";
import { ROUTER_DIRECTIVES, ActivatedRoute } from "@angular/router";
import { Breadcrumb } from "../breadcrumb/breadcrumb.component";
import { Dragula, DragulaService } from "ng2-dragula/ng2-dragula";
import { DropdownDirective } from "ng2-bootstrap/components/dropdown";
import { DashboardService } from "./dashboardService";

@Component({
    selector: 'dashboard-view',
    providers: [Breadcrumb],
    template: require('./dashboard.view.html'),
    styles: [
        require('./dashboard.view.scss')
    ],
    directives: [
        ROUTER_DIRECTIVES,
        CORE_DIRECTIVES,
        Breadcrumb,
        Dragula,
        DropdownDirective
    ],
    viewProviders: [
        DragulaService
    ],
    pipes: [TranslatePipe]
})
export class DashboardView {
    private drakes:Array<string> = ["status-bag", "chart-bag"];
    public boxes:Object = {};
    public boxesArr:Object = {
        status: new Array(),
        chart: new Array()
    };

    constructor(public translate:TranslateService,
                public breadcrumb:Breadcrumb,
                private dragulaService:DragulaService,
                private  dashboardService:DashboardService) {
        dragulaService.setOptions('status-bag', {
            direction: 'horizontal'
        });
        dragulaService.setOptions('chart-bag', {
            direction: 'horizontal'
        });

        this.dashboardService.getDashboardBoxes('status').then((res) => {
            this.boxesArr.status = res;
        });
        this.dashboardService.getDashboardBoxes('chart').then((res) => {
            this.boxesArr.chart = res;
        });
    }

    onDrag(el, source){
            //  Cancel all drags
        if(DashboardView.resizeActive){
            source.cancel();
        }
    }

    resizeBox(width:number, boxName:string, item:any){
        switch(width){
            case 25:
                this.boxes[boxName] = 'width-0';

                break;
            case 50:
                this.boxes[boxName] = 'width-1';

                break;
            case 75:
                this.boxes[boxName] = 'width-2';

                break;
            case 100:
                this.boxes[boxName] = 'width-3';

                break;
        }

        if(item != undefined) this.dashboardService.updateBoxWidth(width, item);
    }

    removeBox(rid:string){
        this.dashboardService.deleteBox(rid);
    }
}
