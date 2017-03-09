import {inject, TestBed} from "@angular/core/testing";
import {ConfigService} from "./config.service";
import {HttpModule} from "@angular/http";
import {Observable} from "rxjs";
import {Config} from "./config";

describe('Service: ConfigService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ConfigService],
            imports: [HttpModule]
        });

        spyOn(XMLHttpRequest.prototype, 'open').and.callThrough();
        spyOn(XMLHttpRequest.prototype, 'send');
    });

    it('should get config.json settings', inject([ConfigService], (configService) => {
        let responseText = {
            'apiUrl': '/rest',
            'i18nPath': 'assets/i18n',
            'debug': false
        };
        expect(configService.configStream instanceof Observable).toBeTruthy();

        configService.configStream.subscribe((res: Config) => {
            expect(res.apiUrl).toEqual(responseText.apiUrl);
            expect(res.i18nPath).toEqual(responseText.i18nPath);
            expect(res.debug).toEqual(responseText.debug);
            expect(XMLHttpRequest.prototype.open).toHaveBeenCalledWith('GET', 'config.json');
        });
    }));

    it('should get an error on non-existent path', inject([ConfigService], (configService) => {
        expect(configService.configStream instanceof Observable).toBeTruthy();

        configService.configStream.subscribe((res: Config) => {
        }, err => {
            expect(err.status).toEqual(404);
        });
    }));
});


