import {inject, TestBed} from "@angular/core/testing";
import {TokenService} from "./token.service";

describe('Service: TokenService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [TokenService]
        });
    });

    it('should get a token', inject([TokenService], (service: TokenService) => {
        let token = 'testing token service';
        spyOn(localStorage, 'getItem').and.returnValue(token);
        spyOn(localStorage, 'setItem');

        service.setToken(token);

        expect(service.getToken()).toEqual(token);
        expect(localStorage.getItem).toHaveBeenCalledWith('AdminToken');
        expect(localStorage.setItem).toHaveBeenCalledWith('AdminToken', token);
    }));

    it('should reset a token', inject([TokenService], (service: TokenService) => {
        let token = 'testing token service';
        spyOn(localStorage, 'getItem').and.returnValue(null);
        spyOn(localStorage, 'removeItem');
        spyOn(localStorage, 'setItem');

        service.setToken(token);
        service.resetToken();

        expect(service.isTokenExpired()).toBeTruthy();
        expect(localStorage.getItem).toHaveBeenCalledWith('AdminToken');
        expect(localStorage.removeItem).toHaveBeenCalledWith('AdminToken');
        expect(localStorage.setItem).toHaveBeenCalledWith('AdminToken', token);
    }));

    it('should not expire the token', inject([TokenService], (service: TokenService) => {
        let token = 'testing token service';
        spyOn(localStorage, 'getItem').and.returnValue(token);
        spyOn(localStorage, 'setItem');

        service.setToken(token);

        expect(service.isTokenExpired()).toBeFalsy();
        expect(localStorage.getItem).toHaveBeenCalledWith('AdminToken');
        expect(localStorage.setItem).toHaveBeenCalledWith('AdminToken', token);
    }));
});

