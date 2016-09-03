import { Component, Input, ViewEncapsulation } from "@angular/core";
import { TranslatePipe } from "ng2-translate/ng2-translate";
import { DashboardBoxConfig } from "./dashboard.box.config";
import { SidebarService } from "../sidebar/sidebarService";

@Component({
    selector: 'dashboard-box',
    template: require('./dashboard.box.html'),
    styles: [
        require('./dashboard.box.scss')
    ],
    pipes: [TranslatePipe],
    encapsulation: ViewEncapsulation.None
})
export class DashboardBox {
    @Input('config')
    public config:DashboardBoxConfig;

    public fullscreenMode:boolean = false;

    constructor(private sidebarService:SidebarService) {

    }

    ngOnInit() {

    }

    /**
     * Toggle fullscreen for dashboard box.
     */
    toggleFullscreen() {
        this.sidebarService.toggleSidenav().then(() => {
            this.fullscreenMode = !this.fullscreenMode;
            this.sidebarService.fullScreenMode = this.fullscreenMode;
        });
    }
}
