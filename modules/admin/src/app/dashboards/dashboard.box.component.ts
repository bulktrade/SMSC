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
    public statusBoxHeight:number = 25;

    constructor(private sidebarService:SidebarService) {
    }

    ngOnInit() {
        if (this.config.width != undefined) {
            this.statusBoxWidth = this.config.width;
        }

        if (this.config.height != undefined) {
            this.statusBoxHeight = this.config.height;
            console.log(this.config.height);
        }
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

    emitResizeBox(data:void) {
        let res:Object = {
            type: data.type;
        }

        if (data.type == 'width') {
            res.width = data.val;
            res.height = this.statusBoxHeight;

            this.statusBoxWidth = data.val;
        }

        if (data.type == 'height') {
            res.width = this.statusBoxWidth;
            res.height = data.val;

            this.statusBoxHeight = data.val;
        }

        this.resizeBox.emit(res);
    }

    emitRemoveBox() {
        this.removeBox.emit();
    }
}
