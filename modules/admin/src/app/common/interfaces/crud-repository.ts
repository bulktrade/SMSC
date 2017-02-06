import * as Rx from "rxjs/Rx";

export interface CrudRepository {
    repositoryName: string;
    projectionName: string;
    titleColumns: string;
    deleteResource(id: number): Rx.Observable<any>;
    createResource(data: any): Rx.Observable<any>;
    updateResource(id: number, data: any): Rx.Observable<any>;
    getResource(id: number): Rx.Observable<any>;
    getResources(page?: number, size?: number): Rx.Observable<any>;
}
