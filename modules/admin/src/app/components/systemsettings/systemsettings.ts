import {Component} from 'angular2/core';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';

@Component({
    selector: 'systemsettings',
    templateUrl: 'app/components/systemsettings/systemsettings.html',
    styleUrls: ['app/components/systemsettings/systemsettings.css'],
    providers: [],
    directives: [],
    pipes: [TranslatePipe]
})
export class SystemSettings {

    constructor(public translate: TranslateService) {}

    ngOnInit() {

    }

}