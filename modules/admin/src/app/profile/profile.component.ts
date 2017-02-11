import { Component, OnInit } from "@angular/core";
import { Profile } from "./profile.model";
import {Router, ActivatedRoute} from "@angular/router";
import { TranslateService } from "ng2-translate";
import { ProfileService } from "./profile.service";

@Component({
    selector: 'user',
    providers: [],
    templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
    loading: boolean = false;

    model: Profile;

    constructor(public router: Router,
                public route: ActivatedRoute,
                public translate: TranslateService,
                public profileService: ProfileService) {

        this.model = new Profile('', '', '', '', '');
    }

    ngOnInit() {
        this.model = this.route.snapshot.data['profile'];
        console.log(this.model);
    }

    onSubmit() {
        this.loading = true;
        this.profileService.saveProfile(this.model).subscribe(() => {
            this.loading = false;
        });
    }
}
