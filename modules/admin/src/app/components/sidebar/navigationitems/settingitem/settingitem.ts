import {Component, Input} from 'angular2/core';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {FaAngleLeft} from './../../directives/FaAngleLeft';
import {ActiveItem} from './../../directives/active';
import {NgClass} from 'angular2/common';
import {AnimateBox} from './../../directives/animate';

@Component({
    selector: 'setting-item',
    templateUrl: 'app/components/sidebar/navigationitems/settingitem/settingitem.html',
    styles: [
        require('./settingitem.scss')
    ],
    directives: [
        ROUTER_DIRECTIVES,
        AnimateBox,
        NgClass,
        ActiveItem,
        FaAngleLeft
    ],
    pipes: [TranslatePipe]
})
export class SettingItem {
    @Input() showNav:boolean;

    constructor(public translate: TranslateService) {
    }

    ngOnInit() {
    }

}