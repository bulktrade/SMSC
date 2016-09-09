import { inject, TestBed } from '@angular/core/testing';
import { ConfigService } from "./configService";
import { ConfigServiceMock } from "../common/mock/configServiceMock";
import { Config } from "./config";

describe('Config Service', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: ConfigService, useClass: ConfigServiceMock },
            ],
        });
    });

    it('should get the parameters config.json', inject([ConfigService], (configService: ConfigService) => {
        let config: Config = {
            orientDBUrl: "/orientdb",
            orientDBDatabase: "smsc",
            i18nPath: "assets/i18n",
            debug: false
        };

        configService.configStream.subscribe(res => {
            expect(res.orientDBUrl).toEqual(config.orientDBUrl);
            expect(res.orientDBDatabase).toEqual(config.orientDBDatabase);
            expect(res.i18nPath).toEqual(config.i18nPath);
            expect(res.debug).toEqual(config.debug);
        })
    }));

});

