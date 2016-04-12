import {Component} from 'angular2/core';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';

@Component({
    selector: 'finances',
    templateUrl: 'app/components/finances/finances.html',
    styleUrls: ['app/components/finances/finances.css'],
    providers: [],
    directives: [],
    pipes: [TranslatePipe]
})
export class Finances {

    constructor(public translate: TranslateService) {}

    ngOnInit() {

    }

}