import {Component, Input} from '@angular/core';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
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

require('./sidebaritem.scss');

@Component({
    selector: 'sidebar-item',
    template: require('./sidebaritem.html'),
    providers: [],
    directives: [
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
      state('closed', style({ height: 0 })),
      state('open', style({ height: '*' })),
      transition('closed => open', [ animate('200ms ease-out') ]),
      transition('open => closed', [ animate('200ms ease-out') ])
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
        return this[item.substring(1, item.length)];
    }

    setToggle(name) {
        this[name.substring(1, name.length)] = !this[name.substring(1, name.length)];
    }

}
