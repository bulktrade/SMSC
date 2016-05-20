import {Component, Input} from '@angular/core';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {AnimateBox} from './directives/animate';
import {NgClass, NgFor} from '@angular/common';
import {ActiveItem} from './directives/active';
import {FaAngleLeft} from './directives/FaAngleLeft';
import {ShowMiniNav} from './ShowMiniNav';
import { Injectable } from '@angular/core';
import {LocalStorage} from "angular2-localStorage/WebStorage";

declare var Reflect;

@Component({
    selector: 'sidebar-item',
    templateUrl: 'app/sidebar/sidebaritem.html',
    styles: [
        require('./sidebaritem.scss')
    ],
    providers: [],
    directives: [
        ROUTER_DIRECTIVES,
        AnimateBox,
        NgClass,
        ActiveItem,
        FaAngleLeft,
        NgFor
    ],
    pipes: [TranslatePipe]
})

@Injectable()
export class SidebarItem {
    public store = localStorage;

    @LocalStorage() public icnDsh:boolean;
    @LocalStorage() public icnGsm:boolean;

    @Input('icon') public icon;
    @Input('nameItem') public nameItem;
    @Input('showInSubNavigation') public showInSubNavigation;
    @Input() public submenu;
    @Input() public toggle;

    constructor(public translate:TranslateService, public showmininav:ShowMiniNav) {
    }

    ngOnInit() {
    }

    getStorageItem(item) {
        if (localStorage.getItem(item) === null) {
            return undefined;
        } else {
            return localStorage.getItem(item) === 'true' ? true : false;
        }
    }

    setToggle(name) {
        this[name.substring(1, name.length)] = !this[name.substring(1, name.length)];
    }

}
