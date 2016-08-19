import { Component, Input, Injectable, trigger, style, animate, state, transition } from "@angular/core";
import { TranslateService, TranslatePipe } from "ng2-translate/ng2-translate";
import { AnimateBox } from "./directives/animate";
import { NgClass, NgFor } from "@angular/common";
import { ActiveItem } from "./directives/active";
import { FaAngleLeft } from "./directives/FaAngleLeft";
import { ShowMiniNav } from "./ShowMiniNav";
import { LocalStorage } from "angular2-localstorage/WebStorage";
import { MdIcon } from "@angular2-material/icon/icon";
import { Router, ROUTER_DIRECTIVES } from "@angular/router";

declare var Reflect;

@Component({
    selector: 'sidebar-item',
    template: require('./sidebaritem.html'),
    providers: [],
    directives: [
        ActiveItem,
        FaAngleLeft,
        ROUTER_DIRECTIVES
    ],
    pipes: [ TranslatePipe ],
    animations: [
        trigger('state', [
            state('closed', style({ height: 0 })),
            state('open', style({ height: '*' })),
            transition('closed => open', [ animate('200ms ease-out') ]),
            transition('open => closed', [ animate('200ms ease-out') ])
        ]),
    ],
    styles: [
        require('./sidebaritem.scss')
    ]
})

@Injectable()
export class SidebarItem {
    public store = localStorage;

    @LocalStorage('icnDsh') public icnDsh:boolean;
    @LocalStorage('icnGsm') public icnGsm:boolean;

    @Input('icon') public icon;
    @Input('path') public path;
    @Input('paramsAsDefault') public paramsAsDefault;
    @Input('nameItem') public nameItem;
    @Input('showInSubNavigation') public showInSubNavigation;
    @Input('submenu') public submenu;
    @Input('toggle') public toggle;

    constructor(public translate:TranslateService,
                public showmininav:ShowMiniNav,
                public router:Router) {
    }

    ngOnInit() {
    }

    getStorageItem(item) {
        return this[ item.substring(1, item.length) ];
    }

    setToggle(name) {
        this[ name.substring(1, name.length) ] = !this[ name.substring(1, name.length) ];
    }

}
