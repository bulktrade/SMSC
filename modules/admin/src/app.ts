import {bootstrap} from 'angular2/platform/browser';
import {HTTP_PROVIDERS} from 'angular2/http';
import {ROUTER_PROVIDERS} from 'angular2/router';

import {Authentication} from './app/components/authentication/authentication';

bootstrap(Authentication, [
    HTTP_PROVIDERS,
    ROUTER_PROVIDERS,
    ROUTER_PROVIDERS
])
  .catch(err => console.error(err));