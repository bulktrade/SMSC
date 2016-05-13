import {Component, Input} from 'angular2/core';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {AnimateBox} from './directives/animate';
import {NgClass, NgFor} from 'angular2/common';
import {ActiveItem} from './directives/active';
import {FaAngleLeft} from './directives/FaAngleLeft';
import {ShowMiniNav} from './ShowMiniNav';
import {LocalStorage} from '../../../assets/js/angular2-localstorage/WebStorage';

@Component({
    selector: 'sidebar-item',
    templateUrl: 'app/components/sidebar/sidebaritem.html',
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
export class SidebarItem {
    @LocalStorage() public icnGsm:boolean;
    @LocalStorage() public icnDsh:boolean;

    @Input('nameItem') nameItem;
    @Input('showInSubNavigation') showInSubNavigation;

    constructor(public translate:TranslateService, public showmininav:ShowMiniNav) {
    }

    ngOnInit() {
    }

}
