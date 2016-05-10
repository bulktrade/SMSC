import {Component, Input} from 'angular2/core';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {FaAngleLeft} from './../../directives/FaAngleLeft';
import {ActiveItem} from './../../directives/active';
import {NgClass} from 'angular2/common';
import {AnimateBox} from './../../directives/animate';
import {LocalStorage} from '../../../../../assets/js/angular2-localstorage/WebStorage';

@Component({
    selector: 'gsm-item',
    templateUrl: 'app/components/sidebar/navigationitems/gsmitem/gsmitem.html',
    styles: [
        require('./gsmitem.scss')
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
export class GSMItem {
    @Input() showNav:boolean;
    @LocalStorage()
    public icnDsh:boolean;

    constructor(public translate: TranslateService) {
    }

    ngOnInit() {
    }

}