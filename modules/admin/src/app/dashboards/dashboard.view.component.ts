import { Component } from "@angular/core";
import { TranslateService } from "ng2-translate/ng2-translate";
import { Router } from "@angular/router";
import { DragulaService } from "ng2-dragula/ng2-dragula";
import { DashboardService } from "./dashboardService";
import { BrowserDomAdapter } from "@angular/platform-browser/src/browser/browser_adapter";
import { OrderBy } from "./sorts/orderby";
import { DropdownDirective } from "ng2-bootstrap/ng2-bootstrap";
import { DashboardList } from "./models/dashboard.list";
import { DashboardBoxConfig } from "./dashboard.box.config";
import { DashboardBox } from "./models/dashboardBox";
import { DashboardListItem } from "./models/dashboard.list.item.ts";
import { BoxResize } from "./models/dashboard.box.enum";
import { DashboardResizeConfig } from "./dashboard.resize.config";
import { CrudService } from "../crud/crud.service";
import { Response } from "@angular/http";
import { BoxSizes } from "./models/dashboard.box.sizes";

@Component({
    selector: 'dashboard-view',
    template: require('./dashboard.view.html'),
    styleUrls: [
        require('./dashboard.view.scss')
    ],
    directives: [
        DropdownDirective
    ],
    pipes: [OrderBy],
    viewProviders: [
        DragulaService
    ]
})
export class DashboardView {
    private drakes: Array<string> = ["status-bag", "chart-bag"];
    public boxes: DashboardList<string> = new DashboardList<string>(0);
    public boxesArr: DashboardListItem<DashboardBox> = new DashboardListItem<DashboardBox>();
    private testArr: Array<String> = ['', ''];

    constructor(public translate: TranslateService,
                private dragulaService: DragulaService,
                private  dashboardService: DashboardService,
                private router: Router,
                public crudService: CrudService) {
        dragulaService.setOptions('status-bag', {
            direction: 'horizontal'
        });
        dragulaService.setOptions('chart-bag', {
            direction: 'horizontal'
        });

        dragulaService.drop.subscribe((value) => {
            this.onDrop(value.slice(1));
        });

        this.dashboardService.getDashboardBoxes().subscribe((res) => {
            this.boxes = new DashboardList<string>(res.length);
            this.boxesArr = new DashboardListItem();
            let orderBy: OrderBy = new OrderBy();
            this.boxesArr.merge(orderBy.transform(res, { key: 'order', direction: 'ascending' }));

            this.updateClasses();
        });
    }

    /**
     * Update boxes order
     *
     * @param $event
     */
    onDrop($event) {
        let dom: BrowserDomAdapter = new BrowserDomAdapter();

        let boxList: Array<any> = dom.querySelectorAll(dom.query('#dashboard'), 'div.box');
        let boxList_: Array<any> = Array.prototype.slice.call(boxList);

        for (let item of boxList) {
            let boxRid: string = dom.getData(item, 'boxRid');

            for (let originItemKey:number in this.boxesArr.getAll()) {
                if (this.boxesArr.getItem(originItemKey)['metaData']['rid'] == boxRid) {
                    let domBoxIndex: number = boxList_.indexOf(item);

                    this.boxesArr.getItem(originItemKey).order = domBoxIndex;
                }
            }
        }

        //  Update boxes order and update @version of current box array
        this.dashboardService.batchUpdateDashboardBox(this.boxesArr.getAll()).subscribe((res) => {
            for (let originKey:number in this.boxesArr.getAll()) {
                for (let item of res) {
                    if (this.boxesArr.getItem(originKey)['metaData']['rid'] == item['metaData']['rid']) {
                        this.boxesArr.getItem(originKey)['metaData']['version'] = item['metaData']['version'];
                    }
                }
            }
        });
    }

    /**
     * Resize box, add width class to box element, update DB and update @version boxes array
     *
     * @param width
     * @param boxName
     * @param item
     * @param index
     */
    resizeBox(val: DashboardResizeConfig, index: number, item: any) {
        let widthClass, heightClass, type: string;

        type = <string>val.type;

        if (val.type == BoxResize.Width) {
            widthClass = this.getBoxClass(val.width, type);
            heightClass = this.getBoxClass(val.height, 'height');
        }

        if (val.type == BoxResize.Height) {
            heightClass = this.getBoxClass(val.height, type);
            widthClass = this.getBoxClass(val.width, 'width');
        }

        this.boxes.width.setItem(widthClass, index);
        this.boxes.height.setItem(heightClass, index);

        if (item != undefined) {
            this.dashboardService.updateBoxSize({ width: val.width, height: val.height }, item).subscribe((res) => {
                this.boxesArr.getItem(index)['metaData']['version'] = res['@version'];
                this.boxesArr.getItem(index)['width'] = res['width'];
                this.boxesArr.getItem(index)['height'] = res['height'];
            });
        }
    }

    /**
     * Get box class by it size(height or width)
     *
     * height = 25 -> height-m
     * width = 100 -> width-xl
     *
     * @param val
     * @param type
     * @returns {string}
     */
    getBoxClass(val: number, type: string):string {
        switch (val) {
            case 25:
                return type + '-' + BoxSizes.M;

                break;
            case 50:
                return type + '-' + BoxSizes.S;

                break;
            case 75:
                return type + '-' + BoxSizes.L;

                break;
            case 100:
                return type + '-' + BoxSizes.XL;

                break;
        }
    }

    /**
     * Update box classes
     */
    updateClasses() {
        for (let key:number in this.boxesArr.getAll()) {
            let width: string = this.getBoxClass(this.boxesArr.getItem(key).width, 'width');
            let height: string = this.getBoxClass(this.boxesArr.getItem(key).height, 'height');

            this.boxes.width.setItem(width, key);
            this.boxes.height.setItem(height, key);
            this.boxes.remove.setItem('', key);
        }
    }

    /**
     * Remove box from DB. Before deleting start animation
     *
     * @param rid
     */
    removeBox(box: DashboardBox, index: number) {
        //  Set listener for deleted box
        let dom: BrowserDomAdapter = new BrowserDomAdapter();
        let removedObject = dom.querySelector(dom.query('#dashboard'), 'div.box[data-boxRid="' + box.metaData.rid + '"]');

        //  Update current boxes list after end of transition
        dom.on(removedObject, 'transitionend', (e) => {
            this.boxesArr.removeItem(index);
            this.boxes.width.removeItem(index);
            this.boxes.height.removeItem(index);
            this.boxes.remove.removeItem(index);

            //  Remove box
            this.dashboardService.deleteBox(box);

        });
        this.boxes.remove.setItem('removeBox', index);
    }

    /**
     * Edit box event
     *
     * Open edit page to corresponding edit box
     */
    editBox(rid: string) {
        this.router.navigate(['/dashboard/edit', rid]);
    }

    /**
     * Navigate to create page
     */
    createBox(){
        this.router.navigate(['/dashboard/create', 'DashboardBox']);
    }
}
