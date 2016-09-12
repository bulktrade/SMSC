import { Component } from "@angular/core";
import { TranslateService } from "ng2-translate/ng2-translate";
import { Breadcrumb } from "../breadcrumb/breadcrumb.component";

@Component({
    selector: 'crud-metadata',
    template: require('./crudMetaData.html'),
    styleUrls: [
        require('./crudMetaData.scss')
    ],
    providers: [Breadcrumb]
})

export class CrudMetaData {
    constructor(public translate:TranslateService) {
    }

    ngOnInit() {
    }
}
