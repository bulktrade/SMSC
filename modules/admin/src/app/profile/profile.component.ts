import {Component, OnInit} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import {TranslateService} from "ng2-translate";
import {ProfileService} from "./profile.service";
import {User} from "../users/user.model";
import {UserService} from "../users/user.service";
import {NotificationService} from "../services/notification-service";
import {NgForm} from "@angular/forms";
import {ControlErrorService} from "../services/control-error";

@Component({
    selector: 'user',
    templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
    loading: boolean = false;

    model: User;

    constructor(public router: Router,
                public route: ActivatedRoute,
                public translate: TranslateService,
                public userService: UserService,
                public notifications: NotificationService,
                public controlErrorService: ControlErrorService) {
    }

    ngOnInit() {
        this.model = this.route.snapshot.data['user'];
    }

    onSubmit(profileForm: NgForm) {
        this.loading = true;
        this.userService.updateResource(this.model)
            .finally(() => this.loading = false)
            .subscribe(
                () => {
                    this.notifications.createNotification('success', 'SUCCESS', 'profile.successUpdate');
                },
                (e) => {
                    this.controlErrorService.controlErrors(e.json(), profileForm);
                }
            );
    }
}
