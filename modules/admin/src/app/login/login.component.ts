import { Component, OnInit } from '@angular/core';
import { ODatabaseService } from '../orientdb/orientdb.service';
import { Router } from '@angular/router-deprecated';
import { TranslateService, TranslatePipe } from 'ng2-translate/ng2-translate';
import { LoginModel } from './login.model';
import { AlertComponent } from 'ng2-bootstrap/ng2-bootstrap';
import {FORM_DIRECTIVES} from '@angular/forms';
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input/input';
import {MdButton} from '@angular2-material/button/button';

import { CORE_DIRECTIVES } from '@angular/common';
import {MdToolbar} from '@angular2-material/toolbar/toolbar';
import {MD_CARD_DIRECTIVES, MdCard} from '@angular2-material/card/card';
import {MdSlideToggle} from '@angular2-material/slide-toggle/slide-toggle';
import {MdIcon} from '@angular2-material/icon/icon';

require('./login.scss');

@Component({
    selector: 'login',
    providers: [],
    template: require('./login.html'),
    directives: [
        MdCard,
        CORE_DIRECTIVES,
        AlertComponent,
        MdButton,
        MD_INPUT_DIRECTIVES,
        MdToolbar,
        FORM_DIRECTIVES,
        MD_CARD_DIRECTIVES,
        MdSlideToggle,
        MdIcon
    ],
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

                    this.router.navigateByUrl('/dashboard');
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
