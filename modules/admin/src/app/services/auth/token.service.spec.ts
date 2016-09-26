import { inject, TestBed } from '@angular/core/testing';
import { TokenService } from './token.service';

describe('Token service', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                TokenService
            ]
        });
    });

    it('should get a token', inject([TokenService], (service: TokenService) => {
        let token = 'testing token service';

        service.setToken(token);

        expect(service.getToken()).toEqual(token);
    }));

    it('should reset a token', inject([TokenService], (service: TokenService) => {
        let token = 'testing token service';

        service.setToken(token);
        service.resetToken();

        expect(service.isTokenExpired()).toBeTruthy();
    }));

});

