import {Component} from 'angular2/core';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {FaAngleLeft} from './../../directives/FaAngleLeft';
import {ActiveItem} from './../../directives/active';
import {NgClass} from 'angular2/common';
import {AnimateBox} from './../../directives/animate';
import {ShowMiniNav} from '../../ShowMiniNav';

@Component({
    selector: 'finances-item',
    templateUrl: 'app/components/sidebar/navigationitems/financesitem/financesitem.html',
    styles: [
        require('./financesitem.scss')
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
export class FinancesItem {
    constructor(public translate: TranslateService,  public showmininav: ShowMiniNav) {
    }

    ngOnInit() {
    }
}