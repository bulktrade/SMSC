import {Component} from 'angular2/core';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {Router} from 'angular2/router';

@Component({
    selector: 'carriers',
    templateUrl: 'app/components/carriers/carriers.html',
    styles: [
        require('./carriers.scss'),
        require('../../../assets/css/theme/breadcrumb.scss'),
    ],
    providers: [],
    directives: [],
    pipes: [TranslatePipe]
})
export class Carriers {

    constructor(public translate: TranslateService,  public router: Router) {}

    ngOnInit() {

    }

}