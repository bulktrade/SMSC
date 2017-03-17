import {Component, Input, HostBinding, HostListener, Renderer, ElementRef} from "@angular/core";
import {DashboardBox} from "./dashboard-box.model";
import {DashboardBoxService} from "./dashboard-box.service";
import {DashboardBoxTypeService} from "../dashboard-box-type/dashboard-box-type.service";
import {DashboardBoxType} from "../dashboard-box-type/dashboard-box-type.model";

@Component({
    selector: 'dashboard-box',
    templateUrl: 'dashboard-box.component.html',
    styleUrls: ['dashboard-box.component.scss']
})
export class DashboardBoxComponent {

    @Input('dashboardBox') public dashboardBox: DashboardBox;

    @HostBinding('class.fullscreen') public fullscreen: boolean = false;

    @HostBinding('class') public hostClasses = 'col-lg-3 col-md-3 col-sm-6 col-xs-12';

    public isSettings: boolean = false;

    public dashboardBoxType: DashboardBoxType = <DashboardBoxType>{};

    public data: any;

    constructor(public dashboardBoxService: DashboardBoxService,
                public renderer: Renderer,
                public element: ElementRef,
                public dashboardBoxTypeService: DashboardBoxTypeService) {
        this.data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'First Dataset',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    borderColor: '#4bc0c0'
                },
                {
                    label: 'Second Dataset',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    borderColor: '#565656'
                }
            ]
        }
    }

    ngOnInit() {
        this.dashboardBoxTypeService.getDashboardBoxType(this.dashboardBox)
            .subscribe((_dashboardBoxType: DashboardBoxType) => {
                this.dashboardBoxType = _dashboardBoxType;
            });

        this.widthChange(String(this.dashboardBox.width));
        this.heightChange(String(this.dashboardBox.height));
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

    widthChange(width: string) {
        switch (width) {
            case 'WIDTH_25':
                this.hostClasses = 'col-lg-3 col-md-3 col-sm-6 col-xs-12';
                break;
            case 'WIDTH_50':
                this.hostClasses = 'col-lg-6 col-md-6 col-sm-6 col-xs-12';
                break;
            case 'WIDTH_75':
                this.hostClasses = 'col-lg-9 col-md-9 col-sm-6 col-xs-12';
                break;
            case 'WIDTH_100':
                this.hostClasses = 'col-lg-12 col-md-12 col-sm-6 col-xs-12';
                break;
        }
    }

    heightChange(height: string) {
        switch (height) {
            case 'HEIGHT_25':
                this.renderer.setElementStyle(this.element.nativeElement, 'height', '146px');
                break;
            case 'HEIGHT_50':
                this.renderer.setElementStyle(this.element.nativeElement, 'height', '312px');
                break;
            case 'HEIGHT_75':
                this.renderer.setElementStyle(this.element.nativeElement, 'height', '476px');
                break;
            case 'HEIGHT_100':
                this.renderer.setElementStyle(this.element.nativeElement, 'height', '644px');
                break;
        }
    }

    @HostListener('document:keydown', ['$event'])
    onKeyboard(event: KeyboardEvent) {
        if (event.code === 'Escape' && this.fullscreen) {
            this.onFullscreenMode();
        }
    }
}
