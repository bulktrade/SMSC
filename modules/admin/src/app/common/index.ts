import { AuthHttp, AuthConfig } from "angular2-jwt";
import { AUTH_TOKEN_NAME, TokenService } from "../services/auth/token.service";
import { ODatabaseService } from "../orientdb/orientdb.service";
import { Http } from "@angular/http";
import { ConfigService } from "../config/configService";

export const COMMON_PROVIDERS = [
    {
        provide: AuthHttp,
        useFactory: (http: Http, tokenService: TokenService) => {
            let config: AuthConfig = new AuthConfig({
                headerName: 'Authorization',
                headerPrefix: 'Bearer',
                tokenName: AUTH_TOKEN_NAME,
                tokenGetter: () => {
                    return new Promise((resolve) => {
                        resolve(tokenService.getToken());
                    });
                },
                noJwtError: true,
                noTokenScheme: true,
                globalHeaders: [{'Content-Type':'application/json'}]
            });

            return new AuthHttp(config, http);
        },
        deps: [Http, TokenService]
    },
    {
        provide: ODatabaseService,
        useFactory: (authHttp: AuthHttp, configService: ConfigService) => {
            return new ODatabaseService(configService.config.orientDBUrl + '/' + configService.config.orientDBDatabase, authHttp);
        },
        deps: [AuthHttp, ConfigService]
    }
];
