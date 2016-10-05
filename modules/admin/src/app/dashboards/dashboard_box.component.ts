import { Component, Input, ViewEncapsulation, Output, EventEmitter, HostListener } from "@angular/core";
import { DashboardBoxConfig } from "./dashboard_box.config";
import { SidebarService } from "../sidebar/sidebarService";
import { DashboardResizeConfig } from "./dashboard_resize.config";
import { BrowserDomAdapter } from "@angular/platform-browser/src/browser/browser_adapter";
import { BoxResize } from "./models/dashboard_box.enum";
import {Chart} from "./chart/chart.loader";
import {TrafficChartService} from "./chart/chart.service";

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
    public config: DashboardBoxConfig = null;

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
    public doughnutData: Array<Object>;
    public chart: any;

    constructor(private sidebarService: SidebarService,
                private trafficChartService:TrafficChartService) {
        this.doughnutData = trafficChartService.getData();
    }

    ngAfterViewInit() {
        this._loadDoughnutCharts();
    }

    private _loadDoughnutCharts() {
        let config = {
            type: 'doughnut',
            data: {
                labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                segmentShowStroke: false,
                percentageInnerCutout : 64,
                responsive: true,
                maintainAspectRatio: false,
                scaleShowLabels: false,
                legend: {
                    display: false
                },
                onResize: () => {
                    console.log('resize');
                }
            }
        };
        let el = $(`.content[data-boxrid="${this.config.rid}"] .chart-area`).get(0);
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
        this.chart.update();
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
