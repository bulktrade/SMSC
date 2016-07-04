import { Component, OnInit } from '@angular/core';
import { ODatabaseService } from '../orientdb/orientdb.service';
import { Router, ROUTER_DIRECTIVES } from '@angular/router-deprecated';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';
import { TranslateService, TranslatePipe } from 'ng2-translate/ng2-translate';
import { LoginModel } from './login.model';
import { AlertComponent } from 'ng2-bootstrap/ng2-bootstrap';

@Component({
    selector: 'login',
    providers: [],
    template: require('./login.html'),
    styleUrls: [
        require('./login.scss').toString()
    ],
    directives: [AlertComponent, CORE_DIRECTIVES, FORM_DIRECTIVES, ROUTER_DIRECTIVES],
    pipes: [TranslatePipe]
})
export class Login implements OnInit {
    notFound: boolean = false;

    model = new LoginModel('', '', false);

    constructor(public router?: Router,
                public translate?: TranslateService,
                public database?: ODatabaseService) {
    }

    ngOnInit() {
    }

    onSubmit(model) {
        this.database.open(model.username, model.password)
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
                    this.notFound = true;
                    localStorage.removeItem('adminRight');
                }
            );
    }
}
