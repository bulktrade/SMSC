import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TranslateService, TranslatePipe } from "ng2-translate/ng2-translate";
import { LoginModel } from "./login.model";
import { AuthService } from "../services/auth/auth.service";

@Component({
    selector: 'login',
    providers: [
        AuthService
    ],
    template: require('./login.html'),
    directives: [],
    pipes: [TranslatePipe],
    styles: [
        require('./login.scss')
    ]
})
export class Login implements OnInit {
    notFound:boolean = false;
    loading:boolean = false;

    model = new LoginModel('', '', false);

    constructor(public router:Router,
                public translate:TranslateService,
                public authService:AuthService) {
    }

    ngOnInit() {
    }

    onSubmit(model) {
        this.loading = true;
        this.authService.login(model.username, model.password)
            .then(
                (res) => {
                    this.router.navigateByUrl('/');
                }
            )
            .catch(
                (err) => {
                    this.notFound = true;
                    this.loading = false;
                }
            );
    }
}
