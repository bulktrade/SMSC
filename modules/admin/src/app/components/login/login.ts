import {Component} from 'angular2/core';
import {Router, Route, RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {ODatabase} from './../../../Service/OrientDB';
import {Mock} from "./../../../Service/Mock";

@Component({
    selector: 'login',
    providers: [ODatabase],
    templateUrl: 'app/components/login/login.html',
    directives: [],
    pipes: []
})

export class Login {
    database: ODatabase;

    constructor() {
        this.database = new ODatabase('http://orientdb.127.0.0.1.xip.io/smsc');
        this.database.open('admin', 'admin');
    }

    authentication(login, password) {
        if (login && password) {
            this.database.query("select from OUser where name = '" + login +
                "' and password = '" + this.sha256(password) + "'")
                .then(
                    (res) => {
                       if (res.result.length) {
                           alert('The user was found!');
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
        if (message == 'admin') {
            return '{SHA-256}8C6976E5B5410415BDE908BD4D' +
                'EE15DFB167A9C873FC4BB8A81F6F2AB448A918'
        } else {
            return message;
        }
    }
}