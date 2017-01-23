import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { CrudResolve } from "./common/crud-resolve";
import { CrudService } from "./crud.service";
import { CrudLevelService } from "./services/crud-level";

@Injectable()
export class MainCrudResolve extends CrudResolve {

    constructor(public crudService: CrudService,
                public crudLevelService: CrudLevelService,
                public router: Router) {
        super();
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        this.crudService.setClassName(route.parent.data['backend'].crudEntity);

        this.crudService.setRepositoryName(route.parent.data['backend'].repositoryName);

        this.crudService.setCrudRootPath(route.parent.pathFromRoot);

        this.crudLevelService.resetCrudLevels();

    }

}
