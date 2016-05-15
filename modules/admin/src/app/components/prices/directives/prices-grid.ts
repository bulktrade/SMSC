import {Directive, ElementRef} from '@angular/core';
import {LocalStorage} from '../../login/localstorage';

@Directive({
    selector: '[prices-grid]'
})
export class PricesGrid {
    private static visible = false;
    private static priceStore: any;


    constructor(private element: ElementRef) {}

    mainStore() {
        return Ext.create('Ext.data.Store', {
            model: 'Prices',
            data: [
                {mcc: '1', mnc: '2', price: '3', type: 'numeric',
                    valid_from: '10/10/2014', valid_to: '10/10/2014'},
                {mcc: '1', mnc: '2', price: '3', type: 'numeric',
                    valid_from: '10/10/2014', valid_to: '10/10/2014'},
                {mcc: '1', mnc: '2', price: '3', type: 'numeric',
                    valid_from: '10/10/2014', valid_to: '10/10/2014'},
                {mcc: '1', mnc: '2', price: '3', type: 'numeric',
                    valid_from: '10/10/2014', valid_to: '10/10/2014'},
                {mcc: '1', mnc: '2', price: '3', type: 'numeric',
                    valid_from: '10/10/2014', valid_to: '10/10/2014'},
                {mcc: '1', mnc: '2', price: '3', type: 'numeric',
                    valid_from: '10/10/2014', valid_to: '10/10/2014'},
                {mcc: '1', mnc: '2', price: '3', type: 'numeric',
                    valid_from: '10/10/2014', valid_to: '10/10/2014'}
            ]
        });
    }

    ngOnInit() {
        if (!PricesGrid.visible) {
            Ext.define('Prices', {
                extend: 'Ext.data.Model',
                fields: [
                    {name: 'mcc', type: 'number'},
                    {name: 'mnc', type: 'number'},
                    {name: 'price', type: 'number'},
                    {name: 'type', type: 'string'},
                    {name: 'valid_from', type: 'date', dateFormat: 'n/j/Y'},
                    {name: 'valid_to', type: 'date', dateFormat: 'n/j/Y'}
                ]
            });
        }

        PricesGrid.priceStore = this.mainStore();

        let enumType = Ext.create('Ext.data.Store', {
            fields: ['abbr', 'name'],
            data: [
                {'abbr': 'numeric', 'name': 'numeric'},
                {'abbr': 'alphanumeric', 'name': 'alphanumeric'},
                {'abbr': 'dynamic', 'name': 'dynamic'}
            ]
        });

        let rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToMoveEditor: 1,
            autoCancel: false
        });

        if (LocalStorage.getLocalStorage()) {
            let grid = Ext.create('Ext.grid.Panel', {
                renderTo: this.element.nativeElement,
                store: PricesGrid.priceStore,
                height: 476,
                title: 'Gateway',
                style: {
                    borderRadius: '3px'
                },
                columns: [
                    {
                        text: 'MCC',
                        dataIndex: 'mcc',
                        flex: 1,
                        editor: {
                            allowBlank: false
                        }
                    },
                    {
                        text: 'MNC',
                        dataIndex: 'mnc',
                        flex: 1,
                        editor: {
                            allowBlank: false
                        }
                    },
                    {
                        text: 'Price',
                        flex: 1,
                        dataIndex: 'price',
                        editor: {
                            allowBlank: false
                        }
                    },
                    {
                        dataIndex: 'type',
                        xtype: 'gridcolumn',
                        text: 'Type',
                        flex: 1,
                        editor: {
                            xtype: 'combobox',
                            displayField: 'name',
                            valueField: 'abbr',
                            queryMode: 'remote',
                            store: enumType
                        }
                    },
                    {
                        xtype: 'datecolumn',
                        header: 'Valid from',
                        dataIndex: 'valid_from',
                        width: 135,
                        editor: {
                            xtype: 'datefield',
                            allowBlank: false,
                            format: 'm/d/Y',
                            minValue: '01/01/2006',
                            minText: 'Cannot have a start date before the company existed!',
                            maxValue: Ext.Date.format(new Date(), 'm/d/Y')
                        }
                    },
                    {
                        xtype: 'datecolumn',
                        header: 'Valid to',
                        dataIndex: 'valid_to',
                        width: 135,
                        editor: {
                            xtype: 'datefield',
                            allowBlank: false,
                            format: 'm/d/Y',
                            minValue: '01/01/2006',
                            minText: 'Cannot have a start date before the company existed!',
                            maxValue: Ext.Date.format(new Date(), 'm/d/Y')
                        }
                    },
                ],
                tbar: [{
                    itemId: 'add',
                    text: 'Add',
                    handler: () => {
                        rowEditing.cancelEdit();

                        // Create a model instance
                        //noinspection TypeScriptUnresolvedVariable
                        let r = Ext.create('Prices', {
                            mcc: '1',
                            mnc: '2',
                            price: '500',
                            type: 'numeric',
                            valid_from: '10/10/2014',
                            valid_to: '10/10/2014'
                        });

                        PricesGrid.priceStore.insert(0, r);
                        rowEditing.startEdit(0, 0);
                    }
                }, {
                    itemId: 'remove',
                    text: 'Remove',
                    handler: () => {
                        let sm = grid.getSelectionModel();
                        rowEditing.cancelEdit();
                        PricesGrid.priceStore.remove(sm.getSelection());
                        if (PricesGrid.priceStore.getCount() > 0) {
                            sm.select(0);
                        }
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
                store: PricesGrid.priceStore,
                height: 476,
                title: 'Gateway',
                style: {
                    borderRadius: '3px'
                },
                columns: [
                    {
                        text: 'MCC',
                        dataIndex: 'mcc',
                        flex: 0.5,
                        editor: {
                            allowBlank: false
                        }
                    },
                    {
                        text: 'MNC',
                        dataIndex: 'mnc',
                        flex: 0.5,
                        editor: {
                            allowBlank: false
                        }
                    },
                    {
                        text: 'Price',
                        flex: 0.5,
                        dataIndex: 'price',
                        editor: {
                            allowBlank: false
                        }
                    },
                    {
                        dataIndex: 'type',
                        xtype: 'gridcolumn',
                        text: 'Type',
                        flex: 0.5,
                        editor: {
                            xtype: 'combobox',
                            displayField: 'name',
                            valueField: 'abbr',
                            queryMode: 'remote',
                            store: enumType
                        }
                    },
                    {
                        xtype: 'datecolumn',
                        header: 'Valid from',
                        flex: 0.5,
                        dataIndex: 'valid_from',
                        width: 135,
                        editor: {
                            xtype: 'datefield',
                            allowBlank: false,
                            format: 'm/d/Y',
                            minValue: '01/01/2006',
                            minText: 'Cannot have a start date before the company existed!',
                            maxValue: Ext.Date.format(new Date(), 'm/d/Y')
                        }
                    },
                    {
                        xtype: 'datecolumn',
                        header: 'Valid to',
                        flex: 4,
                        dataIndex: 'valid_to',
                        width: 135,
                        editor: {
                            xtype: 'datefield',
                            allowBlank: false,
                            format: 'm/d/Y',
                            minValue: '01/01/2006',
                            minText: 'Cannot have a start date before the company existed!',
                            maxValue: Ext.Date.format(new Date(), 'm/d/Y')
                        }
                    },
                ],
            });
        }
        PricesGrid.visible = true;
    }
}
