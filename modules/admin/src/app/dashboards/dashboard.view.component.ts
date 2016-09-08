import { Component, ViewEncapsulation, Input } from "@angular/core";
import { TranslatePipe, TranslateService } from "ng2-translate/ng2-translate";
import { CORE_DIRECTIVES } from "@angular/common";
import { ROUTER_DIRECTIVES, ActivatedRoute } from "@angular/router";
import { Breadcrumb } from "../breadcrumb/breadcrumb.component";
import { Dragula, DragulaService } from "ng2-dragula/ng2-dragula";
import { DropdownDirective } from "ng2-bootstrap/components/dropdown";
import { DashboardService } from "./dashboardService";
import { BrowserDomAdapter } from '@angular/platform-browser/src/browser/browser_adapter';

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
    public boxesArr:Array<any> = new Array();

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

        dragulaService.drop.subscribe((value) => {
            console.log(value);
            this.onDrop(value.slice(1));
        });

        this.dashboardService.getDashboardBoxes().then((res) => {
            this.boxesArr = res;
        });
    }

    onDrop($event){
        let dom:BrowserDomAdapter = new BrowserDomAdapter();

        let boxList:Array<any> = dom.querySelectorAll(dom.query('#dashboard'), 'div.box');
        let boxList_:Array<any> = Array.prototype.slice.call(boxList);

        for(let item of boxList){
            let boxRid:string = dom.getData(item, 'boxRid');

            for(let originItemKey in this.boxesArr){
                if(this.boxesArr[originItemKey]['@rid'] == boxRid){
                    let domBoxIndex:number = boxList_.indexOf(item);

                    this.boxesArr[originItemKey].order = domBoxIndex;
                }
            }
        }

        this.dashboardService.batchUpdate(this.boxesArr);
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

    /**
     * Remove box from DB. Before deleting start animation
     *
     * @param rid
     */
    removeBox(rid:string, index:number, boxName:string){
        let dom:BrowserDomAdapter = new BrowserDomAdapter();
        let removedObject = dom.querySelector(dom.query('#dashboard'), 'div.box[data-boxRid="'+ rid +'"]');
        console.log(removedObject);
        dom.on(removedObject, 'transitionend', (e) => {
            this.boxes[boxName] = '';
            this.boxesArr.splice(index, 1);
            console.log('remove');
        });
        this.boxes[boxName] = 'removeBox';

        //this.boxesArr.splice(index, 1);
        //this.dashboardService.deleteBox(rid);
    }
}
