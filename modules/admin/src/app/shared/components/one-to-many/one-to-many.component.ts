import { Component, Input, ModuleWithProviders, NgModule, Output, EventEmitter } from "@angular/core";
import { TranslateService, TranslateModule } from "ng2-translate/ng2-translate";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { Location, CommonModule } from "@angular/common";
import { CrudService } from "../../crud.service";
import { FormsModule } from "@angular/forms";
import { MultipleSelectService } from "./multiple-select.service";
import { NotificationService } from "../../../services/notification-service";
import { CommonService } from "../../../services/common";

@Component({
    selector: 'one-to-many',
    templateUrl: './one-to-many.component.html',
    styleUrls: ['one-to-many.component.scss']
})

export class OneToManyComponent {

    @Input('mainEntityId')
    public id: number;

    @Input('renderProperties')
    public renderProperties: string[] = [];

    @Input('property')
    public property: string = '';

    @Input()
    public model = [];

    @Output()
    public modelChange = new EventEmitter();

    public pathFromRoot: string;

    constructor(public translate: TranslateService,
                public route: ActivatedRoute,
                public router: Router,
                public location: Location,
                public notifications: NotificationService,
                public commonService: CommonService) {
    }

    ngOnInit() {
        this.modelChange.emit(this.model);
        this.pathFromRoot = this.commonService.getPathFromRoot(this.route.parent.pathFromRoot);
    }
}

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TranslateModule,
        RouterModule
    ],
    exports: [OneToManyComponent],
    declarations: [OneToManyComponent]
})
export class OneToManyModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: OneToManyModule,
            providers: []
        };
    }
}
