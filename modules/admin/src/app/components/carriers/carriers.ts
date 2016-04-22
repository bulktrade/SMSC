import {Component} from 'angular2/core';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {Router} from 'angular2/router';

@Component({
    selector: 'carriers',
    templateUrl: 'app/components/carriers/carriers.html',
    styleUrls: [
        'app/components/carriers/carriers.css',
        'assets/css/theme/breadcrumb.css'
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