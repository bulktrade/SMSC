import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { LoginModel } from "./login.model";
import { AuthService } from "../services/auth/auth.service";
import { Response } from "@angular/http";
import { GrowlService } from "../services/growl/growl.service";

@Component({
    selector: 'login',
    providers: [
        AuthService,
        GrowlService
    ],
    template: require('./login.component.html'),
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loadingSpinner: boolean = false;

    model = new LoginModel('', '', false);

    constructor(private router: Router,
                private authService: AuthService,
                public growlService: GrowlService) {
    }

    ngOnInit() {
    }

    onSubmit(model) {
        this.loadingSpinner = true;

        this.authService.login(model.username, model.password)
            .subscribe(
                () => {
                    this.router.navigateByUrl('/');
                },
                (err: Response) => {
                    switch (err.status) {
                        case 401:
                            this.growlService.show({ severity: 'error', detail: 'login.userNotFound' });
                            break;
                        default:
                            console.log(err);
                            this.growlService.show({ severity: 'error', detail: 'login.commonError' });
                            break;
                    }

                    this.loadingSpinner = false;
                }
            );
    }
}
