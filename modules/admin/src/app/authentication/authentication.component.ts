import { Component, OnInit } from "@angular/core";
import { ODatabaseService } from "../orientdb/orientdb.service";
import { Router, ROUTER_DIRECTIVES } from "@angular/router-deprecated";
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from "@angular/common";
import { TranslateService, TranslatePipe } from "ng2-translate/ng2-translate";
import { AuthenticationModel } from "./authentication.model";
import { AlertComponent } from "ng2-bootstrap/ng2-bootstrap";

@Component({
    selector: 'authentication',
    providers: [],
    template: require('./authentication.html'),
    styleUrls: [
        require('./authentication.scss')
    ],
    directives: [AlertComponent, CORE_DIRECTIVES, FORM_DIRECTIVES, ROUTER_DIRECTIVES],
    pipes: [TranslatePipe]
})
export class Authentication implements OnInit {
    notFound: boolean = false;

    model = new AuthenticationModel('', '', false);

    constructor(public router?: Router,
                public translate?: TranslateService,
                public database?: ODatabaseService) {
    }

    ngOnInit() {
    }

    onSubmit(model) {
        this.database.open(model.username, model.password)
            .then(
                (res) => {
                    console.log('Result: ', res);
                    if (typeof(Storage) !== 'undefined') {
                        localStorage.setItem('adminRight', 'true');
                    }

                    this.router.navigateByUrl('/navigation');
                }
            )
            .catch(
                (err) => {
                    this.notFound = true;
                    localStorage.removeItem('adminRight');
                }
            );
    }
}
