import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { CrudResolve } from '../common/crud-resolve';
import { CrudService } from '../crud.service';
import { LoadingGridService } from '../../services/loading/loading-grid.service';
import { ColumnDefsModel } from '../model/column-definitions';
import { Observer, Observable } from 'rxjs';
import { NotificationService } from '../../services/notification-service';

@Injectable()
export class CrudViewResolve extends CrudResolve {

    constructor(public crudService: CrudService,
                public loadingGridService: LoadingGridService,
                public notification: NotificationService) {
        super();
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let className = route.parent.parent.data['crudClass'];

        this.loadingGridService.start();

        return Observable.create((observer: Observer<ColumnDefsModel>) => {
            this.crudService.getColumnDefs(className, true)
                .subscribe((res: ColumnDefsModel) => {
                    this.loadingGridService.stop();
                    observer.next(res);
                    observer.complete();
                }, err => {
                    this.loadingGridService.stop();
                    this.notification.createNotificationOnResponse(err);
                    observer.error(err);
                    observer.complete();
                });
        });
    }

}
