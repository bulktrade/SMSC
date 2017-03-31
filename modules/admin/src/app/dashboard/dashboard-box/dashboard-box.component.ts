import {Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, Output, Renderer2} from "@angular/core";
import {DashboardBox, Height, Width} from "./dashboard-box.model";
import {DashboardBoxService} from "./dashboard-box.service";
import {DashboardBoxType, Kind} from "../dashboard-box-type/dashboard-box-type.model";
import {CHART_DATA} from "./chart-data";
import {ActivatedRoute} from "@angular/router";
import * as _clone from "js.clone";

@Component({
    selector: 'dashboard-box',
    templateUrl: 'dashboard-box.component.html',
    styleUrls: ['dashboard-box.component.scss']
})
export class DashboardBoxComponent {

    @Output('loadInit') public loadInit: EventEmitter<any> = new EventEmitter();

    @Output('loadEnd') public loadEnd: EventEmitter<any> = new EventEmitter();

    @Input('dashboardBox') public dashboardBox: DashboardBox = null;

    @HostBinding('class.fullscreen') public fullscreen: boolean = false;

    @HostBinding('class') public hostClasses = 'ui-g-12 ui-md-6';

    public dashboardBoxType: DashboardBoxType = null;

    public isSettings: boolean = false;

    public chartData = CHART_DATA;

    public dashboardId: number = null;

    public displayDialog: boolean = false;

    public dashboardBoxModel: DashboardBox = null;

    constructor(public dashboardBoxService: DashboardBoxService,
                public renderer: Renderer2,
                public element: ElementRef,
                public route: ActivatedRoute) {
    }

    ngOnInit() {
        this.dashboardId = Number(this.route.snapshot.paramMap.get('id'));
        this.dashboardBoxType = this.dashboardBox.dashboardBoxType;
        delete this.dashboardBox.dashboardBoxType;
        this.widthChange(<Width>(this.dashboardBox.width));
        this.heightChange(<Height>(this.dashboardBox.height));
        this.dashboardBoxModel = _clone(this.dashboardBox);
    }

    onFullscreenMode() {
        this.fullscreen = !this.fullscreen;
    }

    toggleSettings() {
        this.isSettings = !this.isSettings;
    }

    onHeightChange(event) {
        this.heightChange(event.value);
        this.dashboardBoxService.updateResource(this.dashboardBox).subscribe();
    }

    onWidthChange(event) {
        this.widthChange(event.value);
        this.dashboardBoxService.updateResource(this.dashboardBox).subscribe();
    }

    onModelChange(dashboardBox: DashboardBox) {
        this.dashboardBox = dashboardBox;
        this.widthChange(dashboardBox.width);
        this.heightChange(dashboardBox.height);
    }

    toggleDialog() {
        this.displayDialog = !this.displayDialog;
    }

    widthChange(width: Width) {
        switch (String(width)) {
            case 'WIDTH_25':
                this.hostClasses = 'ui-g-12 ui-md-3';
                break;
            case 'WIDTH_50':
                this.hostClasses = 'ui-g-12 ui-md-6';
                break;
            case 'WIDTH_75':
                this.hostClasses = 'ui-g-12 ui-md-9';
                break;
            case 'WIDTH_100':
                this.hostClasses = 'ui-g-12 ui-md-12';
                break;
        }
    }

    heightChange(height: Height) {
        switch (String(height)) {
            case 'HEIGHT_25':
                this.renderer.setStyle(this.element.nativeElement, 'height', '146px');
                break;
            case 'HEIGHT_50':
                this.renderer.setStyle(this.element.nativeElement, 'height', '312px');
                break;
            case 'HEIGHT_75':
                this.renderer.setStyle(this.element.nativeElement, 'height', '476px');
                break;
            case 'HEIGHT_100':
                this.renderer.setStyle(this.element.nativeElement, 'height', '644px');
                break;
        }
    }

    getKindOfChart(kind: Kind): string {
        switch (String(kind)) {
            case 'PIE_CHART':
                return 'pie';
            case 'SERIAL_CHART':
                return 'doughnut';
            case 'LINE_CHART':
                return 'line';
            case 'BAR_CHART':
                return 'bar';
            case 'BUBBLE_CHART':
                return 'bubble';
            default:
                return null;
        }
    }

    @HostListener('document:keydown', ['$event'])
    onKeyboard(event: KeyboardEvent) {
        if (event.code === 'Escape' && this.fullscreen) {
            this.onFullscreenMode();
        }
    }
}
