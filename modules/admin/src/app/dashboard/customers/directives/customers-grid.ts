import {Directive, ElementRef} from '@angular/core';
import {ODatabaseService} from '../../../orientdb/orientdb.service';

declare var sprintf: any;
declare var Ext: any;

@Directive({
    selector: '[customers-grid]',
    providers: []
})
export class CustomersGrid {
    private static visible = false;
    private static customersStore: any;

    constructor(public element?: ElementRef, public databaseservice?: ODatabaseService) {
    }

    mainStore(store) {
        return Ext.create('Ext.data.Store', {
            model: 'Customers',
            data: store
        });
    }

    ngOnInit() {
        this.query()
            .then((store) => {
                this.createGrid(store);
            });
    }

    createGrid(store) {
        if (!CustomersGrid.visible) {
            Ext.define('Customers', {
                extend: 'Ext.data.Model',
                fields: [
                    {name: 'customer_id', type: 'number'},
                    {name: 'company_name', type: 'string'}
                ]
            });
        }

        CustomersGrid.customersStore = this.mainStore(store);

        let rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToMoveEditor: 1,
            autoCancel: false
        });

        let grid = Ext.create('Ext.grid.Panel', {
            renderTo: this.element.nativeElement,
            store: CustomersGrid.customersStore,
            height: 476,
            title: 'Customers',
            style: {
                borderRadius: '3px'
            },
            columns: [
                {
                    text: 'Customer ID',
                    dataIndex: 'customer_id',
                    flex: 0.5,
                    editor: {
                        allowBlank: false
                    }
                },
                {
                    text: 'Company Name',
                    dataIndex: 'company_name',
                    flex: 4,
                    editor: {
                        allowBlank: false
                    }
                }
            ],
            tbar: [{
                itemId: 'add',
                text: 'Add',
                handler: () => {
                    rowEditing.cancelEdit();

                    this.insert()
                        .then((res) => {
                            let r = Ext.create('Customers', {
                                customer_id: res.customer_id,
                                company_name: res.company_name
                            });

                            CustomersGrid.customersStore.insert(0, r);
                        });
                }
            }, {
                itemId: 'remove',
                text: 'Remove',
                handler: () => {
                    let sm = grid.getSelectionModel();
                    this.delete(sm.getSelection()[0].data.customer_id,
                        sm.getSelection()[0].data.company_name);
                    rowEditing.cancelEdit();
                    CustomersGrid.customersStore.remove(sm.getSelection());
                    if (CustomersGrid.customersStore.getCount() > 0) {
                        sm.select(0);
                    }
                },
                disabled: true
            }],
            plugins: [rowEditing],
            listeners: {
                'selectionchange': (view, records) => {
                    grid.down('#remove').setDisabled(!records.length);
                },
                edit: (editor, e) => {
                    let originCustomerId  = e.originalValues.
                            customer_id,
                        dataCustomerId = CustomersGrid.
                            customersStore.getAt(e.rowIdx)
                            .data.customer_id,
                        originCompanyName = e.originalValues.
                            company_name,
                        dataCompanyName   = CustomersGrid.
                            customersStore.getAt(e.rowIdx).
                            data.company_name;

                    this.update(originCustomerId, dataCustomerId,
                        originCompanyName, dataCompanyName);
                }
            }
        });

        CustomersGrid.visible = true;
    }

    update(originId, dataId, originName, dataName) {
        this.databaseservice.query(
        sprintf('select from customer where customer_id = \'%s\' and company_name = \'%s\'',
            originId, originName))
            .then((data) => {
                let rid = data.result[0]['@rid'],
                    version = data.result[0]['@version'],
                    str = sprintf('{ "transaction" : true, "operations" : ' +
                        '[ { "type" : "u", "record" : ' +
                        '{ "@rid" : "%s", "@version": %s, ' +
                        '"customer_id": "%s", "company_name": "%s" } } ] }',
                        rid, version, dataId, dataName);

                this.databaseservice.batchRequest(str);
            });
    }

    query() {
        return this.databaseservice.query('select from customer')
            .then((data) => {
                let store = [];
                for (let i = 0; i < data.result.length; i++) {
                    store.push({customer_id: data.result[i].customer_id,
                        company_name: data.result[i].company_name});
                }
                return store;
            });
    }

    insert() {
        return this.databaseservice.query('SELECT max(customer_id) FROM customer')
            .then((data) => {
                let nextId = 1;

                if (data.result.length) {
                    nextId = Number(data.result[0].max) + 1;
                }

                let str = sprintf('{ "transaction" : true, "operations" : ' +
                    '[ { "type" : "c", "record" : ' +
                    '{ "@class" : "customer", "customer_id" : "%s",' +
                    '"company_name" : "%s" } } ] }', nextId, 'SMSC');

                this.databaseservice.batchRequest(str);

                return {customer_id: nextId, company_name: 'SMSC'};
            });
    }

    delete(id, name) {
        this.databaseservice.query(
            sprintf('select from customer where customer_id = "%s" and company_name = "%s"',
                id, name))
            .then((data) => {
                let rid = data.result[0]['@rid'],
                    str = sprintf('{ "transaction" : true, "operations" : ' +
                        '[ { "type" : "d", "record" : ' +
                        '{ "@rid" : "%s" } } ] }', rid);

                this.databaseservice.batchRequest(str);
            });
    }
}
