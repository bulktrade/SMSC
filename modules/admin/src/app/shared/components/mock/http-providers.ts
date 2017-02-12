import { BaseRequestOptions, Http, ConnectionBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

export const HTTP_PROVIDERS = [
    BaseRequestOptions,
    MockBackend,
    {
        provide: Http, useFactory: (backend: ConnectionBackend,
                                    defaultOptions: BaseRequestOptions) => {
        return new Http(backend, defaultOptions);
    }, deps: [MockBackend, BaseRequestOptions]
    }
];
