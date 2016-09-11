import { Component, ViewEncapsulation, Input } from "@angular/core";
import { TranslatePipe, TranslateService } from "ng2-translate/ng2-translate";
import { CORE_DIRECTIVES } from "@angular/common";
import { ROUTER_DIRECTIVES, ActivatedRoute } from "@angular/router";
import { Breadcrumb } from "../breadcrumb/breadcrumb.component";
import { Dragula, DragulaService } from "ng2-dragula/ng2-dragula";
import { DropdownDirective } from "ng2-bootstrap/components/dropdown";
import { DashboardService } from "./dashboardService";
import { BrowserDomAdapter } from '@angular/platform-browser/src/browser/browser_adapter';
import { OrderBy } from "./sorts/orderby";

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
    public boxes:Object = {
        container: {
            width: new Array(),
            height: new Array()
        },
        remove: new Array()
    };
    public boxesArr:Array<any> = new Array();
    private firstAdd:boolean = false;
    private testArr:Array = new Array('', '');

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
            this.onDrop(value.slice(1));
        });

        this.dashboardService.getDashboardBoxes().then((res) => {
            let orderBy:OrderBy = new OrderBy();
            this.boxesArr = orderBy.transform(res, {key: 'order', direction: 'ascending'});
            this.updateClasses();
            //this.boxes.container.height[0] = 'height-0';
            //this.boxes.container.width[0] = 'width-3';
        });
    }

    /**
     * Update boxes order
     *
     * @param $event
     */
    onDrop($event){
        //this.updateClasses();
        let dom:BrowserDomAdapter = new BrowserDomAdapter();

        let boxList:Array<any> = dom.querySelectorAll(dom.query('#dashboard'), 'div.box');
        let boxList_:Array<any> = Array.prototype.slice.call(boxList);

        for(let item of boxList){
            let boxRid:string = dom.getData(item, 'boxRid');

            for(let originItemKey in this.boxesArr){
                if(this.boxesArr[originItemKey]['metaData']['rid'] == boxRid){
                    let domBoxIndex:number = boxList_.indexOf(item);

                    this.boxesArr[originItemKey].order = domBoxIndex;
                }
            }
        }

        //  Update boxes order and update @version of current box array
        this.dashboardService.batchUpdateDashboardBox(this.boxesArr).then((res) => {
            console.log(res);
            for(let originKey in this.boxesArr){
                for(let item of res){
                    if(this.boxesArr[originKey]['metaData']['rid'] == item['metaData']['rid']){
                        this.boxesArr[originKey]['metaData']['version'] = item['metaData']['version'];
                    }
                }
            }
        });
    }

    /**
     * Resize box, add width class to box element, update DB and update @version boxes array
     * @param width
     * @param boxName
     * @param item
     * @param index
     */
    resizeBox(val:Object, index:number, item:any){
        let widthClass, heightClass:string;

        if(val.type == 'width'){
            widthClass = this.getBoxClass(val.width, val.type);
            heightClass = this.getBoxClass(val.height, 'height');
        }

        if(val.type == 'height'){
            heightClass = this.getBoxClass(val.height, val.type);
            widthClass = this.getBoxClass(val.width, 'width');
        }

        this.boxes.container.width[index] = widthClass;
        this.boxes.container.height[index] = heightClass;

        if(item != undefined){
            this.dashboardService.updateBoxSize({width: val.width, height: val.height}, item).then((res) => {
                this.boxesArr[index]['metaData']['version'] = res['@version'];
                this.boxesArr[index]['width'] = res['width'];
                this.boxesArr[index]['height'] = res['height'];
            });
        }
    }

    getBoxClass(val:number, type:string){
        switch(val){
            case 25:
                return type + '-0';

                break;
            case 50:
                return type + '-1';

                break;
            case 75:
                return type + '-2';

                break;
            case 100:
                return type + '-3';

                break;
        }
    }

    updateClasses(){
        for(let key in this.boxesArr){
            //continue;
            let width:number = this.getBoxClass(this.boxesArr[key].width, 'width');
            let height:number = this.getBoxClass(this.boxesArr[key].height, 'height');

            this.boxes.container.width[key] = width;
            this.boxes.container.height[key] = height;
            this.boxes.remove[key] = '';
        }
    }

    /**
     * Remove box from DB. Before deleting start animation
     *
     * @param rid
     */
    removeBox(rid:string, index:number){
            //  Set listener for deleted box
        let dom:BrowserDomAdapter = new BrowserDomAdapter();
        let removedObject = dom.querySelector(dom.query('#dashboard'), 'div.box[data-boxRid="'+ rid +'"]');

            //  Update current boxes list after end of transition
        dom.on(removedObject, 'transitionend', (e) => {
            this.boxesArr.splice(index, 1);
            this.boxes.container.width.splice(index, 1);
            this.boxes.container.height.splice(index, 1);
            this.boxes.remove.splice(index, 1);

        });
        this.boxes.remove[index] = 'removeBox';

        //this.dashboardService.deleteBox(rid);
    }
}
