import {Component} from 'angular2/core';
import {Router} from "angular2/router";
import {LocalStorage} from '../login/localstorage';

@Component({
    selector: 'notfound',
    templateUrl: 'app/components/notfound/notfound.html',
    styleUrls: ['app/components/notfound/notfound.css'],
    providers: [],
    directives: [],
    pipes: []
})

export class NotFound {

    constructor(public router: Router) {
    }

    ngOnInit() {
    }

    toHome() {
        if (LocalStorage.getLocalStorage()) {
            this.router.parent.navigate(['./Navigation', 'SMSTraffic']);
        } else {
            this.router.parent.navigate(['./Login']);
        }
    }

}