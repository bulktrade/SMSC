import {Component} from 'angular2/core';
import {MCCMNCGrid} from './directives/mccmnc-grid';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {Router} from 'angular2/router';

@Component({
    selector: 'mccmnc',
    templateUrl: 'app/components/mccmnc/mccmnc.html',
    styles: [
        require('./mccmnc.scss'),
        require('../../../assets/css/theme/breadcrumb.scss'),
    ],
    providers: [],
    directives: [MCCMNCGrid],
    pipes: [TranslatePipe]
})
export class MCCMNC {

    constructor(public translate: TranslateService,  public router: Router) {}

    ngOnInit() {

    }

}