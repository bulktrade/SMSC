import {Component} from 'angular2/core';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';

@Component({
    selector: 'dlrtraffic',
    templateUrl: 'app/components/dlrtraffic/dlrtraffic.html',
    styleUrls: ['app/components/dlrtraffic/dlrtraffic.html'],
    providers: [],
    directives: [],
    pipes: [TranslatePipe]
})
export class DLRTraffic {

    constructor(public translate: TranslateService) {}

    ngOnInit() {

    }

}