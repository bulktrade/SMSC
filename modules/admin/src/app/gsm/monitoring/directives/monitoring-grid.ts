import {Directive, ElementRef} from '@angular/core';

declare var Ext: any;

@Directive({
    selector: '[monitoring-grid]'
})
export class MonitoringGrid {
    private static visible = false;
    private static priceStore: any;


    constructor(private element: ElementRef) {}

    mainStore() {
        return Ext.create('Ext.data.Store', {
            model: 'Monitoring',
            data: [
                {column1: 'test record', column2: 'test record'},
            ]
        });
    }

    ngOnInit() {
        if (!MonitoringGrid.visible) {
            Ext.define('Monitoring', {
                extend: 'Ext.data.Model',
                fields: [
                    {name: 'column1', type: 'string'},
                    {name: 'column2', type: 'string'},
                ]
            });
        }

        MonitoringGrid.priceStore = this.mainStore();

        let rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToMoveEditor: 1,
            autoCancel: false
        });

        let grid = Ext.create('Ext.grid.Panel', {
            renderTo: this.element.nativeElement,
            store: MonitoringGrid.priceStore,
            height: 476,
            title: 'Monitoring',
            style: {
                borderRadius: '3px'
            },
            columns: [
                {
                    text: 'column1',
                    dataIndex: 'column1',
                    flex: 1,
                    editor: {
                        allowBlank: false
                    }
                },
                {
                    text: 'column2',
                    dataIndex: 'column2',
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
                    //noinspection TypeScriptUnresolvedVariable
                    let r = Ext.create('Monitoring', {
                        column1: 'test',
                        column2: 'test',
                    });

                    MonitoringGrid.priceStore.insert(0, r);
                    rowEditing.startEdit(0, 0);
                }
            }, {
                itemId: 'remove',
                text: 'Remove',
                handler: () => {
                    let sm = grid.getSelectionModel();
                    rowEditing.cancelEdit();
                    MonitoringGrid.priceStore.remove(sm.getSelection());
                    if (MonitoringGrid.priceStore.getCount() > 0) {
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

        MonitoringGrid.visible = true;
    }
}
