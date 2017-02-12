import { Component, OnInit } from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import { TranslateService } from "ng2-translate";
import { ProfileService } from "./profile.service";
import {User} from "../users/user.model";
import {UserService} from "../users/user.service";

@Component({
    selector: 'user',
    providers: [],
    templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
    loading: boolean = false;

    model: User;

    constructor(public router: Router,
                public route: ActivatedRoute,
                public translate: TranslateService,
                public userService: UserService) {
    }

    ngOnInit() {
        this.model = this.route.snapshot.data['user'];
        console.log(this.model);
    }

    onSubmit() {
        this.loading = true;
        this.userService.updateResource(this.model).subscribe(() => {
            this.loading = false;
        });
    }
}
