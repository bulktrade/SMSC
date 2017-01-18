import { Injectable } from "@angular/core";
import { Http, RequestMethod, Headers, Response, URLSearchParams } from "@angular/http";
import { Observable } from "rxjs";
import { User } from "./model/user";
import { CrudClassMetaData } from "./model/crud-class-meta-data";
import { CrudMetaFormData } from "./model/crud-meta-form-data";
import { CrudMetaGridData } from "./model/crud-meta-grid-data";
import { TokenService } from "../auth/token.service";
import { RequestOptions } from "@angular/http/src/base_request_options";

@Injectable()
export class BackendService {
    private databaseUrl: string;
    private urlPrefix: string;
    private urlSuffix: string;

    constructor(public http: Http, public tokenService: TokenService) {
        this.databaseUrl = 'rest';
        this.urlSuffix = '/';
        this.urlPrefix = this.databaseUrl + this.urlSuffix;
    }

    /**
     * Receive new Access and Refresh tokens using valid credentials
     * @param username
     * @param password
     * @returns {any}
     */
    authentication(username: string = '', password: string = '') {
        let requestOptions = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            method: RequestMethod.Post,
            body: {
                username: username,
                password: password
            }
        });

        return Observable.create(obs => {
            this.http.request(this.urlPrefix + 'auth/token', requestOptions)
                .subscribe((res: Response) => {
                    obs.next(res.json());
                    obs.complete();
                }, err => {
                    obs.error(err);
                    obs.complete();
                });
        });
    }

    /**
     * Receives refreshed Access token using valid Refresh token
     * @param expiredToken
     * @param refreshToken
     * @returns {any}
     */
    refresheAccessToken(expiredToken: string = '', refreshToken: string = '') {
        let requestOptions = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            method: RequestMethod.Put,
            body: {
                expiredToken: expiredToken,
                refreshToken: refreshToken
            }
        });

        return Observable.create(obs => {
            this.http.request(this.urlPrefix + 'auth/token', requestOptions)
                .subscribe((res: Response) => {
                    obs.next(res.json());
                    obs.complete();
                }, err => {
                    obs.error(err);
                    obs.complete();
                });
        });
    }

    /**
     * Creates user
     * @param user
     * @returns {any}
     */
    createUser(user: User) {
        let requestOptions = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            method: RequestMethod.Post,
            body: user
        });

        return Observable.create(obs => {
            this.http.request(this.urlPrefix + 'repository/users/create', requestOptions)
                .subscribe((res: Response) => {
                    obs.next(res.json());
                    obs.complete();
                }, err => {
                    obs.error(err);
                    obs.complete();
                });
        });
    }

    /**
     * Updates user
     * @param id
     * @param user
     * @returns {any}
     */
    updateUser(id: string = '', user: User) {
        let requestOptions = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            method: RequestMethod.Put,
            body: user
        });

        return Observable.create(obs => {
            this.http.request(this.urlPrefix + 'repository/users/update' + this.urlSuffix + id, requestOptions)
                .subscribe((res: Response) => {
                    obs.next(res.json());
                    obs.complete();
                }, err => {
                    obs.error(err);
                    obs.complete();
                });
        });
    }

    /**
     * Finds one user
     * @param id
     * @returns {any}
     */
    getUser(id: string = '') {
        let requestOptions = new RequestOptions({
            method: RequestMethod.Get
        });

        return Observable.create(obs => {
            this.http.request(this.urlPrefix + 'repository/users/findOne' + this.urlSuffix + id, requestOptions)
                .subscribe((res: Response) => {
                    obs.next(res.json());
                    obs.complete();
                }, err => {
                    obs.error(err);
                    obs.complete();
                });
        });
    }

    /**
     * Finds all users
     * @returns {any}
     */
    getAllUsers() {
        let requestOptions = new RequestOptions({
            method: RequestMethod.Get
        });

        return Observable.create(obs => {
            this.http.request(this.urlPrefix + 'repository/users/findAll', requestOptions)
                .subscribe((res: Response) => {
                    obs.next(res.json());
                    obs.complete();
                }, err => {
                    obs.error(err);
                    obs.complete();
                });
        });
    }

    /**
     * Delete user
     * @param id
     * @returns {any}
     */
    deleteUser(id: string = '') {
        let requestOptions = new RequestOptions({
            method: RequestMethod.Delete
        });

        return Observable.create(obs => {
            this.http.request(this.urlPrefix + 'repository/users/delete' + this.urlSuffix + id, requestOptions)
                .subscribe((res: Response) => {
                    obs.next(res.json());
                    obs.complete();
                }, err => {
                    obs.error(err);
                    obs.complete();
                });
        });
    }

    /**
     * Adds role to user
     * @param userId
     * @param roleId
     * @returns {any}
     */
    addRoleToUser(userId: string = '', roleId: string = '') {
        let search = new URLSearchParams();
        search.set('userId', userId);
        search.set('roleId', roleId);

        let requestOptions = new RequestOptions({
            method: RequestMethod.Get,
            search: search
        });

        return Observable.create(obs => {
            this.http.request(this.urlPrefix + 'repository/users/addRole', requestOptions)
                .subscribe((res: Response) => {
                    obs.next(res.json());
                    obs.complete();
                }, err => {
                    obs.error(err);
                    obs.complete();
                });
        });
    }

    /**
     * Removes role from user
     * @param userId
     * @param roleId
     * @returns {any}
     */
    removeRoleFromUser(userId: string = '', roleId: string = '') {
        let search = new URLSearchParams();
        search.set('userId', userId);
        search.set('roleId', roleId);

        let requestOptions = new RequestOptions({
            method: RequestMethod.Get,
            search: search
        });

        return Observable.create(obs => {
            this.http.request(this.urlPrefix + 'repository/users/removeRole', requestOptions)
                .subscribe((res: Response) => {
                    obs.next(res.json());
                    obs.complete();
                }, err => {
                    obs.error(err);
                    obs.complete();
                });
        });
    }

    /**
     * Creates crudClassMetaData
     * @param crudClassMetaData
     * @returns {any}
     */
    createCrudClassMetaData(crudClassMetaData: CrudClassMetaData) {
        let requestOptions = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            method: RequestMethod.Post,
            body: crudClassMetaData
        });

        return Observable.create(obs => {
            this.http.request(this.urlPrefix + 'repository/crud-class-meta-data', requestOptions)
                .subscribe((res: Response) => {
                    obs.next(res.json());
                    obs.complete();
                }, err => {
                    obs.error(err);
                    obs.complete();
                });
        });
    }

    /**
     * Updates crudClassMetaData
     * @param id
     * @param crudClassMetaData
     * @returns {any}
     */
    updateCrudClassMetaData(id: string = '', crudClassMetaData: CrudClassMetaData) {
        let requestOptions = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            method: RequestMethod.Put,
            body: crudClassMetaData
        });

        return Observable.create(obs => {
            this.http.request(this.urlPrefix + 'repository/crud-class-meta-data' + this.urlSuffix + id, requestOptions)
                .subscribe((res: Response) => {
                    obs.next(res.json());
                    obs.complete();
                }, err => {
                    obs.error(err);
                    obs.complete();
                });
        });
    }

    /**
     * Finds one crudClassMetaData
     * @param id
     * @returns {any}
     */
    getCrudClassMetaData(id: string = '') {
        let requestOptions = new RequestOptions({
            method: RequestMethod.Get
        });

        return Observable.create(obs => {
            this.http.request(this.urlPrefix + 'repository/crud-class-meta-data' + this.urlSuffix + id, requestOptions)
                .subscribe((res: Response) => {
                    obs.next(res.json());
                    obs.complete();
                }, err => {
                    obs.error(err);
                    obs.complete();
                });
        });
    }

    /**
     * Finds all crudClassMetaData
     * @returns {any}
     */
    getAllCrudClassMetaData() {
        let requestOptions = new RequestOptions({
            method: RequestMethod.Get
        });

        return Observable.create(obs => {
            this.http.request(this.urlPrefix + 'repository/crud-class-meta-data', requestOptions)
                .subscribe((res: Response) => {
                    obs.next(res.json()._embedded['crud-class-meta-data']);
                    obs.complete();
                }, err => {
                    obs.error(err);
                    obs.complete();
                });
        });
    }

    /**
     * Deletes crudClassMetaData
     * @param id
     * @returns {any}
     */
    deleteCrudClassMetaData(id: string = '') {
        let requestOptions = new RequestOptions({
            method: RequestMethod.Delete
        });

        return Observable.create(obs => {
            this.http.request(this.urlPrefix + 'repository/crud-class-meta-data' + this.urlSuffix + id, requestOptions)
                .subscribe((res: Response) => {
                    obs.next(res.json());
                    obs.complete();
                }, err => {
                    obs.error(err);
                    obs.complete();
                });
        });
    }

    /**
     * Creates crudMetaFormData
     * @param crudMetaFormData
     * @returns {any}
     */
    createCrudMetaFormData(crudMetaFormData: CrudMetaFormData) {
        let requestOptions = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            method: RequestMethod.Post,
            body: crudMetaFormData
        });

        return Observable.create(obs => {
            this.http.request(this.urlPrefix + 'repository/crud-meta-form-data', requestOptions)
                .subscribe((res: Response) => {
                    obs.next(res.json());
                    obs.complete();
                }, err => {
                    obs.error(err);
                    obs.complete();
                });
        });
    }

    /**
     * Updates crudMetaFormData
     * @param id
     * @param crudMetaFormData
     * @returns {any}
     */
    updateCrudMetaFormData(id: string = '', crudMetaFormData: CrudMetaFormData) {
        let requestOptions = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            method: RequestMethod.Put,
            body: crudMetaFormData
        });

        return Observable.create(obs => {
            this.http.request(this.urlPrefix + 'repository/crud-meta-form-data' + this.urlSuffix + id, requestOptions)
                .subscribe((res: Response) => {
                    obs.next(res.json());
                    obs.complete();
                }, err => {
                    obs.error(err);
                    obs.complete();
                });
        });
    }

    /**
     * Finds one crudMetaFormData
     * @param id
     * @returns {any}
     */
    getCrudMetaFormData(id: string = '') {
        let requestOptions = new RequestOptions({
            method: RequestMethod.Get
        });

        return Observable.create(obs => {
            this.http.request(this.urlPrefix + 'repository/crud-meta-form-data' + this.urlSuffix + id, requestOptions)
                .subscribe((res: Response) => {
                    obs.next(res.json());
                    obs.complete();
                }, err => {
                    obs.error(err);
                    obs.complete();
                });
        });
    }

    /**
     * Finds all crudMetaFormData
     * @returns {any}
     */
    getAllCrudMetaFormData() {
        let requestOptions = new RequestOptions({
            method: RequestMethod.Get
        });

        return Observable.create(obs => {
            this.http.request(this.urlPrefix + 'repository/crud-meta-form-data', requestOptions)
                .subscribe((res: Response) => {
                    obs.next(res.json());
                    obs.complete();
                }, err => {
                    obs.error(err);
                    obs.complete();
                });
        });
    }

    /**
     * Deletes crudMetaFormData
     * @param id
     * @returns {any}
     */
    deleteCrudMetaFormData(id: string = '') {
        let requestOptions = new RequestOptions({
            method: RequestMethod.Delete
        });

        return Observable.create(obs => {
            this.http.request(this.urlPrefix + 'repository/crud-meta-form-data' + this.urlSuffix + id, requestOptions)
                .subscribe((res: Response) => {
                    obs.next(res.json());
                    obs.complete();
                }, err => {
                    obs.error(err);
                    obs.complete();
                });
        });
    }

    /**
     * Creates crudMetaGridData
     * @param crudMetaGridData
     * @returns {any}
     */
    createCrudMetaGridData(crudMetaGridData: CrudMetaGridData) {
        let requestOptions = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            method: RequestMethod.Post,
            body: crudMetaGridData
        });

        return Observable.create(obs => {
            this.http.request(this.urlPrefix + 'repository/crud-meta-grid-data', requestOptions)
                .subscribe((res: Response) => {
                    obs.next(res.json());
                    obs.complete();
                }, err => {
                    obs.error(err);
                    obs.complete();
                });
        });
    }

    /**
     * Updates crudMetaGridData
     * @param id
     * @param crudMetaGridData
     * @returns {any}
     */
    updateCrudMetaGridData(id: string = '', crudMetaGridData: CrudMetaGridData) {
        let requestOptions = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            method: RequestMethod.Put,
            body: crudMetaGridData
        });

        return Observable.create(obs => {
            this.http.request(this.urlPrefix + 'repository/crud-meta-grid-data' + this.urlSuffix + id, requestOptions)
                .subscribe((res: Response) => {
                    obs.next(res.json());
                    obs.complete();
                }, err => {
                    obs.error(err);
                    obs.complete();
                });
        });
    }

    /**
     * Finds one crudMetaGridData
     * @param id
     * @returns {any}
     */
    getCrudMetaGridData(id: string = '') {
        let requestOptions = new RequestOptions({
            method: RequestMethod.Get
        });

        return Observable.create(obs => {
            this.http.request(this.urlPrefix + 'repository/crud-meta-grid-data' + this.urlSuffix + id, requestOptions)
                .subscribe((res: Response) => {
                    obs.next(res.json());
                    obs.complete();
                }, err => {
                    obs.error(err);
                    obs.complete();
                });
        });
    }

    /**
     * Finds all crudMetaGridData
     * @returns {any}
     */
    getAllCrudMetaGridData() {
        let requestOptions = new RequestOptions({
            method: RequestMethod.Get
        });

        return Observable.create(obs => {
            this.http.request(this.urlPrefix + 'repository/crud-meta-grid-data', requestOptions)
                .subscribe((res: Response) => {
                    obs.next(res.json());
                    obs.complete();
                }, err => {
                    obs.error(err);
                    obs.complete();
                });
        });
    }

    /**
     * Deletes crudMetaGridData
     * @param id
     * @returns {any}
     */
    deleteCrudMetaGridData(id: string = '') {
        let requestOptions = new RequestOptions({
            method: RequestMethod.Delete
        });

        return Observable.create(obs => {
            this.http.request(this.urlPrefix + 'repository/crud-meta-grid-data' + this.urlSuffix + id, requestOptions)
                .subscribe((res: Response) => {
                    obs.next(res.json());
                    obs.complete();
                }, err => {
                    obs.error(err);
                    obs.complete();
                });
        });
    }

    /**
     * Gets data by link from repository
     * @param link
     * @returns {any}
     */
    getDataByLink(link: string = '') {
        let requestOptions = new RequestOptions({
            method: RequestMethod.Get
        });

        return Observable.create(obs => {
            this.http.request(link, requestOptions)
                .subscribe((res: Response) => {
                    obs.next(res.json()._embedded);
                    obs.complete();
                }, err => {
                    obs.error(err);
                    obs.complete();
                });
        });
    }


    /**
     * Creates the new resource to the specified repository
     * @param data
     * @param repositoryName
     * @returns {any}
     */
    createResource(data, repositoryName: string = '') {
        let requestOptions = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            method: RequestMethod.Post,
            body: data
        });

        return Observable.create(obs => {
            this.http.request(this.urlPrefix + 'repository' + this.urlSuffix + repositoryName, requestOptions)
                .subscribe((res: Response) => {
                    obs.next(res.json());
                    obs.complete();
                }, err => {
                    obs.error(err);
                    obs.complete();
                });
        });
    }

    /**
     * Replaces the resource identified by id in the specified repository
     * @param id
     * @param data
     * @param repositoryName
     * @returns {any}
     */
    updateResource(id: string = '', data, repositoryName: string = '') {
        let requestOptions = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            method: RequestMethod.Put,
            body: data
        });

        return Observable.create(obs => {
            this.http.request(this.urlPrefix + 'repository' + this.urlSuffix + repositoryName +
                this.urlSuffix + id, requestOptions)
                .subscribe((res: Response) => {
                    obs.next(res.json());
                    obs.complete();
                }, err => {
                    obs.error(err);
                    obs.complete();
                });
        });
    }

    /**
     * Removes the resource with id from the specified repository
     * @param id
     * @param repositoryName
     * @returns {any}
     */
    deleteResource(id: string = '', repositoryName: string = '') {
        let requestOptions = new RequestOptions({
            method: RequestMethod.Delete
        });

        return Observable.create(obs => {
            this.http.request(this.urlPrefix + 'repository' + this.urlSuffix + repositoryName
                + this.urlSuffix + id, requestOptions)
                .subscribe((res: Response) => {
                    obs.next(res.json());
                    obs.complete();
                }, err => {
                    obs.error(err);
                    obs.complete();
                });
        });
    }

    /**
     * Retrieves a single resource with the given id from the specified repository
     * @param id
     * @param repositoryName
     * @returns {any}
     */
    getResource(id: string = '', repositoryName: string = '') {
        let requestOptions = new RequestOptions({
            method: RequestMethod.Get
        });

        return Observable.create(obs => {
            this.http.request(this.urlPrefix + 'repository' + this.urlSuffix + repositoryName +
                this.urlSuffix + id, requestOptions)
                .subscribe((res: Response) => {
                    obs.next(res.json());
                    obs.complete();
                }, err => {
                    obs.error(err);
                    obs.complete();
                });
        });
    }

    /**
     * Retrieves a list of all resources from the specified repository
     * @param repositoryName
     * @returns {any}
     */
    getResources(repositoryName: string = '') {
        let requestOptions = new RequestOptions({
            method: RequestMethod.Get
        });

        return Observable.create(obs => {
            this.http.request(this.urlPrefix + 'repository' + this.urlSuffix + repositoryName, requestOptions)
                .subscribe((res: Response) => {
                    obs.next(res.json()['_embedded'][repositoryName]);
                    obs.complete();
                }, err => {
                    obs.error(err);
                    obs.complete();
                });
        });
    }
}
