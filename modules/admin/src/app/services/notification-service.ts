import {Injectable} from "@angular/core";
import {TranslateService} from "ng2-translate/ng2-translate";
import {NotificationsService} from "angular2-notifications";

@Injectable()
export class NotificationService {
    constructor(public translate: TranslateService,
                public notificationsService: NotificationsService) {
    }

    createNotification(type: string, title: string, content: string) {
        this.translate.get(title).subscribe((titleTranslate) => {
            this.translate.get(content).subscribe((contentTranslate) => {
                switch (type) {
                    case 'success':
                        this.notificationsService.success(titleTranslate, contentTranslate);
                        break;
                    case 'error':
                        this.notificationsService.error(titleTranslate, contentTranslate);
                        break;
                    case 'info':
                        this.notificationsService.info(titleTranslate, contentTranslate);
                        break;
                }
            });
        });
    }
}
