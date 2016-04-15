import {Component} from 'angular2/core';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';

@Component({
    selector: 'api',
    templateUrl: 'app/components/api/api.html',
    styleUrls: ['app/components/api/api.css'],
    providers: [TranslateService],
    directives: [],
    pipes : [TranslatePipe]
})
export class API {
    select: boolean;
    btnName: string;

    constructor(public translate: TranslateService) {
        this.select = false;
        this.btnName = 'ru';

        this.translate.setDefaultLang('en');
        this.translate.use('en');
    }

    translateBtn() {
        if (this.select) {
            this.translate.use('en');
            this.btnName = 'ru';
        } else {
            this.translate.use('ru');
            this.btnName = 'en';
        }
        this.select = !this.select;
    }

    ngOnInit() {

    }

}