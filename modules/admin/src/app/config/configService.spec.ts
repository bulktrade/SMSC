import { inject, TestBed } from '@angular/core/testing';
import { ConfigService } from "./configService";
import { HttpModule } from "@angular/http";
import { XMLHttpRequestMock } from "../common/mock/XMLHttpRequestMock";
import { Observable } from "rxjs";
import { Config } from "./config";

describe('Config Service', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ConfigService,
            ],
            imports: [
                HttpModule
            ]
        });
    });

    it('should get config.json settings', inject([ConfigService], (configService) => {
        let responseText = {
            "orientDBUrl": "/orientdb",
            "orientDBDatabase": "smsc",
            "i18nPath": "assets/i18n",
            "debug": false
        };

        let mockXHR = new XMLHttpRequestMock();
        mockXHR.responseText = JSON.stringify(responseText);
        spyOn(window, "XMLHttpRequest").and.returnValue(mockXHR);

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
            "orientDBUrl": "/orientdb",
            "orientDBDatabase": "smsc",
            "i18nPath": "assets/i18n",
            "debug": false
        };

        let notFound: string = 'Not found!';

        let mockXHR = new XMLHttpRequestMock();
        mockXHR.responseText = JSON.stringify(responseText);
        mockXHR.status = 404;
        spyOn(window, "XMLHttpRequest").and.returnValue(mockXHR);

        expect(configService.configStream instanceof Observable).toBeTruthy();

        configService.configStream.subscribe((res: Config) => {
        }, err => {
            expect(err.status).toEqual(404);
        });
    }));

});


