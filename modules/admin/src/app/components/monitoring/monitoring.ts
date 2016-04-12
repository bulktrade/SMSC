import {Component} from 'angular2/core';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';

@Component({
    selector: 'monitoring',
    templateUrl: 'app/components/monitoring/monitoring.html',
    styleUrls: ['app/components/monitoring/monitoring.css'],
    providers: [],
    directives: [],
    pipes: [TranslatePipe]
})
export class Monitoring {

    constructor(public translate: TranslateService) {}

    ngOnInit() {

    }

}