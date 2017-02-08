import { Component, OnInit } from "@angular/core";
import { ProfileModel } from "./profile.model";
import { Router } from "@angular/router";
import { TranslateService } from "ng2-translate";
import { ProfileService } from "./profile.service";

@Component({
    selector: 'user',
    providers: [],
    templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
    loading: boolean = false;

    model: ProfileModel;

    constructor(public router?: Router,
                public translate?: TranslateService,
                public profileService?: ProfileService) {

        this.model = new ProfileModel('', '');
    }

    ngOnInit() {
    }
}
