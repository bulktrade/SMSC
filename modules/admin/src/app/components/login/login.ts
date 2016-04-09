import {Component} from 'angular2/core';
import {ODatabase} from './../../../Service/OrientDB';
import {Router, RouterLink, ROUTER_DIRECTIVES} from 'angular2/router';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {Cookie} from './cookie';

@Component({
    selector: 'login',
    providers: [],
    templateUrl: 'app/components/login/login.html',
    styleUrls: ['app/components/login/login.css'],
    directives: [RouterLink, CORE_DIRECTIVES, FORM_DIRECTIVES, ROUTER_DIRECTIVES],
    pipes: []
})

export class Login {
    private database:ODatabase;

    constructor(public router?:Router) {
        this.database = new ODatabase('http://localhost:3000/orientdb/smsc');
    }

    authentication(login, password) {
        if (login && password) {
            this.database.open(login, password)
                .then(
                    (res) => {
                        console.log("Result: ", res);
                        document.cookie = 'rightWrite=true';
                        this.router.parent.navigate(['Navigation']);
                    }
                )
                .catch(
                    (err) => {
                        console.log("Error: ", err);
                        // delete cookie
                        document.cookie = 'rightWrite=true;expires=Mon, ' +
                            '01-Jan-2000 00:00:00 GMT';
                    }
                );
        } else {
            alert('Not filled fields!');
        }
    }

    ngOnInit() {
        if (Cookie.getCookie()) {
            this.router.parent.navigate(['Navigation']);
        }
    }
}
