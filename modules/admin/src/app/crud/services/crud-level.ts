import { Injectable } from "@angular/core";
import { CrudLevel } from "../model/crud-level";
import { Router } from "@angular/router";

@Injectable()
export class CrudLevelService {

    public readonly limitCrudLevel: number = 3;

    public crudLevels: CrudLevel[] = [];

    public currentCrudLevel: CrudLevel = null;

    constructor(public router: Router) {
    }

    nextCrudLevel(crudLevel: CrudLevel) {
        if (!this.isLimitCrudLevel()) {
            this.setCrudCurrentLevel(crudLevel);
            this.crudLevels.push(this.getCrudCurrentLevel());
        }
    }

    previousCrudLevel() {
        if (this.crudLevels.length > 0) {
            this.setCrudCurrentLevel(this.crudLevels.pop());
            return this.getCrudCurrentLevel();
        }
    }

    resetCrudLevels() {
        this.crudLevels = [];
        this.currentCrudLevel = null;
    }

    isLimitCrudLevel() {
        return this.crudLevels.length === this.limitCrudLevel;
    }

    isEmptyCrudLevels() {
        return !this.crudLevels.length;
    }

    setCrudCurrentLevel(crudLevel: CrudLevel) {
        this.currentCrudLevel = crudLevel;
    }

    getCrudCurrentLevel() {
        return this.currentCrudLevel;
    }

}
