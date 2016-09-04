import { Component, Input, ViewEncapsulation, ViewChild } from "@angular/core";
import { TranslatePipe } from "ng2-translate/ng2-translate";
import { DashboardBoxConfig } from "./dashboard.box.config";
import { SidebarService } from "../sidebar/sidebarService";
import { ResizeEvent } from 'angular2-resizable';
import { BrowserDomAdapter } from '@angular/platform-browser/src/browser/browser_adapter';

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

    @ViewChild('box')
    private box;

    public crudOpen:boolean = false;
    public fullscreenMode:boolean = false;
    public resizeStart:boolean = false;

    constructor(private sidebarService:SidebarService) {

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

    public style:Object = {};

    validate(event:ResizeEvent):boolean {
        const MIN_DIMENSIONS_PX:number = 50;
        if (event.rectangle.width < MIN_DIMENSIONS_PX || event.rectangle.height < MIN_DIMENSIONS_PX) {
            return false;
        }

        return true;
    }

    onResizeEnd(event:ResizeEvent):void {
        let dom:BrowserDomAdapter = new BrowserDomAdapter();
        let width:number = Math.ceil(event.rectangle.width / dom.query('#dashboard').offsetWidth * 100);

        if (width > 35) {
            width = 50;
        } else {
            width = 25;
        }

        //  Get flex item
        dom.setStyle(this.box.nativeElement.parentElement.parentElement, 'flex-basis', `${width}%`);

        /*this.style = {
         'width': `${width}%`,
         }*/

        this.resizeStart = false;
    }

    start(event:ResizeEvent) {
        this.resizeStart = true;

        let dom:BrowserDomAdapter = new BrowserDomAdapter();
        let width:number = Math.ceil(event.rectangle.width / dom.query('#dashboard').offsetWidth * 100);
        let itemWidth:number = this.box.nativeElement.parentElement.parentElement.offsetWidth;

        dom.setStyle(dom.querySelector(this.box.nativeElement, '.innerWrap:last-child'), 'width', `${itemWidth}px`);
        //dom.setStyle(this.box.nativeElement.parentElement.parentElement, 'flex-basis', `25%`);
    }

    resize(event:ResizeEvent) {
        let dom:BrowserDomAdapter = new BrowserDomAdapter();
        let width:number = Math.ceil(event.rectangle.width / dom.query('#dashboard').offsetWidth * 100);

        dom.setStyle(this.box.nativeElement.parentElement.parentElement, 'flex-basis', `${width}%`);
    }
}
