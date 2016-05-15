import {Component} from '@angular/core';
import {ODatabaseService} from './../../../Service/OrientDB.service';
import {Router, RouterLink, ROUTER_DIRECTIVES} from '@angular/router';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from '@angular/common';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';

@Component({
    selector: 'login',
    providers: [],
    templateUrl: 'app/components/login/login.html',
    styles: [
        require('./login.scss')
    ],
    directives: [RouterLink, CORE_DIRECTIVES, FORM_DIRECTIVES, ROUTER_DIRECTIVES],
    pipes: [TranslatePipe]
})

export class Login {
    notfound: boolean = false;
    onSubmitBtn: boolean = false;

    constructor(public router?: Router, public translate?: TranslateService,
                public database?: ODatabaseService) {
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
                        this.router.parent.navigate(['Navigation']);
                    }
                )
                .catch(
                    (err) => {
                        console.log('Error: ', err);
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
