import {ROUTER_DIRECTIVES} from '@angular/router';
import {Component} from '@angular/core';
import {TranslatePipe, TranslateService} from 'ng2-translate/ng2-translate';
import {CORE_DIRECTIVES} from '@angular/common';

@Component({
    selector: 'gsm',
    providers: [],
    template: require('./gsm.html'),
    styleUrls: [
        // require('./gsm.scss')
    ],
    directives: [ROUTER_DIRECTIVES, CORE_DIRECTIVES],
    pipes: [TranslatePipe]
})

export class GSM {

    constructor(public translate: TranslateService) {
    }

}
