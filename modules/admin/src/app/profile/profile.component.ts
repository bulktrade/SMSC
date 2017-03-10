import {Component, OnInit} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import {TranslateService} from "ng2-translate";
import {ProfileService} from "./profile.service";
import {User} from "../users/user.model";
import {UserService} from "../users/user.service";
import {NotificationService} from "../services/notification-service";
import {NgForm} from "@angular/forms";
import {Message} from "../shared/components/models/error/Message";

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
                public notifications: NotificationService) {
    }

    ngOnInit() {
        this.model = this.route.snapshot.data['user'];
        console.log(this.model);
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
                    let messages: Array<Message> = e.json();
                    if (messages.length > 0) {
                        for (let errorMessage of messages) {
                            if (errorMessage.field) {
                                let control = profileForm.controls[errorMessage.field];
                                if (control != undefined) {
                                    control.setErrors({
                                        remote: errorMessage.message
                                    });

                                    this.notifications.createNotification('error', 'ERROR', errorMessage.message);
                                } else {
                                    this.notifications.createNotification('error', 'ERROR', 'profile.errorUpdate');
                                }
                            } else {
                                this.notifications.createNotification('error', 'ERROR', errorMessage.message);
                            }
                        }
                    } else {
                        this.notifications.createNotification('error', 'ERROR', 'profile.errorUpdate');
                    }
                }
            );
    }
}
