import { AuthHttp, provideAuth } from "angular2-jwt";
import { AUTH_TOKEN_NAME } from "../services/auth/token.service";
import { ODatabaseService } from "../orientdb/orientdb.service";

export const COMMON_PROVIDERS = [

    provideAuth({
        headerName: 'Authorization',
        headerPrefix: 'Bearer',
        tokenName: AUTH_TOKEN_NAME,
        // tokenGetter: tokenService.getToken,
        noJwtError: true,
        noTokenScheme: true
    }),

    {
        provide: ODatabaseService, useFactory: (authHttp) => {
            new ODatabaseService('/orientdb/smsc', authHttp);
        }, deps: [AuthHttp]
    },
];
