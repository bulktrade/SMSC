import { Component, OnInit } from '@angular/core';
import { ODatabaseService } from '../orientdb/orientdb.service';
import { Router } from '@angular/router';
import { TranslateService, TranslatePipe } from 'ng2-translate/ng2-translate';
import { LoginModel } from './login.model';

@Component({
    selector: 'login',
    providers: [],
    template: require('./login.html'),
    directives: [
    ],
    pipes: [TranslatePipe],
    styleUrls: [
        require('./login.scss')
    ]
})
export class Login implements OnInit {
    notFound: boolean = false;
    loading: boolean = false;

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
                    console.log(res);
                    if (typeof(Storage) !== 'undefined') {
                        localStorage.setItem('adminRight', 'true');
                    }

                    this.router.navigateByUrl('/');
                }
            )
            .catch(
                (err) => {
                    this.notFound = true;
                    this.loading = false;
                    localStorage.removeItem('adminRight');
                }
            );

        if (!this.loading) {
            this.loading = !this.loading;
        }
    }
}
