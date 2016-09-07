import { Component, Input, ViewEncapsulation, Output, EventEmitter } from "@angular/core";
import { TranslatePipe } from "ng2-translate/ng2-translate";
import { DashboardBoxConfig } from "./dashboard.box.config";
import { SidebarService } from "../sidebar/sidebarService";
import { OrderBy } from "./sorts/orderby";

@Component({
    selector: 'dashboard-box',
    template: require('./dashboard.box.html'),
    styles: [
        require('./dashboard.box.scss')
    ],
    pipes: [TranslatePipe, OrderBy],
    encapsulation: ViewEncapsulation.None
})
export class DashboardBoxComponent {
    @Input('config')
    public config:DashboardBoxConfig;

    @Output('resizeBox')
    public resizeBox:EventEmitter<number> = new EventEmitter();

    @Output('removeBox')
    public removeBox:EventEmitter<number> = new EventEmitter();

    public crudOpen:boolean = false;
    public viewWidthOpen:boolean = false;
    public fullscreenMode:boolean = false;
    public statusBoxWidth:number = 25;

    constructor(private sidebarService:SidebarService) {
    }

    ngOnInit(){
        this.statusBoxWidth = this.config.width;
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

    emitResizeBox(width:number):void {
        this.statusBoxWidth = width;
        this.resizeBox.emit(width);
    }

    emitRemoveBox(){
        this.removeBox.emit();
    }
}
