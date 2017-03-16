import {Component, Input, HostBinding, Inject, HostListener} from "@angular/core";
import {DashboardBox} from "./dashboard-box.model";
import {DOCUMENT} from "@angular/platform-browser";

@Component({
    selector: 'dashboard-box',
    templateUrl: 'dashboard-box.component.html',
    styleUrls: ['dashboard-box.component.scss']
})
export class DashboardBoxComponent {

    @Input('dashboardBox') public dashboardBox: DashboardBox;

    @HostBinding('class.fullscreen') fullscreen: boolean = false;

    isSettings: boolean = false;

    constructor(@Inject(DOCUMENT) public document) {
    }

    onFullscreenMode() {
        if (this.fullscreen) {
            this.document.querySelector('#navigation-window .topbar').style.display = 'block';
            this.fullscreen = false;
        } else {
            this.document.querySelector('#navigation-window .topbar').style.display = 'none';
            this.fullscreen = true;
        }
    }

    toggleSettings() {
        this.isSettings = !this.isSettings;
    }

    @HostListener('document:keydown', ['$event'])
    onKeyboard(event: KeyboardEvent) {
        if (event.code === 'Escape' && this.fullscreen) {
            this.onFullscreenMode();
        }
    }
}
