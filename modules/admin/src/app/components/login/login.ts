import {Component} from 'angular2/core';
import {ODatabase} from './../../../Service/OrientDB';

@Component({
    selector: 'login',
    providers: [ODatabase],
    templateUrl: 'app/components/login/login.html',
    directives: [],
    pipes: []
})

export class Login {
    private adminName: string;
    private adminPass: string;
    private database: ODatabase;

    constructor() {
        this.database = new ODatabase('http://orientdb.127.0.0.1.xip.io/smsc');
        this.database.open('admin', 'admin');

        this.adminName = 'admin';
        this.adminPass = 'admin';
    }

    authentication(login, password) {
        if (login && password) {
            this.database.query("select from OUser where name = '" + login +
                "' and password = '" + this.sha256(password) + "'")
                .then(
                    (res) => {
                       if (res.result.length) {
                           if(res.result[0].name == this.adminName &&
                               res.result[0].password == this.sha256(this.adminPass)) {
                               document.cookie = 'rightWrite=true';
                           } else {
                               // delete cookie
                               document.cookie = 'rightWrite=true;expires=Mon, 01-Jan-2000 00:00:00 GMT';
                           }
                           alert('The user was found!');
                       } else {
                           alert('User not found!');
                           document.cookie = 'rightWrite=true;expires=Mon, 01-Jan-2000 00:00:00 GMT';
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