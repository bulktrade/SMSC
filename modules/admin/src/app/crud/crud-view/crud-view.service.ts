import { Injectable } from "@angular/core";
import { BackendService } from "../../services/backend/backend.service";
import { Pagination } from "../model/pagination";
import { Observable } from "rxjs";
import { CrudService } from "../crud.service";

@Injectable()
export class CrudViewService {

    constructor(public backendService: BackendService,
                public crudService: CrudService) {
    }

    getCountRows() {
        return Observable.create(obs => {
            this.backendService.getResources(this.crudService.getRepositoryName())
                .subscribe(res => {
                    obs.next(res.page.totalElements);
                    obs.complete();
                }, err => {
                    obs.error(err);
                    obs.complete();
                })
        });
    }
}
