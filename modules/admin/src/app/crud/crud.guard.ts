import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs/Rx";
import { CrudLevelService } from "./services/crud-level";
import { CrudService } from "./crud.service";

@Injectable()
export class CrudGuard implements CanActivate {
    constructor(protected router: Router,
                protected crudService: CrudService,
                protected crudLevelService: CrudLevelService) {
    }

    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> | boolean {

        // set crud class name
        this.crudService.setClassName(route.parent.data['backend'].crudEntity);

        // set crud repository name
        this.crudService.setRepositoryName(route.parent.data['backend'].repositoryName);

        // set path to root
        this.crudService.setCrudRootPath(route.parent.pathFromRoot);

        // reset all crud levels
        this.crudLevelService.resetCrudLevels();

        // if crud levels is not empty then navigate to the crud view
        if (!this.crudLevelService.isEmptyCrudLevels()) {
            this.router.navigateByUrl(this.crudService.getCrudRootPath());
        }

        return true;
    }
}
