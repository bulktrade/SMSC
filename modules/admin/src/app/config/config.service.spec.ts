import { inject, TestBed } from '@angular/core/testing';
import { ConfigService } from './config.service';
import { HttpModule } from '@angular/http';
import { XMLHttpRequestMock } from '../common/mock/XMLHttpRequest-mock';
import { Observable } from 'rxjs';
import { Config } from './config';

describe('Config Service', () => {
    let mockXHR = new XMLHttpRequestMock();

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ConfigService,
            ],
            imports: [
                HttpModule
            ]
        });

        spyOn(window, 'XMLHttpRequest').and.returnValue(mockXHR);
    });

    it('should get config.json settings', inject([ConfigService], (configService) => {
        let responseText = {
            'orientDBUrl': '/orientdb',
            'orientDBDatabase': 'smsc',
            'i18nPath': 'assets/i18n',
            'debug': false
        };
        mockXHR.responseText = JSON.stringify(responseText);
        expect(configService.configStream instanceof Observable).toBeTruthy();

        configService.configStream.subscribe((res: Config) => {
            expect(res.orientDBUrl).toEqual(responseText.orientDBUrl);
            expect(res.orientDBDatabase).toEqual(responseText.orientDBDatabase);
            expect(res.i18nPath).toEqual(responseText.i18nPath);
            expect(res.debug).toEqual(responseText.debug);
        });
    }));

    it('should get an error on non-existent path', inject([ConfigService], (configService) => {
        let responseText = {
            'orientDBUrl': '/orientdb',
            'orientDBDatabase': 'smsc',
            'i18nPath': 'assets/i18n',
            'debug': false
        };

        mockXHR.responseText = JSON.stringify(responseText);
        mockXHR.status = 404;

        expect(configService.configStream instanceof Observable).toBeTruthy();

        configService.configStream.subscribe((res: Config) => {
        }, err => {
            expect(err.status).toEqual(404);
        });
    }));

});


