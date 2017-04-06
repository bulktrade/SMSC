import {Component, Inject} from "@angular/core";
import {TranslateService} from "ng2-translate";
import {DOCUMENT} from "@angular/platform-browser";

import {MCC} from "./mcc.model";
import {ActivatedRoute} from "@angular/router";
import {MCCService} from "./mcc.service";
import {ControlErrorService} from "../services/control-error";
import {NotificationService} from "../services/notification-service";
import {CrudViewComponent} from "../shared/components/crud-view/crud-view.component";

@Component({
    selector: 'mcc',
    templateUrl: './mcc.component.html',
    styleUrls: [
        './mcc.component.scss',
        '../shared/styles/view.component.scss'
    ]
})
export class MCCComponent extends CrudViewComponent<MCC> {

    constructor(public translate: TranslateService,
                public route: ActivatedRoute,
                public mccService: MCCService,
                public controlErrorService: ControlErrorService,
                public notification: NotificationService,
                @Inject(DOCUMENT) public document) {
        super(translate, route, mccService, controlErrorService, notification, document);
    }
}
