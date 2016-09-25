import { Component, Input, ViewEncapsulation, Output, EventEmitter, HostListener } from "@angular/core";
import { DashboardBoxConfig } from "./dashboard.box.config";
import { SidebarService } from "../sidebar/sidebarService";
import { BoxResize } from "./models/dashboard.box.enum.ts";
import { DashboardResizeConfig } from "./dashboard.resize.config";
import { BrowserDomAdapter } from "@angular/platform-browser/src/browser/browser_adapter";

@Component({
    selector: 'dashboard-box',
    template: require('./dashboard.box.html'),
    styleUrls: [
        require('./dashboard.box.scss')
    ],
    encapsulation: ViewEncapsulation.None
})
export class DashboardBoxComponent {
    @Input('config')
    public config: DashboardBoxConfig = null;

    @Output('resizeBox')
    public resizeBox: EventEmitter<Object> = new EventEmitter();

    @Output('removeBox')
    public removeBox: EventEmitter<number> = new EventEmitter();

    @Output('editBox')
    public editBox: EventEmitter<number> = new EventEmitter();

    public crudOpen: boolean = false;
    public viewWidthOpen: boolean = false;
    public fullscreenMode: boolean = false;
    public statusBoxWidth: number = 25;
    public statusBoxHeight: number = 25;
    public boxResize: BoxResize;

    constructor(private sidebarService: SidebarService) {
        this.boxResize = BoxResize;
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

        if(event.key == 'Escape' && this.fullscreenMode == true){
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

        if (data['type'] == BoxResize.Width) {
            res.width = data['val'];
            res.height = this.statusBoxHeight;

            this.statusBoxWidth = data['val'];
        }

        if (data['type'] == BoxResize.Height) {
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
