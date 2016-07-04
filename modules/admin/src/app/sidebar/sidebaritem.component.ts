import {Component, Input} from '@angular/core';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {AnimateBox} from './directives/animate';
import {NgClass, NgFor} from '@angular/common';
import {ActiveItem} from './directives/active';
import {FaAngleLeft} from './directives/FaAngleLeft';
import {ShowMiniNav} from './ShowMiniNav';
import { Injectable } from '@angular/core';
import {LocalStorage} from 'angular2-localStorage/WebStorage';
import {MdIcon} from '@angular2-material/icon/icon';

import {trigger, style, animate, state, transition} from '@angular/core';

declare var Reflect;

@Component({
    selector: 'sidebar-item',
    template: require('./sidebaritem.html'),
    styleUrls: [
        require('./sidebaritem.scss').toString()
    ],
    providers: [],
    directives: [
        ROUTER_DIRECTIVES,
        AnimateBox,
        NgClass,
        ActiveItem,
        FaAngleLeft,
        NgFor,
        MdIcon
    ],
    pipes: [TranslatePipe],
    animations: [
    trigger('state', [
        state('active', style({ height: '0' })),
        transition('active => hidden', [
            animate('200ms ease-out'),
        ]),
        transition('hidden => active', [
            animate('200ms ease-out'),
        ]),
    ]),
  ]
})

@Injectable()
export class SidebarItem {
    public store = localStorage;

    @LocalStorage() public icnDsh: boolean;
    @LocalStorage() public icnGsm: boolean;

    @Input('icon') public icon;
    @Input('nameItem') public nameItem;
    @Input('showInSubNavigation') public showInSubNavigation;
    @Input() public submenu;
    @Input() public toggle;

    constructor(public translate: TranslateService, public showmininav: ShowMiniNav) {
    }

    ngOnInit() {
    }

    getStorageItem(item) {
        if (localStorage.getItem(item) === undefined) {
            return undefined;
        } else {
            return localStorage.getItem(item) === 'true' ? true : false;
        }
    }

    setToggle(name) {
        this[name.substring(1, name.length)] = !this[name.substring(1, name.length)];
    }

}
