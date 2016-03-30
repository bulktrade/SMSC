import {Directive, ElementRef} from 'angular2/core';
import {Login} from "../../login/login";

@Directive({
    selector: '[customers-grid]'
})
export class CustomersGrid {
    private static visible = false;
    private static customersStore: any;
    private static idCounter: number = 4;


    constructor(private element: ElementRef) {}

    mainStore() {
        return Ext.create('Ext.data.Store', {
            model: 'Customers',
            data: [
                {id: '1', company_name: 'SMSC'},
                {id: '2', company_name: 'SMSC'},
                {id: '3', company_name: 'SMSC'}
            ]
        });
    }

    ngOnInit() {
        if (!CustomersGrid.visible) {
            Ext.define('Customers', {
                extend: 'Ext.data.Model',
                fields: [
                    {name: 'id', type: 'number'},
                    {name: 'company_name', type: 'string'},
                ]
            });
        }

        CustomersGrid.customersStore = this.mainStore();

        let rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToMoveEditor: 1,
            autoCancel: false
        });

        if (Login.getCookie()) {
            let grid = Ext.create('Ext.grid.Panel', {
                renderTo: this.element.nativeElement,
                store: CustomersGrid.customersStore,
                width: 1000,
                height: 500,
                title: 'CustomersGrid',
                columns: [
                    {
                        text: 'Customer ID',
                        dataIndex: 'id',
                        flex: 1,
                    },
                    {
                        text: 'Company Name',
                        dataIndex: 'company_name',
                        flex: 1,
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

                        // Create a model instance
                        let r = Ext.create('Customers', {
                            id: CustomersGrid.idCounter++,
                            company_name: 'SMSC',
                        });

                        CustomersGrid.customersStore.insert(CustomersGrid.idCounter, r);
                        rowEditing.startEdit(0, 0);
                    }
                }, {
                    itemId: 'remove',
                    text: 'Remove',
                    handler: () => {
                        let sm = grid.getSelectionModel();
                        rowEditing.cancelEdit();
                        CustomersGrid.customersStore.remove(sm.getSelection());
                        if (CustomersGrid.customersStore.getCount() > 0) {
                            sm.select(0);
                        }
                        CustomersGrid.idCounter--;
                    },
                    disabled: true
                }],
                plugins: [rowEditing],
                listeners: {
                    'selectionchange': (view, records) => {
                        grid.down('#remove').setDisabled(!records.length);
                    }
                }
            });
        } else {
            let grid = Ext.create('Ext.grid.Panel', {
                renderTo: this.element.nativeElement,
                store: CustomersGrid.customersStore,
                width: 1000,
                height: 500,
                title: 'CustomersGrid',
                columns: [
                    {
                        text: 'Customer ID',
                        dataIndex: 'id',
                        flex: 1,
                        editor: {
                            allowBlank: false
                        }
                    },
                    {
                        text: 'Company Name',
                        dataIndex: 'company_name',
                        flex: 1,
                        editor: {
                            allowBlank: false
                        }
                    }
                ],
            });
        }
        CustomersGrid.visible = true;
    }
}
