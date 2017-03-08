import {TestBed, inject} from "@angular/core/testing";
import {HttpModule, XHRBackend, ResponseOptions, Response} from "@angular/http";
import {MockBackend, MockConnection} from "@angular/http/testing";
import {CrudRepository} from "./crud-repository";
import {AuthService} from "./auth.service";
import {TokenService} from "./token.service";
import {AuthModel} from "./auth.model";
import {ConfigService} from "../../config/config.service";

class ConfigServiceMock {
    config = {
        "apiUrl": "/rest",
        "i18nPath": "assets/i18n",
        "debug": false
    }
}

describe('Service: AuthService', () => {
    let mockBackend, authService: AuthService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [
                {provide: XHRBackend, useClass: MockBackend},
                {provide: ConfigService, useClass: ConfigServiceMock},
                AuthService,
                TokenService
            ]
        })
    });

    beforeEach(inject([AuthService, XHRBackend, TokenService], (_service, _mockBackend) => {
        authService = _service;
        mockBackend = _mockBackend;
    }));

    it('should log in', () => {
        let responseData: AuthModel = {
            token: 'token',
            refreshToken: 'refreshToken'
        };
        mockBackend.connections.subscribe(connection => {
            let response = new ResponseOptions({body: responseData});
            connection.mockRespond(new Response(response));
        });
        authService.login('login', 'password')
            .subscribe(data => {
                expect(data).toEqual(responseData.token);
            });
    });

    it('should not log in', () => {
        mockBackend.connections.subscribe((connection: MockConnection) => {
            connection.mockError(new Error('invalid credentials'));
        });
        authService.login('login', 'password')
            .subscribe(() => {
            }, (err: Error) => {
                expect(err.message).toEqual('invalid credentials');
            });
    });

    it('should receive new access and refresh tokens', () => {
        let responseData: AuthModel = {
            token: 'token',
            refreshToken: 'refreshToken'
        };
        mockBackend.connections.subscribe(connection => {
            let response = new ResponseOptions({body: responseData});
            connection.mockRespond(new Response(response));
        });
        authService.authentication('login', 'password')
            .subscribe((data: AuthModel) => {
                expect(data.token).toEqual(responseData.token);
                expect(data.refreshToken).toEqual(responseData.refreshToken);
            });
    });

    it('should receive refreshed access token', () => {
        let responseData = {
            token: 'token',
        };
        mockBackend.connections.subscribe(connection => {
            let response = new ResponseOptions({body: responseData});
            connection.mockRespond(new Response(response));
        });
        authService.refreshAccessToken('expiredToken', 'refreshToken')
            .subscribe(data => {
                expect(data['token']).toEqual(responseData['token']);
            });
    });
});
