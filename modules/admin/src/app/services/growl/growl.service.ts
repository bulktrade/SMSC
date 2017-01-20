import { Injectable } from '@angular/core';
import { Message } from "primeng/components/common/api";
import { GrowlModel } from "./growl.model";
import { TranslateService } from "ng2-translate";

@Injectable()
export class GrowlService {
    public msgs: Message[] = [];

    constructor(private translate: TranslateService) {
    }

    show(message: GrowlModel) {
        this.hide();
        this.translate.get(message.detail)
            .subscribe(value => {
                message.detail = value;
                this.msgs.push(message);
            });
    }

    hide() {
        this.msgs = [];
    }
}