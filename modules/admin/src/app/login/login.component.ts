import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {LoginModel} from "./login.model";
import {AuthService} from "../services/auth/auth.service";
import {Response} from "@angular/http";
import {GrowlService} from "../services/growl/growl.service";

@Component({
    selector: 'login',
    providers: [
        AuthService,
        GrowlService
    ],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    loadingSpinner: boolean = false;

    model = new LoginModel('', '', false);

    constructor(public router: Router,
                public authService: AuthService,
                public growlService: GrowlService) {
    }

    onSubmit(model) {
        this.toggleLoading(true);
        this.authService.login(model.username, model.password)
            .subscribe(
                () => {
                    this.router.navigateByUrl('/');
                },
                (err: Response) => {
                    switch (err.status) {
                        case 401:
                            this.growlService.show({severity: 'error', detail: 'login.userNotFound'});
                            break;
                        default:
                            console.log(err);
                            this.growlService.show({severity: 'error', detail: 'login.commonError'});
                            break;
                    }

                    this.toggleLoading(false);
                }
            );
    }

    toggleLoading(value: boolean) {
        this.loadingSpinner = value;
    }
}
