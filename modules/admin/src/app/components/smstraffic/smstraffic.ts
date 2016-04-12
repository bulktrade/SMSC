import {Component} from 'angular2/core';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';

@Component({
    selector: 'smstraffic',
    templateUrl: 'app/components/smstraffic/smstraffic.html',
    styleUrls: ['app/components/smstraffic/smstraffic.css'],
    providers: [],
    directives: [],
    pipes: [TranslatePipe]
})
export class SMSTraffic {

    constructor(public translate: TranslateService) {}

    ngOnInit() {

    }

}