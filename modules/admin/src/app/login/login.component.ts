import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ODatabaseService } from '../orientdb/orientdb.service';
import { Router, ROUTER_DIRECTIVES } from '@angular/router-deprecated';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';
import { TranslateService, TranslatePipe } from 'ng2-translate/ng2-translate';

@Component({
    selector: 'login',
    providers: [],
    templateUrl: 'app/login/login.html',
    styles: [
        require('./login.scss')
    ],
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES, ROUTER_DIRECTIVES],
    pipes: [TranslatePipe]
})
export class Login implements OnInit {
    notfound: boolean = false;
    onSubmitBtn: boolean = false;

    constructor(public router?: Router,
                public translate?: TranslateService,
                public database?: ODatabaseService) {
    }

    ngOnInit() {
    }

    authentication(login, password) {
        if (login.valid && password.valid) {
            this.database.open(login.value, password.value)
                .then(
                    (res) => {
                        console.log('Result: ', res);
                        if (typeof(Storage) !== 'undefined') {
                            localStorage.setItem('rightWrite', 'true');
                        }
                        this.router.navigateByUrl('/navigation');
                    }
                )
                .catch(
                    (err) => {
                        this.notfound = true;
                        localStorage.removeItem('rightWrite');
                    }
                );
        } else {
            this.notfound = false;
            this.onSubmitBtn = true;
        }
    }
}
