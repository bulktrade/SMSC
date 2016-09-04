import { Component, Input, Injectable, trigger, style, animate, state, transition } from "@angular/core";
import { TranslateService } from "ng2-translate/ng2-translate";
import { ShowMiniNav } from "./ShowMiniNav";
import { Router } from "@angular/router";

declare var Reflect;

@Component({
    selector: 'sidebar-item',
    template: require('./sidebaritem.html'),
    providers: [],
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

    // @LocalStorage('icnDsh') public icnDsh:boolean; @todo do not use local storage
    // @LocalStorage('icnGsm') public icnGsm:boolean; @todo do not use local storage

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
