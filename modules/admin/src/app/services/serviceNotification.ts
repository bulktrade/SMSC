import { Injectable } from "@angular/core";
import { NotificationsService } from "angular2-notifications/components";
import { TranslateService } from "ng2-translate/ng2-translate";
import { Response } from "@angular/http";

@Injectable()
export class ServiceNotifications {
    constructor(public translate:TranslateService,
                public notificationsService:NotificationsService) {
    }

    createNotification(type, title, content) {
        this.translate.get(title).subscribe((title) => {
            this.translate.get(content).subscribe((content) => {
                switch (type) {
                    case 'success':
                        this.notificationsService.success(title, content);
                        break;

                    case 'error':
                        this.notificationsService.error(title, content);
                        break;

                    case 'info':
                        this.notificationsService.info(title, content);
                        break;

                    default:
                        break;
                }
            });
        });
    }

    createNotificationOnResponse(response:Response) {
        switch (response.status) {
            case 0:
                this.createNotification('error', 'ERROR', 'NO_INTERNET_CONNECTION');
                break;

            case 401:
                this.createNotification('error', 'ERROR', 'orientdb.unregistered');
                break;

            case 500:
                this.createNotification('error', 'ERROR', 'orientdb.dataNotCorrect');
                break;

            default:
                break;
        }
    }
}
