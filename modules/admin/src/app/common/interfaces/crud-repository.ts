import * as Rx from "rxjs/Rx";

export interface CrudRepository<T> {
    repositoryName: string;
    projectionName: string;
    titleColumns: string;
    deleteResource(id: number): Rx.Observable<T>;
    createResource(data: T): Rx.Observable<T>;
    updateResource(id: number, data: T): Rx.Observable<T>;
    getResource(id: number): Rx.Observable<T>;
    getResources(page?: number, size?: number): Rx.Observable<T[]>;
}
