import {Component} from 'angular2/core';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';

@Component({
    selector: 'smpp',
    templateUrl: 'app/components/smpp/smpp.html',
    styleUrls: ['app/components/smpp/smpp.css'],
    providers: [],
    directives: [],
    pipes: [TranslatePipe]
})
export class SMPP {

    constructor(public translate: TranslateService) {}

    ngOnInit() {

    }

}