import {Directive, ElementRef} from 'angular2/core';
import {Cookie} from '../../login/cookie';

@Directive({
    selector: '[routing-grid]'
})
export class RoutingGrid {
    private static visible = false;
    private static routingStore: any;


    constructor(private element: ElementRef) {}

    mainStore() {
        return Ext.create('Ext.data.Store', {
            model: 'Routing',
            data: [
                {carrier: 'temp', type: 'http'},
            ]
        });
    }

    ngOnInit() {
        if (!RoutingGrid.visible) {
            Ext.define('Routing', {
                extend: 'Ext.data.Model',
                fields: [
                    {name: 'carrier', type: 'string'},
                    {name: 'type', type: 'string'}
                ]
            });
        }

        RoutingGrid.routingStore = this.mainStore();

        let enumType = Ext.create('Ext.data.Store', {
            fields: ['abbr', 'name'],
            data: [
                {'abbr': 'smpp', 'name': 'smpp'},
                {'abbr': 'http', 'name': 'http'}
            ]
        });

        let rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToMoveEditor: 1,
            autoCancel: false
        });

        if (Cookie.getCookie()) {
            let grid = Ext.create('Ext.grid.Panel', {
                renderTo: this.element.nativeElement,
                store: RoutingGrid.routingStore,
                height: 476,
                title: 'Routing',
                columns: [
                    {
                        text: 'Carrier',
                        dataIndex: 'carrier',
                        flex: 0.5,
                        editor: {
                            allowBlank: false
                        }
                    },
                    {
                        text: 'Type',
                        dataIndex: 'type',
                        xtype: 'gridcolumn',
                        flex: 4,
                        editor: {
                            xtype: 'combobox',
                            displayField: 'name',
                            valueField: 'abbr',
                            queryMode: 'remote',
                            store: enumType
                        }
                    }
                ],
                tbar: [{
                    itemId: 'add',
                    text: 'Add',
                    handler: () => {
                        rowEditing.cancelEdit();

                        // Create a model instance
                        let r = Ext.create('Routing', {
                            carrier: 'temp',
                            type: 'http',
                        });

                        RoutingGrid.routingStore.insert(0, r);
                        rowEditing.startEdit(0, 0);
                    }
                }, {
                    itemId: 'remove',
                    text: 'Remove',
                    handler: () => {
                        let sm = grid.getSelectionModel();
                        rowEditing.cancelEdit();
                        RoutingGrid.routingStore.remove(sm.getSelection());
                        if (RoutingGrid.routingStore.getCount() > 0) {
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
                store: RoutingGrid.routingStore,
                height: 476,
                title: 'Routing',
                columns: [
                    {
                        text: 'Carrier',
                        dataIndex: 'carrier',
                        flex: 0.5,
                        editor: {
                            allowBlank: false
                        }
                    },
                    {
                        text: 'Type',
                        dataIndex: 'type',
                        xtype: 'gridcolumn',
                        flex: 4,
                        editor: {
                            xtype: 'combobox',
                            displayField: 'name',
                            valueField: 'abbr',
                            queryMode: 'remote',
                            store: enumType
                        }
                    }
                ]
            });
        }
        RoutingGrid.visible = true;
    }
}
