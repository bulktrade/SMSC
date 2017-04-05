import {Component, EventEmitter, Input, NgModule, Output} from "@angular/core";
import {TranslateService} from "ng2-translate/ng2-translate";
import {RouterModule} from "@angular/router";
import {CommonModule, Location} from "@angular/common";
import {Message} from "primeng/components/common/api";
import {ButtonModule, MessagesModule} from "primeng/primeng";
import {TranslateModule} from "ng2-translate";

import {CrudRepository} from "../../crud-repository";
import {NotificationService} from "../../../services/notification-service";

@Component({
    selector: 'delete-resource',
    templateUrl: './../../templates/delete.component.html',
    styleUrls: ['./../../styles/delete.component.scss']
})

export class DeleteResourceComponent {

    @Input() crudRepository: CrudRepository<any>;

    @Input() id: number;

    @Input() message: string;

    @Input() custom: boolean = false;

    @Output() onDeleteResource: EventEmitter<number> = new EventEmitter();

    public msgs: Message[] = [];

    constructor(public translate: TranslateService,
                public location: Location,
                public notification: NotificationService) {
    }

    ngOnInit() {
        this.translate.get(this.message)
            .subscribe(detail => this.msgs.push({severity: 'warn', detail: detail}));
    }

    onBack() {
        this.location.back();
    }

    deleteResource() {
        if (!this.custom) {
            this.crudRepository.deleteResourceById(this.id)
                .subscribe(
                    () => {
                        this.onBack();
                        this.notification.createNotification('success', 'SUCCESS', 'SUCCESS_DELETE_RESOURCE');
                    }, () => {
                        this.notification.createNotification('error', 'ERROR', 'ERROR_DELETE_RESOURCE');
                    }
                );
        } else {
            this.onDeleteResource.emit(this.id);
        }
    }
}

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        RouterModule,
        ButtonModule,
        MessagesModule
    ],
    exports: [DeleteResourceComponent],
    declarations: [DeleteResourceComponent],
})
export class DeleteResourceModule {
}

