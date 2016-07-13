import {ODatabaseService} from '../../orientdb/orientdb.service';
import { Injectable } from '@angular/core';
import {Response} from '@angular/http';

declare var sprintf: any;

@Injectable()
export class CustomerModel {
    constructor(public databaSeservice: ODatabaseService) {
    }

    delete(rid) {
        let batch = sprintf('{ "transaction" : true, "operations" : ' +
            '[ { "type" : "d", "record" : ' +
            '{ "@rid" : "%s" } } ] }', rid);

        this.databaSeservice.batchRequest(batch);
    }

    insert(params) {
        let batch = '{ "transaction" : true, "operations" : ' +
            '[ { "type" : "c", "record" : ' +
            '{ "@class" : "customer", ';

        for (var key in params) {
            batch += '"' + key + '" : "%(' + key + ')s", ';
        }

        batch = batch.substring(0, batch.length - 2) + '}}]}';

        this.databaSeservice.batchRequest(sprintf(batch, params));
    }

    update(params) {
        let batch = '{ "transaction" : true, "operations" : ' +
            '[ { "type" : "u", "record" : ' +
            '{ "@rid" : "%(rid)s", "@version": "%(version)s", ';

        for (var key in params) {
            if (key !== 'rid' && key !== 'version') {
            	batch += '"' + key + '" : "%(' + key + ')s", ';
        	}
        }

        batch = batch.substring(0, batch.length - 2) + '}}]}';

        this.databaSeservice.batchRequest(sprintf(batch, params));
    }

    query() {
        return this.databaSeservice.query('select from customer')
            .then((res: Response) => {
                let store = [];
                let data = res.json();
                for (let i = 0; i < data['result'].length; i++) {
                    store.push({
                        customer_id: data['result'][i].customer_id,
                        company_name: data['result'][i].company_name,
                        contacts: data['result'][i].contacts,
                    });
                }
                return store;
            });
    }

    getRowData(params) {
		let sql = 'select from customer where';

        for (var key in params) {
            sql += ' ' + key + ' = "%(' + key + ')s" and';
        }

        sql = sql.substring(0, sql.length - 4);

    	return this.databaSeservice.query(sprintf(sql, params))
	            .then((res: Response) => {
	            	console.log(res.json());
	                return res.json()['result'][0];
	            });
    }
}
