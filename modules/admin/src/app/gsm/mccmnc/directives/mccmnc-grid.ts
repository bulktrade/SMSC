import {Directive, ElementRef} from '@angular/core';

declare var Ext: any;

@Directive({
    selector: '[mccmnc-grid]'
})
export class MCCMNCGrid {
    private static visible = false;
    private static mccStore: any;
    private static mncStore: any;

    private gridMCC: any;
    private gridMNC: any;

    constructor(private element: ElementRef) {}

    MCCStore() {
        return Ext.create('Ext.data.Store', {
            model: 'MCC',
            data: [
                {mcc: 'temp', code: '324235234', country: 'temp'},
                {mcc: 'temp', code: '324235234', country: 'temp'},
                {mcc: 'temp', code: '324235234', country: 'temp'},
            ]
        });
    }

    MNCStore() {
        return Ext.create('Ext.data.Store', {
            model: 'MNC',
            data: [
                {mnc: 'temp', mcc: 'temp', carrier: 'temp'},
                {mnc: 'temp', mcc: 'temp', carrier: 'temp'},
                {mnc: 'temp', mcc: 'temp', carrier: 'temp'},
            ]
        });
    }

    ngOnInit() {

        if (!MCCMNCGrid.visible) {
            Ext.define('MCC', {
                extend: 'Ext.data.Model',
                fields: [
                    {name: 'mcc', type: 'string'},
                    {name: 'code', type: 'number'},
                    {name: 'country', type: 'string'},
                ]
            });

            Ext.define('MNC', {
                extend: 'Ext.data.Model',
                fields: [
                    {name: 'mnc', type: 'string'},
                    {name: 'mcc', type: 'string'},
                    {name: 'carrier', type: 'string'},
                ]
            });
        }

        MCCMNCGrid.mccStore = this.MCCStore();
        MCCMNCGrid.mncStore = this.MNCStore();

        let rowEditingMCC = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToMoveEditor: 1,
            autoCancel: false
        });

        let rowEditingMNC = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToMoveEditor: 1,
            autoCancel: false
        });

        this.gridMCC = Ext.create('Ext.grid.Panel', {
            store: MCCMNCGrid.mccStore,
            columns: [
                {
                    text: 'MCC',
                    flex: 0.5,
                    dataIndex: 'mcc',
                    editor: {
                        allowBlank: false
                    }
                },
                {
                    text: 'Code',
                    flex: 0.5,
                    dataIndex: 'code',
                    editor: {
                        allowBlank: false
                    }
                },
                {
                    text: 'Country',
                    flex: 4,
                    dataIndex: 'country',
                    editor: {
                        allowBlank: false
                    }
                }
            ],
            title: 'MCC',
            tbar: [{
                itemId: 'add',
                text: 'Add',
                handler: () => {
                    rowEditingMCC.cancelEdit();

                    // Create a model instance
                    let r = Ext.create('MCC', {
                        mcc: 'temp',
                        code: '324235234',
                        country: 'temp'
                    });

                    MCCMNCGrid.mccStore.insert(0, r);
                    rowEditingMCC.startEdit(0, 0);
                }
            }, {
                itemId: 'remove',
                text: 'Remove',
                handler: () => {
                    let sm = this.gridMCC.getSelectionModel();
                    rowEditingMCC.cancelEdit();
                    MCCMNCGrid.mccStore.remove(sm.getSelection());
                    if (MCCMNCGrid.mccStore.getCount() > 0) {
                        sm.select(0);
                    }
                },
                disabled: true
            }],
            plugins: [rowEditingMCC],
            listeners: {
                'selectionchange': (view, records) => {
                    this.gridMCC.down('#remove').setDisabled(!records.length);
                }
            }
        });

        this.gridMNC = Ext.create('Ext.grid.Panel', {
            store: MCCMNCGrid.mncStore,
            columns: [
                {
                    text: 'MNC',
                    flex: 0.5,
                    dataIndex: 'mnc',
                    editor: {
                        allowBlank: false
                    }
                },
                {
                    text: 'MCC',
                    flex: 0.5,
                    dataIndex: 'mcc',
                    editor: {
                        allowBlank: false
                    }
                },
                {
                    text: 'Carrier',
                    flex: 4,
                    dataIndex: 'carrier',
                    editor: {
                        allowBlank: false
                    }
                }
            ],
            title: 'MNC',
            tbar: [{
                itemId: 'add',
                text: 'Add',
                handler: () => {
                    rowEditingMNC.cancelEdit();

                    // Create a model instance
                    let r = Ext.create('MNC', {
                        mnc: 'temp',
                        mcc: 'temp',
                        carrier: 'temp'
                    });

                    MCCMNCGrid.mncStore.insert(0, r);
                    rowEditingMNC.startEdit(0, 0);
                }
            }, {
                itemId: 'remove',
                text: 'Remove',
                handler: () => {
                    let sm = this.gridMNC.getSelectionModel();
                    rowEditingMNC.cancelEdit();
                    MCCMNCGrid.mncStore.remove(sm.getSelection());
                    if (MCCMNCGrid.mncStore.getCount() > 0) {
                        sm.select(0);
                    }
                },
                disabled: true
            }],
            plugins: [rowEditingMNC],
            listeners: {
                'selectionchange': (view, records) => {
                    this.gridMNC.down('#remove').setDisabled(!records.length);
                }
            }
        });

        Ext.create('Ext.TabPanel', {
            height: 476,
            renderTo: this.element.nativeElement,
            style: {
                borderRadius: '3px'
            },
            items: [
                this.gridMCC, this.gridMNC
            ]
        });

        MCCMNCGrid.visible = true;
    }​
}
