import {Component, Input} from '@angular/core';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {AnimateBox} from './directives/animate';
import {NgClass, NgFor} from '@angular/common';
import {ActiveItem} from './directives/active';
import {FaAngleLeft} from './directives/FaAngleLeft';
import {ShowMiniNav} from './ShowMiniNav';
import {LocalStorage} from '../../assets/js/angular2-localstorage/WebStorage';
import { Injectable } from '@angular/core';

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
    
    constructor(public translate:TranslateService, public showmininav:ShowMiniNav) {
        
    }

    ngOnInit() {
        console.log(this['icnDs']);
    }

    getStorageItem(item) {
        if (localStorage.getItem(item) === null) {
            return undefined;
        } else {
            return localStorage.getItem(item) === 'true' ? true : false;
        }
    }

}
