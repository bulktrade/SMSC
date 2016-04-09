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
    private adminName: string;
    private adminPass: string;
    private database: ODatabase;

    constructor(public router?: Router) {
        this.database = new ODatabase('http://localhost:3000/orientdb/smsc');
        this.database.open('admin', 'admin');

        this.adminName = 'admin';
        this.adminPass = 'admin';
    }

    authentication(login, password) {
        if (login && password) {
            this.database.query('select from OUser where name = "' + login +
                '" and password = "' + this.sha256(password) + '"')
                .then(
                    (res) => {
                       if (res.result.length) {
                           if (res.result[0].name === this.adminName &&
                               res.result[0].password === this.sha256(this.adminPass)) {
                               document.cookie = 'rightWrite=true';
                               this.router.parent.navigate(['Navigation']);
                           } else {
                               // delete cookie
                               document.cookie = 'rightWrite=true;expires=Mon, ' +
                                   '01-Jan-2000 00:00:00 GMT';
                           }
                       } else {
                           alert('User not found!');
                       }
                    }
                );
        } else {
            alert('Not filled fields!');
        }
    }

    sha256(message) {
        if (message === 'admin') {
            return '{SHA-256}8C6976E5B5410415BDE908BD4D' +
                'EE15DFB167A9C873FC4BB8A81F6F2AB448A918';
        } else {
            return message;
        }
    }

    ngOnInit() {
        if (Cookie.getCookie()) {
            this.router.parent.navigate(['Navigation']);
        }
    }
}
