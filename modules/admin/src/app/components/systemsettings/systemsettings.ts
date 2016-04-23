import {Component} from 'angular2/core';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {Router} from 'angular2/router';

@Component({
    selector: 'systemsettings',
    templateUrl: 'app/components/systemsettings/systemsettings.html',
    styles: [
        require('./systemsettings.scss'),
        require('../../../assets/css/theme/breadcrumb.scss')
    ],
    providers: [],
    directives: [],
    pipes: [TranslatePipe]
})
export class SystemSettings {

    constructor(public translate: TranslateService, public router: Router) {}

    ngOnInit() {

    }

}