import { Component, Input, ViewEncapsulation, Output, EventEmitter, HostListener } from "@angular/core";
import { SidebarService } from "../sidebar/sidebarService";
import {Chart} from "./chart/chart.loader";
import {TrafficChartService} from "./chart/chart.service";
import {DashboardBoxConfig} from "./dashboardBoxConfig";
import {BoxResize} from "./models/dashboardBoxEnum";
import {BrowserDomAdapter} from "@angular/platform-browser/src/browser/browser_adapter";
import {DashboardResizeConfig} from "./dashboardResizeConfig";

@Component({
    selector: 'dashboard-box',
    template: require('./dashboard_box.html'),
    styleUrls: [
        require('./dashboard_box.scss')
    ],
    encapsulation: ViewEncapsulation.None
})
export class DashboardBoxComponent {
    @Input('config')
    public config: DashboardBoxConfig = <DashboardBoxConfig>{};

    @Output('resizeBox')
    public resizeBox: EventEmitter<Object> = new EventEmitter<Object>();

    @Output('removeBox')
    public removeBox: EventEmitter<number> = new EventEmitter<number>();

    @Output('editBox')
    public editBox: EventEmitter<number> = new EventEmitter<number>();

    public crudOpen: boolean = false;
    public viewWidthOpen: boolean = false;
    public fullscreenMode: boolean = false;
    public statusBoxWidth: number = 25;
    public statusBoxHeight: number = 25;
    public boxResize: BoxResize = BoxResize;
    public doughnutData: Array<Object> = [];
    public chart: any;

    constructor(private sidebarService: SidebarService,
                private trafficChartService:TrafficChartService) {
        this.doughnutData = trafficChartService.getData();
    }

    ngAfterViewInit() {
        if(this.config.type == 'chart'){
            this._loadDoughnutCharts();
        }
    }

    public _loadDoughnutCharts() {
        let config = this.trafficChartService.getConfig('bubble')
        let el = $(`.content[data-boxrid="${this.config.rid}"] .chart-area`)[0];
        let ctx = el.getContext('2d');
        this.chart = new Chart(ctx, config);
    }

    ngOnInit() {
        if (this.config.width != undefined) {
            this.statusBoxWidth = this.config.width;
        }

        if (this.config.height != undefined) {
            this.statusBoxHeight = this.config.height;
        }
    }

    @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        event.stopImmediatePropagation();

        if (event.key == 'Escape' && this.fullscreenMode == true) {
            this.toggleFullscreen();
        }
    }

    /**
     * Toggle fullscreen for dashboard box.
     */
    toggleFullscreen() {
        this.sidebarService.toggleSidenav().then(() => {
            let dom: BrowserDomAdapter = new BrowserDomAdapter();

            if (this.fullscreenMode) {
                dom.removeStyle(dom.query('.md-sidenav-content'), 'overflow');
                dom.removeClass(dom.query('.header'), 'fullscreen-header');
            } else {
                dom.setStyle(dom.query('.md-sidenav-content'), 'overflow', 'hidden');
                dom.addClass(dom.query('.header'), 'fullscreen-header');
            }

            this.fullscreenMode = !this.fullscreenMode;
            this.sidebarService.fullScreenMode = this.fullscreenMode;
        });
    }

    /**
     * Emit resize box event
     *
     * @param data - object data
     * {
     *  val - resize value
     *  type - resize direction(width, height)
     * }
     */
    emitResizeBox(data: Object) {
        let res: DashboardResizeConfig = <DashboardResizeConfig>{};
        res.type = data['type'];
        res.chart = this.chart;

        if (data['type'] == BoxResize.WIDTH) {
            res.width = data['val'];
            res.height = this.statusBoxHeight;

            this.statusBoxWidth = data['val'];
        }

        if (data['type'] == BoxResize.HEIGHT) {
            res.width = this.statusBoxWidth;
            res.height = data['val'];

            this.statusBoxHeight = data['val'];
        }

        this.resizeBox.emit(res);
    }

    /**
     * Emit remove box event
     */
    emitRemoveBox() {
        this.removeBox.emit();
    }

    /**
     * Emit edit box event
     */
    emitEditBox() {
        this.editBox.emit();
    }
}
