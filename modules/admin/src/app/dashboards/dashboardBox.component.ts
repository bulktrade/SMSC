import {
    Component,
    Input,
    ViewEncapsulation,
    Output,
    EventEmitter,
    HostListener
} from '@angular/core';
import { DashboardBoxConfig } from './dashboardBox.config';
import { SidebarService } from '../sidebar/sidebarService';
import { DashboardResizeConfig } from './dashboardResize.config';
import { BrowserDomAdapter } from '@angular/platform-browser/src/browser/browser_adapter';
import { BoxResize } from './models/dashboardBox.enum';

@Component({
    selector: 'dashboard-box',
    template: require('./dashboardBox.html'),
    styleUrls: [
        require('./dashboardBox.scss')
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

    constructor(private sidebarService: SidebarService) {
    }

    ngOnInit() {
        if (this.config.width !== undefined) {
            this.statusBoxWidth = this.config.width;
        }

        if (this.config.height !== undefined) {
            this.statusBoxHeight = this.config.height;
        }
    }

    @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        event.stopImmediatePropagation();

        if (event.key === 'Escape' && this.fullscreenMode === true) {
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

        if (data['type'] === BoxResize.WIDTH) {
            res.width = data['val'];
            res.height = this.statusBoxHeight;

            this.statusBoxWidth = data['val'];
        }

        if (data['type'] === BoxResize.HEIGHT) {
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
