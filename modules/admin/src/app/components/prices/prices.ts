import {Component} from 'angular2/core';

@Component({
    selector: 'prices',
    templateUrl: 'app/components/prices/prices.html',
    styleUrls: ['app/components/prices/prices.css'],
    providers: [],
    directives: [],
    pipes: []
})
export class Prices {
    private static visible = false;
    private static grid: any;

    constructor() {}

    ngOnInit() {
        if (!Prices.visible) {
            Ext.define('User', {
                extend: 'Ext.data.Model',
                fields: [
                    {name: 'mcc',   type: 'number'},
                    {name: 'mnc',   type: 'number'},
                    {name: 'price', type: 'number'},
                    {name: 'type',  type: 'string'},
                    {name: 'valid_from',  type: 'date', dateFormat: 'n/j/Y'},
                    {name: 'valid_to',  type: 'date', dateFormat: 'n/j/Y'}
                ]
            });

            var states = Ext.create('Ext.data.Store', {
                fields: ['abbr', 'name'],
                data : [
                    {"abbr":"numeric", "name":"numeric"},
                    {"abbr":"alphanumeric", "name":"alphanumeric"},
                    {"abbr":"dynamic", "name":"dynamic"}
                ]
            });

            var userStore = Ext.create('Ext.data.Store', {
                model: 'User',
                data: [
                    { mcc: '1', mnc: '2', price: '3', type: 'numeric', valid_from: '10/10/2014', valid_to: '10/10/2014' }
                ]
            });

            var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
                clicksToMoveEditor: 1,
                autoCancel: false
            });

            Prices.grid = (Ext.create('Ext.grid.Panel', {
                renderTo: document.body,
                store: userStore,
                width: 1000,
                height: 500,
                title: 'Gateway',
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
                            store: states
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
                    text: 'Add',
                    iconCls: 'employee-add',
                    handler : function() {
                        rowEditing.cancelEdit();

                        // Create a model instance
                        var r = Ext.create('User', {
                            mcc: '1',
                            mnc: '2',
                            price: '500',
                            type: 'numeric',
                            valid_from: '10/10/2014',
                            valid_to: '10/10/2014'
                        });

                        userStore.insert(0, r);
                        rowEditing.startEdit(0, 0);
                    }
                }, {
                    itemId: 'removeEmployee',
                    text: 'Remove',
                    iconCls: 'employee-remove',
                    handler: function() {
                        var sm = Prices.grid.getSelectionModel();
                        rowEditing.cancelEdit();
                        userStore.remove(sm.getSelection());
                        if (userStore.getCount() > 0) {
                            sm.select(0);
                        }
                    },
                    disabled: true
                }],
                plugins: [rowEditing],
                listeners: {
                    'selectionchange': function(view, records) {
                        Prices.grid.down('#removeEmployee').setDisabled(!records.length);
                    }
                }
            })).show();
        } else {
            Prices.grid.show();
        }
        Prices.visible = true;
    }

    ngOnDestroy() {
        Prices.grid.hide();
    }

}