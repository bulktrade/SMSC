/// <reference path="../../../../assets/js/ExtJS.d.ts" />
import {Directive, ElementRef} from 'angular2/core';
import {Cookie} from '../../login/cookie';
import {ODatabaseService} from '../../../../Service/OrientDB.service';
import {resolve} from "url";

@Directive({
    selector: '[customers-grid]'
})
export class CustomersGrid {
    private static visible = false;
    private static customersStore: any;

    constructor(private element: ElementRef, public databaseservice: ODatabaseService) {
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
                    {name: 'company_name', type: 'string'},
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
                                company_name: res.company_name,
                            });

                            CustomersGrid.customersStore.insert(0, r);
                        });

                }
            }, {
                itemId: 'remove',
                text: 'Remove',
                handler: () => {
                    let sm = grid.getSelectionModel();
                    this.delete(sm.getSelection()[0].data.customer_id, sm.getSelection()[0].data.company_name);
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
                    let originCustomerId  = e.originalValues.customer_id,
                        dataCustomerId    = CustomersGrid.customersStore.getAt(e.rowIdx).data.customer_id,
                        originCompanyName = e.originalValues.company_name,
                        dataCompanyName   = CustomersGrid.customersStore.getAt(e.rowIdx).data.company_name;

                    this.update(originCustomerId, dataCustomerId, originCompanyName, dataCompanyName);
                }
            }
        });

        CustomersGrid.visible = true;
    }

    update(originId, dataId, originName, dataName) {
        this.databaseservice.executeCommand('UPDATE customer SET customer_id=\''+ dataId +'\', ' +
            'company_name=\''+ dataName +'\' WHERE customer_id=\''+ originId +'\' AND company_name=\''+ originName +'\'');
    }

    query() {
        return this.databaseservice.query('select from customer')
            .then((data) => {
                let store = [];
                for (var i = 0; i < data.result.length; i++) {
                    store.push({customer_id: data.result[i].customer_id, company_name: data.result[i].company_name});
                }
                return store;
            })
    }

    insert() {
        return this.databaseservice.query('SELECT max(customer_id) FROM customer')
            .then((res) => {
                let next_id = 1;

                if (res.result.length) {
                    next_id = Number(res.result[0].max)+1;
                }

                this.databaseservice.executeCommand('insert into customer ' +
                    '(customer_id,company_name) values (\''+ next_id +'\',\'SMSC\')');
                return {customer_id: next_id, company_name: 'SMSC'};
            });
    }

    delete(id, name) {
        this.databaseservice.executeCommand('DELETE FROM customer WHERE customer_id = \''+ id +'\' AND company_name = \''+ name +'\'');
    }
}
