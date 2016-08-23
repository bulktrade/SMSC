import { inject, TestBed } from '@angular/core/testing';
import {Login} from './login.component';
import {CRUD_PROVIDERS} from "../crud/common/crudProviders";
import {AuthService} from "../services/auth/auth.service";
import {LoginModel} from "./login.model";
import { HttpModule } from "@angular/http";

describe('Authentication', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ...CRUD_PROVIDERS,
                Login,
                AuthService
            ],
            imports: [
                HttpModule
            ]
        });
    });

    it('should be model', inject([ Login ], (login) => {
        let model = new LoginModel('', '', false);

        expect(login.model).toEqual(model);
    }));

    it('loading should be is false', inject([ Login ], (login) => {
        expect(login.loading).toBeFalsy();
    }));

    it('authentication method', inject([ Login ], (login) => {
        let model = new LoginModel('', '', false);

        spyOn(login, 'onSubmit');
        login.onSubmit(model);
        expect(login.onSubmit).toHaveBeenCalled();

        login.onSubmit(model);
        expect(login.onSubmit).toHaveBeenCalledWith(model);
    }));
});
