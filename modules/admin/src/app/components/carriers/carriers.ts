import {Component} from 'angular2/core';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {Router} from 'angular2/router';
import {Breadcrumb} from '../breadcrumb/breadcrumb';

@Component({
    selector: 'carriers',
    templateUrl: 'app/components/carriers/carriers.html',
    styles: [
        require('./carriers.scss')
    ],
    providers: [],
    directives: [Breadcrumb],
    pipes: [TranslatePipe]
})
export class Carriers {

    constructor(public translate: TranslateService,  public router: Router) {}

    ngOnInit() {

    }

}