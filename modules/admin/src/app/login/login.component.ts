import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { LoginModel } from "./login.model";
import { AuthService } from "../services/auth/auth.service";
import { Response } from "@angular/http";
import { NotificationService } from "../services/notification-service";

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
    isErrorMessage: boolean = false;
    loading: boolean = false;

    model = new LoginModel('', '', false);

    constructor(private router: Router,
                private authService: AuthService,
                private serviceNotifications: NotificationService) {
    }

    ngOnInit() {
    }

    onSubmit(model) {
        this.loading = true;

        this.authService.login(model.username, model.password)
            .subscribe(
                () => {
                    this.router.navigateByUrl('/');
                },
                (err: Response) => {
                    console.log(err);
                    switch (err.status) {
                        case 401:
                            this.serviceNotifications.createNotification('error',
                                'login.errorTitle', 'login.userNotFound');
                            break;
                        default:
                            console.log(err);
                            this.serviceNotifications.createNotification('error',
                                'login.errorTitle', 'login.commonError');
                            break;
                    }

                    this.loading = false;
                    this.isErrorMessage = true;
                }
            );
    }
}
