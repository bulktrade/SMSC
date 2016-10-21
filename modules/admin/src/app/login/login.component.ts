import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginModel } from './login.model';
import { AuthService } from '../services/auth/auth.service';
import { Response } from '@angular/http';

@Component({
    selector: 'login',
    providers: [
        AuthService
    ],
    template: require('./login.component.html'),
    styleUrls: [
        require('./login.component.scss')
    ]
})
export class LoginComponent implements OnInit {
    errorMessage: string = null;
    isErrorMessage: boolean = false;
    loading: boolean = false;

    model = new LoginModel('', '', false);

    constructor(public router: Router,
                public authService: AuthService) {
    }

    ngOnInit() {
    }

    onSubmit(model) {
        this.errorMessage = null;
        this.loading = true;

        return new Promise((resolve, reject) => {
            this.authService.login(model.username, model.password)
                .subscribe(
                    (res) => {
                        this.router.navigateByUrl('/');
                        resolve(res);
                    },
                    (err: Response) => {
                        switch (err.status) {
                            case 400:
                                this.errorMessage = 'login.userNotFound';
                                break;
                            default:
                                console.log(err);
                                this.errorMessage = 'login.commonError';
                                break;
                        }

                        this.loading = false;
                        this.isErrorMessage = true;
                        reject(err);
                    }
                );
        });
    }
}
