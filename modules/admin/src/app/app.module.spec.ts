import {TestBed, inject} from "@angular/core/testing";
import {NotificationService} from "./notification-service";
import {AppModule, StoreType} from "./app.module";
import {AppState} from "./app.service";
import * as hmr from "@angularclass/hmr";

describe('Module: AppModule', () => {
    let service: AppModule;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [AppModule, AppState]
        });
    });

    beforeEach(inject([AppModule], (_service) => {
        service = _service;
    }));

    it('.hmrOnInit()', () => {
        spyOn(console, 'log');
        spyOn(service.appRef, 'tick');
        service.hmrOnInit(<any>{});
        service.hmrOnInit(<StoreType>{state: {}, restoreInputValues: ()=>{}, disposeOldHosts: ()=>{}});
        expect(console.log).toHaveBeenCalled();
        expect(service.appRef.tick).toHaveBeenCalled();
    });

    it('.hmrOnDestroy()', () => {
        spyOn(hmr, 'removeNgStyles');
        spyOn(hmr, 'createNewHosts');
        spyOn(hmr, 'createInputTransfer');
        service.hmrOnDestroy(<StoreType>{state: {}, restoreInputValues: ()=>{}, disposeOldHosts: ()=>{}});
        expect(hmr.removeNgStyles).toHaveBeenCalled();
        expect(hmr.createNewHosts).toHaveBeenCalled();
        expect(hmr.createInputTransfer).toHaveBeenCalled();
    });

    it('.hmrAfterDestroy()', () => {
        let store = <StoreType>{state: {}, restoreInputValues: ()=>{}, disposeOldHosts: ()=>{}};
        service.hmrAfterDestroy(store);
        expect('disposeOldHosts' in store).toBeFalsy();
    });
});
