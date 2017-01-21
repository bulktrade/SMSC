'use strict';

import {Injectable} from "@angular/core";

const squel = require('squel');

@Injectable()
export class ProfileService {
    constructor() {

    }

    public getProfile(username: String) {
        // let query = squel.select()
        //     .from('OUser')
        //     .where('name = ?', username);
        //
        // return Observable.create((obs) => {
        //     this.database.query(query.toString(), 1).subscribe(
        //         (result) => {
        //             obs.next(result);
        //             obs.complete();
        //         },
        //         (error) => {
        //             obs.error(error);
        //             obs.complete();
        //         }
        //     );
        // });
    }
}
