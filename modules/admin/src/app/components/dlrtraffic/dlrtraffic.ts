import {Component} from 'angular2/core';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {Router} from 'angular2/router';
import {Breadcrumb} from '../breadcrumb/breadcrumb';

@Component({
    selector: 'dlrtraffic',
    templateUrl: 'app/components/dlrtraffic/dlrtraffic.html',
    styles: [
        require('./dlrtraffic.scss')
    ],
    providers: [],
    directives: [Breadcrumb],
    pipes: [TranslatePipe]
})
export class DLRTraffic {

    constructor(public translate: TranslateService, public router: Router) {}

    ngOnInit() {

    }

}