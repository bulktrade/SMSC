import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { CrudResolve } from '../common/crudResolve';
import { CrudService } from '../crud.service';
import { LoadingGridService } from '../../services/loading/loadingGrid.service';
import { ColumnDefsModel } from '../model/columnDefs';
import { Observer, Observable } from 'rxjs';
import { NotificationService } from '../../services/notificationService';

@Injectable()
export class CrudViewResolve extends CrudResolve {

    constructor(public crudService: CrudService,
                public loadingGridService: LoadingGridService,
                public notification: NotificationService) {
        super();
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.crudService.setClassName(route.parent.parent.data['crudClass']);
        this.crudService.setParentPath(route.parent.parent.pathFromRoot);

        this.loadingGridService.start();

        return Observable.create((observer: Observer<ColumnDefsModel>) => {
            this.crudService.getColumnDefs(this.crudService.getClassName(), true)
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
