import {TestBed, inject} from "@angular/core/testing";
import {TranslateModule} from "ng2-translate";
import {Observable} from "rxjs";
import {NotificationService} from "./notification-service";
import {GrowlService} from "./growl.service";
import {GrowlModel} from "./growl.model";

describe('Service: GrowlService', () => {
    let service: GrowlService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TranslateModule.forRoot()],
            providers: [GrowlService]
        });
    });

    beforeEach(inject([GrowlService], (_service) => {
        service = _service;
        spyOn(service.translate, 'get').and.returnValue(Observable.of('translatedValue'));
    }));

    it('should hide the growl message', () => {
        service.hide();
        expect(service.msgs.length).toEqual(0);
    });

    it('should show the growl message', () => {
        spyOn(service, 'hide');
        service.show(<GrowlModel>{detail: ''});
        expect(service.msgs[0].detail).toEqual('translatedValue');
        expect(service.hide).toHaveBeenCalled();
    });
});
