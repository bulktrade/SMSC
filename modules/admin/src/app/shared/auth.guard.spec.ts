import {TestBed, inject} from "@angular/core/testing";
import {HttpModule} from "@angular/http";
import {RouterTestingModule} from "@angular/router/testing";
import {AuthGuard} from "./auth.guard";
import {TokenService} from "../services/auth/token.service";

describe('Guard: AuthGuard', () => {
    let authGuard: AuthGuard;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule, RouterTestingModule],
            providers: [AuthGuard, TokenService]
        });
    });

    beforeEach(inject([AuthGuard], (_authGuard) => {
        authGuard = _authGuard;
    }));

    it('should navigate to the main content', () => {
        spyOn(authGuard.tokenService, 'isTokenExpired').and.returnValue(false);
        expect(authGuard.canActivate(<any>{}, <any>{})).toBeTruthy();
    });

    it('should not navigate to the main content', () => {
        spyOn(authGuard.tokenService, 'isTokenExpired').and.returnValue(true);
        spyOn(authGuard.router, 'navigateByUrl');
        expect(authGuard.canActivate(<any>{}, <any>{})).toBeFalsy();
        expect(authGuard.router.navigateByUrl).toHaveBeenCalledWith('/login');
    });
});
