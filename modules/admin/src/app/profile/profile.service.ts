'use strict';

import {Injectable} from "@angular/core";
import {ODatabaseService} from "../orientdb/orientdb.service";

const squel = require('squel');

@Injectable()
export class ProfileService {
    constructor(public database?:ODatabaseService) {

    }

    public getProfile(username:String) {
        let query = squel.select()
            .from('OUser')
            .where('name = ?', username);

        return new Promise((resolve, reject) => {
            this.database.query(query.toString(), 1)
                .then(
                    res => {
                        resolve();
                    },
                    error => {
                    }
                );
        });
    }
}
