import { Injectable } from "@angular/core";
import { NotificationsService } from "angular2-notifications/components";
import { TranslateService } from "ng2-translate/ng2-translate";
import { Response } from "@angular/http";
import { Error } from "./error";

@Injectable()
export class NotificationService {
    constructor(public translate: TranslateService,
                public notificationsService: NotificationsService) {
    }

    createNotification(type: string, title: string, content: string) {
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

    createNotificationOnResponse(response: Response) {
        switch (response.status) {
            case 0:
                this.createNotification('error', 'ERROR', 'NO_INTERNET_CONNECTION');
                break;

            case 401:
                this.createNotification('error', 'ERROR', 'orientdb.unregistered');
                break;

            case 404:
                this.createNotification('error', 'ERROR', 'orientdb.dataNotFound');
                break;

            case 500:
                this.createNotification('error', 'ERROR', 'orientdb.dataNotCorrect');
                break;

            default:
                break;
        }
    }

    incorrectData(errMessage: string) {
        let notificationContent: string = errMessage;
        let errors: Array<Error> = [
            {
                type: 'NumberFormatException',
                content: 'cell.numberFormatException'
            },
            {
                type: 'mandatory',
                content: 'cell.mandatoryException'
            }
        ];

        errors.forEach((i) => {
            if (errMessage.match(i.type)) {
                this.translate.get(i.content)
                    .subscribe((res: string) => {
                        notificationContent = res;
                    });
            }
        });

        this.createNotification('error', 'ERROR', notificationContent);
    }

}
