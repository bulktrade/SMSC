import { Component } from "@angular/core";
import { TranslateService } from "ng2-translate/ng2-translate";
import { Router } from "@angular/router";
import { DragulaService } from "ng2-dragula/ng2-dragula";
import { DashboardService } from "./dashboardService";
import { BrowserDomAdapter } from "@angular/platform-browser/src/browser/browser_adapter";
import { OrderBy } from "./sorts/orderby";
import { DashboardList } from "./models/dashboard_list";
import { DashboardBox } from "./models/dashboardBox";
import { BoxResize } from "./models/dashboard_box.enum";
import { DashboardResizeConfig } from "./dashboard_resize.config";
import { CrudService } from "../crud/crud.service";
import { BoxSizes } from "./models/dashboard_box.sizes";
import { DashboardListItem } from "./models/dashboard_list_item";
import {Breadcrumb} from "../breadcrumb/breadcrumb.component";

@Component({
    selector: 'dashboard-view',
    template: require('./dashboard_view.html'),
    styleUrls: [
        require('./dashboard_view.scss')
    ],
    viewProviders: [
        DragulaService
    ],
})
export class DashboardView {
    public boxesCss: DashboardList<string> = new DashboardList<string>();
    public boxes: DashboardListItem<DashboardBox> = new DashboardListItem<DashboardBox>();

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
            this.boxesCss = new DashboardList<string>();
            this.boxes = new DashboardListItem<DashboardBox>();
            let orderBy: OrderBy = new OrderBy();
            this.boxes.merge(orderBy.transform(res, { key: 'order', direction: 'ascending' }));

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

            for (let originItemKey in this.boxes.getAll()) {
                if (this.boxes.getItem(originItemKey)['metaData']['rid'] == boxRid) {
                    let domBoxIndex: number = boxList_.indexOf(item);

                    this.boxes.getItem(originItemKey).order = domBoxIndex;
                }
            }
        }

        //  Update boxes order and update @version of current box array
        this.dashboardService.batchUpdateDashboardBox(this.boxes.getAll()).subscribe((res) => {
            for (let originKey in this.boxes.getAll()) {
                for (let item of res) {
                    if (this.boxes.getItem(originKey)['metaData']['rid'] == item['metaData']['rid']) {
                        this.boxes.getItem(originKey)['metaData']['version'] = item['metaData']['version'];
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
        let widthClass, heightClass: string;
        let type: BoxResize = val.type;

        if (val.type == BoxResize.WIDTH) {
            widthClass = this.getBoxClass(val.width, <string>type);
            heightClass = this.getBoxClass(val.height, 'height');
        }

        if (val.type == BoxResize.HEIGHT) {
            heightClass = this.getBoxClass(val.height, <string>type);
            widthClass = this.getBoxClass(val.width, 'width');
        }

        this.boxesCss.width.setItem(widthClass, index);
        this.boxesCss.height.setItem(heightClass, index);

        if (item != undefined) {
            this.dashboardService.updateBoxSize({ width: val.width, height: val.height }, item).subscribe((res) => {
                this.boxes.getItem(index)['metaData']['version'] = res['@version'];
                this.boxes.getItem(index)['width'] = res['width'];
                this.boxes.getItem(index)['height'] = res['height'];
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
    getBoxClass(val: number, type: string): string {
        switch (val) {
            case 25:
                return type + '-' + BoxSizes.M;
            case 50:
                return type + '-' + BoxSizes.S;
            case 75:
                return type + '-' + BoxSizes.L;
            case 100:
                return type + '-' + BoxSizes.XL;
        }
    }

    /**
     * Update box classes
     */
    updateClasses() {
        for (let key in this.boxes.getAll()) {
            let width: string = this.getBoxClass(this.boxes.getItem(key).width, 'width');
            let height: string = this.getBoxClass(this.boxes.getItem(key).height, 'height');

            this.boxesCss.width.setItem(width, key);
            this.boxesCss.height.setItem(height, key);
            this.boxesCss.remove.setItem('', key);
        }
    }

    /**
     * Remove box from DB. Before deleting start animation
     *
     * @param rid
     */
    removeBox(box: DashboardBox, index: string) {
        //  Set listener for deleted box
        let dom: BrowserDomAdapter = new BrowserDomAdapter();
        let removedObject = dom.querySelector(dom.query('#dashboard'), 'div.box[data-boxRid="' + box.metaData.rid + '"]');

        //  Update current boxes list after end of transition
        dom.on(removedObject, 'transitionend', (e) => {
            this.boxes.removeItem(index);
            this.boxesCss.width.removeItem(index);
            this.boxesCss.height.removeItem(index);
            this.boxesCss.remove.removeItem(index);

            //  Remove box
            this.dashboardService.deleteBox(box);

        });
        this.boxesCss.remove.setItem('removeBox', index);
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
    createBox() {
        this.router.navigate(['/dashboard/create', 'DashboardBox']);
    }
}
