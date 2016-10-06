import { Http } from '@angular/http';
import {
    TranslateService,
    TranslateLoader,
    TranslateStaticLoader,
} from 'ng2-translate/ng2-translate';
import { ActivatedRoute, Router, NavigationExtras, UrlTree } from '@angular/router';
import { CrudService } from '../crud.service';
import { TokenService } from '../../services/auth/token.service';
import { COMMON_PROVIDERS } from '../../common/index';
import { NotificationService } from '../../services/notificationService';
import { NotificationsService } from 'angular2-notifications/components';
import { LoadingGridService } from '../../services/loading/loadingGrid.service';
import { ConfigService } from '../../config/configService';
import { RouterOutletService } from '../../services/routerOutletService';
import { GridService } from '../../services/grid.service';

class MockActivatedRoute {
    navigateByUrl(url: string | UrlTree, extras?: NavigationExtras) {};
    navigate(commands: any[], extras?: NavigationExtras) {};
}

export const CRUD_PROVIDERS = [
    ...COMMON_PROVIDERS,
    LoadingGridService,
    GridService,
    RouterOutletService,
    NotificationsService,
    NotificationService,
    CrudService,
    TokenService,
    TranslateService,
    ConfigService,
    { provide: ActivatedRoute, useClass: MockActivatedRoute },
    { provide: Router, useClass: MockActivatedRoute },
    {
        provide: TranslateLoader, useFactory: (http: Http, configService: ConfigService) => {
        return new TranslateStaticLoader(http, configService.config.i18nPath, '.json');
    }, deps: [Http, ConfigService]
    }
];
