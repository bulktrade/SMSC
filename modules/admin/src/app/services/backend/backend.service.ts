import { Injectable } from "@angular/core";
import { Http, RequestMethod, RequestOptions, Headers, Response, URLSearchParams } from "@angular/http";
import { Observable } from "rxjs";
import { User } from "./model/user";
import { CrudClassMetaData } from "./model/crud-class-meta-data";
import { CrudMetaFormData } from "./model/crud-meta-form-data";

@Injectable()
export class BackendService {
    private databaseUrl: string;
    private urlPrefix: string;
    private urlSuffix: string;

    constructor(private http: Http) {
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
            headers: new Headers({ 'Content-Type': 'application/json' }),
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
            headers: new Headers({ 'Content-Type': 'application/json' }),
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
            headers: new Headers({ 'Content-Type': 'application/json' }),
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
            headers: new Headers({ 'Content-Type': 'application/json' }),
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
    findOneUser(id: string = '') {
        let requestOptions = new RequestOptions({
            method: RequestMethod.Get,
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
    findAllUsers() {
        let requestOptions = new RequestOptions({
            method: RequestMethod.Get,
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
            method: RequestMethod.Delete,
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
            headers: new Headers({ 'Content-Type': 'application/json' }),
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
            headers: new Headers({ 'Content-Type': 'application/json' }),
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
    findOneCrudClassMetaData(id: string = '') {
        let requestOptions = new RequestOptions({
            method: RequestMethod.Get,
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
    findAllCrudClassMetaData() {
        let requestOptions = new RequestOptions({
            method: RequestMethod.Get,
        });

        return Observable.create(obs => {
            this.http.request(this.urlPrefix + 'repository/crud-class-meta-data/search/findAll', requestOptions)
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
     * Deletes crudClassMetaData
     * @param id
     * @returns {any}
     */
    deleteCrudClassMetaData(id: string = '') {
        let requestOptions = new RequestOptions({
            method: RequestMethod.Delete,
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
            headers: new Headers({ 'Content-Type': 'application/json' }),
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
            headers: new Headers({ 'Content-Type': 'application/json' }),
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
            method: RequestMethod.Get,
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
            method: RequestMethod.Get,
        });

        return Observable.create(obs => {
            this.http.request(this.urlPrefix + 'repository/crud-meta-form-data/search/findAll', requestOptions)
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
            method: RequestMethod.Delete,
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
}
