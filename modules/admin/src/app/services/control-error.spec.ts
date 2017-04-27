import {TestBed, inject} from "@angular/core/testing";
import {ControlErrorService} from "./control-error";
import {NotificationService} from "./notification-service";
import {Message} from "../shared/components/models/error/message";
import {TranslateModule} from "ng2-translate";
import {NotificationsService} from "angular2-notifications";

describe('Service: ControlErrorService', () => {
    let service: ControlErrorService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TranslateModule.forRoot()],
            providers: [ControlErrorService, NotificationService, NotificationsService]
        });
    });

    beforeEach(inject([ControlErrorService], (_service) => {
        service = _service;
    }));

    it('.formControlErrors() - should have the email control', () => {
        spyOn(service.notificationService, 'createNotification');
        let messages: Message[] = [
            <Message>{
                field: 'email',
                message: 'EMAIL_FORMAT_VALIDATION_ERROR',
                type: 'ERROR'
            }
        ];
        let controls = <any>{
            controls: {
                email: {
                    setErrors: (obj) => {
                    },
                }
            }
        };
        service.formControlErrors(messages, controls);
        expect(service.notificationService.createNotification).toHaveBeenCalledWith('error', 'ERROR', messages[0].message);
    });

    it('.formControlErrors() - should not have the email control', () => {
        spyOn(service.notificationService, 'createNotification');
        let messages: Message[] = [
            <Message>{
                field: 'email',
                message: 'EMAIL_FORMAT_VALIDATION_ERROR',
                type: 'ERROR'
            }
        ];
        let controls = <any>{
            controls: {}
        };
        service.formControlErrors(messages, controls);
        expect(service.notificationService.createNotification).toHaveBeenCalledWith('error', 'ERROR', 'ERROR_UPDATE');
    });

    it('.formControlErrors() - should not have the field property in the message', () => {
        spyOn(service.notificationService, 'createNotification');
        let messages: Message[] = [
            <any>{
                message: 'EMAIL_FORMAT_VALIDATION_ERROR',
                type: 'ERROR'
            }
        ];
        let controls = <any>{
            controls: {}
        };
        service.formControlErrors(messages, controls);
        expect(service.notificationService.createNotification).toHaveBeenCalledWith('error', 'ERROR', messages[0].message);
    });

    it('.formControlErrors() - should not have the list of error messages', () => {
        spyOn(service.notificationService, 'createNotification');
        let messages: Message[] = [];
        let controls = <any>{
            controls: {}
        };
        service.formControlErrors(messages, controls);
        expect(service.notificationService.createNotification).toHaveBeenCalledWith('error', 'ERROR', 'ERROR_UPDATE');
    });

    it('.gridControlErrors() - should not have the field property in the message', () => {
        spyOn(service.notificationService, 'createNotification');
        let messages: Message[] = [
            <any>{
                message: 'EMAIL_FORMAT_VALIDATION_ERROR',
                type: 'ERROR'
            }
        ];
        service.gridControlErrors(messages, <any>{}, <any>{});
        expect(service.notificationService.createNotification).toHaveBeenCalledWith('error', 'ERROR', messages[0].message);
    });

    it('.gridControlErrors() - should get an error message depending of cell', () => {
        spyOn(service.notificationService, 'createNotification');
        let messages: Message[] = [
            <Message>{
                field: 'email',
                message: 'EMAIL_FORMAT_VALIDATION_ERROR',
                type: 'ERROR'
            }
        ];
        let onEditCompleteEvent = {
            column: {field: 'email'},
            data: {id: 400000}
        };
        service.gridControlErrors(messages, onEditCompleteEvent, <any>{email: {}});
        expect(service.notificationService.createNotification).toHaveBeenCalledWith('error', 'ERROR', 'EMAIL_FORMAT_VALIDATION_ERROR');
    });
});
