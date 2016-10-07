import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { CrudResolve } from '../common/crudResolve';
import { CrudService } from '../crud.service';
import { Response } from '@angular/http';
import { Location } from '@angular/common';
import { GridService } from '../../services/grid.service';
import { Observable, Observer } from 'rxjs';
import { EditModel } from './crudUpdate.model';

@Injectable()
export class CrudEditResolve extends CrudResolve {

    constructor(public crudService: CrudService,
                public location: Location,
                public gridService: GridService) {
        super();
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let id = route.params['id'];
        this.crudService.setParentPath(route.parent.parent.pathFromRoot);

        return Observable.create((observer: Observer<EditModel>) => {
            this.crudService.databaseService.load(id)
                .then((res: Response) => {
                    let result = res.json();
                    let className = result['@class'];
                    let model = [];

                    if (!Object.keys(this.crudService.model).length) {
                        model.push(result);
                    }

                    this.crudService.getColumnDefs(className, false)
                        .subscribe((columnDefs) => {
                            return this.gridService.selectLinksetProperties(columnDefs.form, model)
                                .then(() => {
                                    let editModel: EditModel = {
                                        columnDefs: columnDefs,
                                        inputModel: model[0]
                                    };

                                    observer.next(editModel);
                                    observer.complete();
                                });
                        }, (error) => {
                            this.crudService.serviceNotifications.createNotificationOnResponse(
                                error);
                            observer.error(error);
                            observer.complete();
                        });
                }, error => {
                    this.crudService.serviceNotifications.createNotificationOnResponse(error);
                    this.location.back();
                    observer.error(error);
                    observer.complete();
                });
        });

    }

}
