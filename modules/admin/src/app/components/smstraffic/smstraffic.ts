import {Component} from 'angular2/core';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {Router} from 'angular2/router';

@Component({
    selector: 'smstraffic',
    templateUrl: 'app/components/smstraffic/smstraffic.html',
    styles: [
        require('./smstraffic.scss'),
        require('../../../assets/css/theme/breadcrumb.scss')
    ],
    providers: [],
    directives: [],
    pipes: [TranslatePipe]
})
export class SMSTraffic {

    constructor(public translate: TranslateService, public router: Router) {}

    ngOnInit() {

    }

}