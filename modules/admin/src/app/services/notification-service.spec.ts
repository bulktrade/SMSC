import {TestBed, inject} from "@angular/core/testing";
import {TranslateModule} from "ng2-translate";
import {Observable} from "rxjs";
import {NotificationService} from "./notification-service";
import {NotificationsService} from "angular2-notifications/components";

describe('Service: NotificationService', () => {
    let service: NotificationService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TranslateModule.forRoot()],
            providers: [NotificationsService, NotificationService]
        });
    });

    beforeEach(inject([NotificationService], (_service) => {
        service = _service;
        spyOn(service.translate, 'get').and.returnValue(Observable.of('translatedValue'));
    }));

    it('should get the success notification message', () => {
        spyOn(service.notificationsService, 'success');
        service.createNotification('success', 'title', 'content');
        expect(service.notificationsService.success).toHaveBeenCalledWith('translatedValue', 'translatedValue');
    });

    it('should get the error notification message', () => {
        spyOn(service.notificationsService, 'error');
        service.createNotification('error', 'title', 'content');
        expect(service.notificationsService.error).toHaveBeenCalledWith('translatedValue', 'translatedValue');
    });

    it('should get the info notification message', () => {
        spyOn(service.notificationsService, 'info');
        service.createNotification('info', 'title', 'content');
        expect(service.notificationsService.info).toHaveBeenCalledWith('translatedValue', 'translatedValue');
    });
});
