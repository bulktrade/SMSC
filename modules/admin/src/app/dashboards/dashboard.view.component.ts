import { Component } from "@angular/core";
import { TranslatePipe, TranslateService } from "ng2-translate/ng2-translate";
import { CORE_DIRECTIVES } from "@angular/common";
import { ROUTER_DIRECTIVES, ActivatedRoute } from "@angular/router";
import { Breadcrumb } from "../breadcrumb/breadcrumb.component";
import { Dragula, DragulaService } from "ng2-dragula/ng2-dragula";
import { DropdownDirective } from "ng2-bootstrap/components/dropdown";

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
    pipes: [TranslatePipe],
//    encapsulation: ViewEncapsulation.Native
})
export class DashboardView {
    private drakes: Array<string> = ["status-bag", "chart-bag"];
    private static resizeActive:boolean = false;
    public startResize:boolean = false;

    constructor(public translate:TranslateService,
                public breadcrumb:Breadcrumb,
                private dragulaService:DragulaService) {
        dragulaService.setOptions('status-bag', {
            direction: 'horizontal'
        });
        dragulaService.setOptions('chart-bag', {
            direction: 'horizontal'
        });

            //  Add drake bags
        this.drakes.map((item) => {
            dragulaService.find(item).drake.on('drag', this.onDrag);
        });
    }

    onDrag(el, source){
            //  Cancel all drags
        if(DashboardView.resizeActive){
            source.cancel();
        }
    }

    resizeStart(){
        DashboardView.resizeActive = true;
    }

    resizeStop(){
        DashboardView.resizeActive = false;
    }
}
