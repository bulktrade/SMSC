import { Component } from '@angular/core';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { Router, ActivatedRoute } from '@angular/router';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { DashboardService } from './dashboard.service';
import { BrowserDomAdapter } from '@angular/platform-browser/src/browser/browser_adapter';
import { DashboardList } from './models/dashboard-list';
import { DashboardBox } from './models/dashboard-box';
import { CrudService } from '../crud/crud.service';
import { BoxSizes } from './models/dashboard-box-sizes';
import { DashboardListItem } from './models/dashboard-list-item';
import { DashboardResizeConfig } from './dashboard-resize-config';
import { BoxResize } from './models/dashboard-box-enum';

@Component({
    selector: 'dashboard-view',
    template: require('./dashboard-view.component.html'),
    styleUrls: [
        require('./dashboard-view.component.scss')
    ],
    viewProviders: [
        DragulaService
    ],
})
export class DashboardViewComponent {
    public boxesCss: DashboardList<string> = new DashboardList<string>();
    public boxes: DashboardListItem<DashboardBox> = new DashboardListItem<DashboardBox>();

    constructor(public translate: TranslateService,
                private dragulaService: DragulaService,
                private  dashboardService: DashboardService,
                private router: Router,
                public crudService: CrudService,
                private route: ActivatedRoute) {
        dragulaService.setOptions('status-bag', {
            direction: 'horizontal',
            moves: function (el, container, handle) {
                let className = handle.className + '';

                if (handle.className.indexOf === undefined)
                    return false;

                return handle.className.indexOf('md-header') !== -1;
            }
        });

        dragulaService.drop.subscribe((value) => {
            this.onDrop(value.slice(1));
        });
    }

    ngOnInit() {
        this.route.data.subscribe((res) => {
            this.boxesCss = res['data'].hasOwnProperty('boxesCss') ? res['data'].boxesCss :
                new DashboardList<string>();
            this.boxes = res['data'].hasOwnProperty('boxes') ? res['data'].boxes :
                new DashboardListItem<DashboardBox>();
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
        let _boxList: Array<any> = Array.prototype.slice.call(boxList);

        for (let item of boxList) {
            let boxRid: string = dom.getData(item, 'boxRid');

            for (let originItemKey in this.boxes.getAll()) {
                if (this.boxes.getItem(originItemKey)['metaData']['rid'] === boxRid) {
                    let domBoxIndex: number = _boxList.indexOf(item);

                    this.boxes.getItem(originItemKey).order = domBoxIndex;
                }
            }
        }

        this.dashboardService.batchUpdateDashboardBox(this.boxes.getAll()).subscribe((res) => {
            for (let originKey in this.boxes.getAll()) {
                if (this.boxes.getAll().hasOwnProperty(originKey)) {
                    for (let item of res) {
                        if (this.boxes.getItem(originKey)['metaData']['rid']
                            === item['metaData']['rid']) {
                            this.boxes.getItem(originKey)['metaData']['version'] =
                                item['metaData']['version'];
                        }
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
    public resizeBox(val: DashboardResizeConfig, index: number, item: any) {
        let widthClass, heightClass: string;
        let type: BoxResize = val.type;

        if (val.type === BoxResize.WIDTH) {
            widthClass = this.getBoxClass(val.width, <string>type);
            heightClass = this.getBoxClass(val.height, 'height');
        }

        if (val.type === BoxResize.HEIGHT) {
            heightClass = this.getBoxClass(val.height, <string>type);
            widthClass = this.getBoxClass(val.width, 'width');
        }

        this.boxesCss.width.setItem(widthClass, index);
        this.boxesCss.height.setItem(heightClass, index);

        if (item !== undefined) {
            this.dashboardService.updateBoxSize({ width: val.width, height: val.height },
                item).subscribe((res) => {
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
            default:
                break;
        }
    }

    /**
     * Update box classes
     */
    updateClasses() {
        for (let key in this.boxes.getAll()) {
            if (this.boxes.getAll().hasOwnProperty(key)) {
                let width: string = this.getBoxClass(this.boxes.getItem(key).width, 'width');
                let height: string = this.getBoxClass(this.boxes.getItem(key).height, 'height');

                this.boxesCss.width.setItem(width, key);
                this.boxesCss.height.setItem(height, key);
                this.boxesCss.remove.setItem('', key);
            }
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
        let removedObject = dom.querySelector(dom.query('#dashboard'),
            'div.box[data-boxRid="' + box.metaData.rid + '"]');

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
        this.dashboardService.getDashboard().subscribe((res) => {
            this.router.navigate(['/dashboard/create', 'DashboardBox', res.metaData.rid]);
        });
    }
}
