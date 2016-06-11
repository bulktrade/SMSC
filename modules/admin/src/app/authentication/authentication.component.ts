import { Component, OnInit } from '@angular/core';
import { ODatabaseService } from '../orientdb/orientdb.service';
import { Router, ROUTER_DIRECTIVES } from '@angular/router-deprecated';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';
import { TranslateService, TranslatePipe } from 'ng2-translate/ng2-translate';
import { AuthenticationModel } from './authentication.model';

@Component({
    selector: 'authentication',
    providers: [],
    template: require('./authentication.html'),
    styleUrls: [
         require('./authentication.scss')
    ],
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES, ROUTER_DIRECTIVES],
    pipes: [TranslatePipe]
})
export class Authentication implements OnInit {
    notfound: boolean = false;

    model = new AuthenticationModel('', '', false);

    constructor(public router?: Router,
                public translate?: TranslateService,
                public database?: ODatabaseService) {
    }

    ngOnInit() {
    }

    onSubmit() {

    }

    authentication(login, password) {
        if (login.valid && password.valid) {
            this.database.open(login.value, password.value)
                .then(
                    (res) => {
                        console.log('Result: ', res);
                        if (typeof(Storage) !== 'undefined') {
                            localStorage.setItem('adminRight', 'true');
                        }
                        this.router.navigateByUrl('/navigation');
                    }
                )
                .catch(
                    (err) => {
                        this.notfound = true;
                        localStorage.removeItem('adminRight');
                    }
                );
        } else {
            this.notfound = false;
        }
    }
}
