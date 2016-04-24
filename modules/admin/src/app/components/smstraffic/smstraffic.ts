import {Component} from 'angular2/core';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {Router} from 'angular2/router';
import {Breadcrumb} from '../breadcrumb/breadcrumb';

@Component({
    selector: 'smstraffic',
    templateUrl: 'app/components/smstraffic/smstraffic.html',
    styles: [
        require('./smstraffic.scss')
    ],
    providers: [],
    directives: [Breadcrumb],
    pipes: [TranslatePipe]
})
export class SMSTraffic {

    constructor(public translate: TranslateService, public router: Router) {}

    ngOnInit() {

    }

}