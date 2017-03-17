import {Component, Input, HostBinding, HostListener, Renderer, ElementRef} from "@angular/core";
import {DashboardBox} from "./dashboard-box.model";
import {DashboardBoxService} from "./dashboard-box.service";

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

    constructor(public dashboardBoxService: DashboardBoxService,
                public renderer: Renderer,
                public element: ElementRef) {
    }

    ngOnInit() {
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
