import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TranslateService, TranslatePipe } from "ng2-translate/ng2-translate";
import { LoginModel } from "./login.model";
import { AuthService } from "../services/auth/auth.service";
import { Response } from "@angular/http";

@Component({
    selector: 'login',
    providers: [
        AuthService
    ],
    template: require('./login.html'),
    directives: [],
    pipes: [ TranslatePipe ],
    styles: [
        require('./login.scss')
    ]
})
export class Login implements OnInit {
    errorMessage: string = null;
    isErrorMessage: boolean = false;
    loading: boolean = false;

    model = new LoginModel('', '', false);

    constructor(public router: Router,
                public translate: TranslateService,
                public authService: AuthService) {
    }

    ngOnInit() {
    }

    onSubmit(model) {
        this.errorMessage = null;
        this.loading = true;

        this.authService.login(model.username, model.password)
            .then(
                (res) => {
                    this.router.navigateByUrl('/');
                }
            )
            .catch(
                (err: Response) => {
                    switch (err.status) {
                        case 400:
                            this.errorMessage = 'login.userNotFound';
                            break;
                        default:
                            this.errorMessage = 'login.commonError';
                            break;
                    }

                    this.loading = false;
                    this.isErrorMessage = true;
                }
            );
    }
}
