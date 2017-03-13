import {Injectable} from "@angular/core";
import {Message} from "../shared/components/models/error/Message";
import {NgForm} from "@angular/forms";
import {NotificationService} from "./notification-service";
import {ControlCellErrors} from "../customers/model/control-cell-errors";

@Injectable()
export class ControlErrorService {

    constructor(public notificationService: NotificationService) {
    }

    formControlErrors(messages: Message[], ngForm: NgForm) {
        if (messages.length > 0) {
            for (let errorMessage of messages) {
                if (errorMessage.field) {
                    let control = ngForm.controls[errorMessage.field];
                    if (control != undefined) {
                        control.setErrors({
                            remote: errorMessage.message
                        });

                        this.notificationService.createNotification('error', 'ERROR', errorMessage.message);
                    } else {
                        this.notificationService.createNotification('error', 'ERROR', 'ERROR_UPDATE');
                    }
                } else {
                    this.notificationService.createNotification('error', 'ERROR', errorMessage.message);
                }
            }
        } else {
            this.notificationService.createNotification('error', 'ERROR', 'ERROR_UPDATE');
        }
    }

    gridControlErrors(messages: Message[], onEditCompleteEvent, controlCellErrors: ControlCellErrors) {
        if (messages.length > 0) {
            for (let errorMessage of messages) {
                if (errorMessage.field) {
                    controlCellErrors[onEditCompleteEvent.column.field][onEditCompleteEvent.data.id] = true;
                    this.notificationService.createNotification('error', 'ERROR', errorMessage.message);
                } else {
                    this.notificationService.createNotification('error', 'ERROR', errorMessage.message);
                }
            }
        } else {
            this.notificationService.createNotification('error', 'ERROR', 'ERROR_UPDATE');
        }
    }
}
