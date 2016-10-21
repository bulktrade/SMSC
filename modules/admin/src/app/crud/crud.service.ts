import { ODatabaseService } from '../orientdb/orientdb.service';
import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Response } from '@angular/http';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { GridOptions } from 'ag-grid';
import { NotificationService } from '../services/notificationService';
import { LoadingGridService } from '../services/loading/loadingGrid.service';
import { ColumnModel } from './model/crud.column';
import { INPUT_TYPES } from './dynamicForm/model/formInputTypes';
import { ColumnDefsModel } from './model/columnDefs';
import { Operation } from '../orientdb/model/operation';
import { BatchType } from '../orientdb/model/batchType';
import { Observable, Observer } from 'rxjs';
import { GridPropertyModel } from './model/gridProperty';
import { FormPropertyModel } from './model/formProperty';
import { CrudLevel } from './model/crudLevel';
import { Location } from '@angular/common';
import { LinksetProperty } from './model/linksetProperty';
import { GridService } from '../services/grid.service';

const squel = require('squel');
let cubeGridHtml = require('../common/spinner/cubeGrid/cubeGrid.component.html');

@Injectable()
export class CrudService {
    public crudLevel: Array<CrudLevel> = [];
    public isHint: Array<boolean> = [];
    public focusedRow;
    public clickOnDeleteBtn: boolean;
    public clickOnEditBtn: boolean;
    public multipleSelectValid = false;
    public querySelectors = null;
    public rowSelectionLinkset = null;
    public linkedClass: string = null;
    public initGridData: Promise<any> = Promise.resolve();
    public crud: Promise<any> = Promise.resolve();
    public parentPath = null;
    public className = null;
    public dataNotFound = false;
    public successExecute = false;
    public titleColumns = {};
    public model = {};
    public gridOptions: GridOptions = {
        rowSelection: 'multiple',
        rowHeight: 30,
        columnDefs: [],
        rowData: [],
        enableSorting: true
    };

    private limitCrudLevel: number = 3;

    constructor(public databaseService: ODatabaseService,
                public router: Router,
                public route: ActivatedRoute,
                public translate: TranslateService,
                public serviceNotifications: NotificationService,
                public loadingService: LoadingGridService,
                public gridService: GridService) {
    }

    onFilterChanged(value, gridOptions) {
        gridOptions.api.setQuickFilter(value);
    }

    cellValueChanged(value) {
        let operations: Array<Operation> = [
            {
                type: BatchType.UPDATE,
                record: value.data
            }
        ];

        this.databaseService.batch(operations)
            .subscribe(res => {
                this.setCellStyleWhenDataIncorrect(this.gridOptions,
                    { backgroundColor: 'none' }, value);
                this.serviceNotifications.createNotification('success',
                    'message.createSuccessful', 'orientdb.successCreate');

                this.gridService.selectLinksetProperties(this.gridOptions.columnDefs,
                    [this.focusedRow.data])
                    .then(() => {
                        this.gridOptions.api.setRowData(this.gridOptions.rowData);
                    });

                return Promise.resolve(res);
            }, err => {
                this.setCellStyleWhenDataIncorrect(this.gridOptions,
                    { backgroundColor: '#ffccba' }, value);
                this.serviceNotifications.incorrectData(err.json().errors[0].content);
                return Promise.reject(err);
            });
    }

    /**
     * Sets the cell style if the entered incorrect data.
     *
     * @param gridOptions
     * @param style
     * @param changeCell
     */
    setCellStyleWhenDataIncorrect(gridOptions: GridOptions, style: Object, changeCell) {
        gridOptions.columnDefs.filter(i => {
            if (i.property === changeCell.colDef.property) {
                i.cellStyle = (params) => {
                    if (params.data['@rid'] === changeCell.data['@rid']) {
                        return style;
                    }
                };
            }
        });
        gridOptions.api.setColumnDefs(this.gridOptions.columnDefs);
    }

    /**
     * Creates a new record in the database.
     *
     * @example
     * let record = {
     *  name: 'test',
     *  foo: 'bar'
     * };
     *
     * let className = 'CrudComponent';
     *
     * createRecord(record, className);
     *
     * @param record
     * @param className
     * @returns {Promise<T>}
     */
    createRecord(record, className): Promise<Response> {
        record['@class'] = className;
        this.loadingService.start();

        let operations: Array<Operation> = [
            {
                type: BatchType.CREATE,
                record: record
            }
        ];

        return new Promise((resolve, reject) => {
            this.databaseService.batch(operations)
                .subscribe((res: Response) => {
                    let result = res.json().result[0];

                    this.gridService.addLinkToCreatedRecord(result, 'customer', ['contacts']);
                    this.loadingService.stop();
                    this.serviceNotifications.createNotification('success',
                        'message.createSuccessful', 'orientdb.successCreate');
                    resolve(res);
                }, (error) => {
                    this.loadingService.stop();
                    this.serviceNotifications.createNotificationOnResponse(error);
                    reject(error);
                });
        });
    }

    /**
     * Updates a record in the database.
     *
     * @example
     * let record = {
     *  "@rid" : "#14:122",
     *  "name" : "Luca",
     *  "vehicle" : "Car"
     * };
     *
     * updateRecord(record);
     *
     * @param record
     * @returns {Promise<T>}
     */
    updateRecord(record): Promise<Response> {
        this.loadingService.start();

        let operations: Array<Operation> = [
            {
                type: BatchType.UPDATE,
                record: record
            }
        ];

        return new Promise((resolve, reject) => {
            this.databaseService.batch(operations)
                .subscribe((res) => {
                    this.loadingService.stop();
                    this.serviceNotifications.createNotification('success',
                        'message.updateSuccessful', 'orientdb.successUpdate');
                    resolve(res);
                }, (error) => {
                    this.serviceNotifications.createNotificationOnResponse(error);
                    this.loadingService.stop();
                    reject(error);
                });
        });
    }

    /**
     * Removes one or more records from the database.
     *
     * @example
     * let rids: Array<string> = ['#25:0', '#25:1'];
     *
     * updateRecord(rids);
     *
     * @param rid
     * @returns {any}
     */
    deleteRecord(rid: Array<string>): Observable<Response> {
        let record: any = {};
        record['@rid'] = rid;
        this.loadingService.start();

        let operations: Array<Operation> = [];

        rid.forEach(i => {
            let operation: Operation = {
                type: BatchType.DELETE,
                record: {
                    '@rid': i
                }
            };

            operations.push(operation);
        });

        return Observable.create((observer: Observer<Response>) => {
            this.databaseService.batch(operations)
                .subscribe((res) => {
                    this.loadingService.stop();
                    this.serviceNotifications.createNotification('success',
                        'message.deleteSuccessful', 'orientdb.successDelete');
                    observer.next(res);
                    observer.complete();
                }, (error) => {
                    this.serviceNotifications.createNotificationOnResponse(error);
                    this.loadingService.stop();
                });
        });
    }

    /**
     * Called when select the row and sets the style to checkbox.
     *
     * @param gridOptions
     */
    rowSelected(gridOptions) {
        if (gridOptions.api.getSelectedRows().length === gridOptions.rowData.length) {
            this.changeCheckboxState('allSelected', gridOptions);
        } else if (!gridOptions.api.getSelectedRows().length) {
            this.changeCheckboxState('notSelected', gridOptions);
        } else {
            this.changeCheckboxState('notAllSelected', gridOptions);
        }
    }

    /**
     * Returns a result set of records from table.
     *
     * @param className
     * @returns {any}
     */
    getStore(className): Observable<Response> {
        return Observable.create((observer: Observer<Response>) => {
            this.databaseService.query('select from ' + className)
                .subscribe((res: Response) => {
                    observer.next(res);
                    observer.complete();
                }, (err: Response) => {
                    observer.error(err);
                    observer.complete();
                    this.serviceNotifications.createNotificationOnResponse(err);
                });
        });
    }

    /**
     * Replaces overlay loading template.
     *
     * @returns {any|T}
     */
    overlayLoadingTemplate() {
        return cubeGridHtml;
    }

    /**
     * The method adds checkbox selection to the columnDefs property.
     *
     * @param columnDefs
     * @param gridOptions
     */
    addColumnCheckbox(columnDefs, gridOptions) {
        columnDefs.grid.unshift({
            headerName: ' ',
            field: 'checkboxSel',
            width: 45,
            hideInForm: true,
            checkboxSelection: true,
            headerCellTemplate: () => {
                let that = this;
                let eCell = document.createElement('span');
                eCell.innerHTML =
                    '<div colid="checkboxSel" tabindex="-1" class="ag-cell-no-focus ag-cell ' +
                    'ag-cell-not-inline-editing" style="left: 0px; width: 45px;"><span class="' +
                    'ag-cell-wrapper">' +
                    '   <span class="ag-selection-checkbox" id="select-all">' +
                    '       <img id="all-selected" style="display: none;" src="data:image/png;' +
                    'base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAGXRFWHRTb2Z0d2FyZQ' +
                    'BBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHB' +
                    'hY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4Onht' +
                    'cG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlI' +
                    'DUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZj' +
                    'pSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXg' +
                    'tbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6' +
                    'Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvY' +
                    'mUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy' +
                    '5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDp' +
                    'FQ0VGQkU3ODM4MTFFNjExQjlCQzhERUVDNkNGMzFDMyIgeG1wTU06RG9jdW1lbnRJRD0ieG1w' +
                    'LmRpZDpBRkJCRDU1MTEyM0ExMUU2ODE4MUUyOTNBNTRGQkIxNyIgeG1wTU06SW5zdGFuY2VJR' +
                    'D0ieG1wLmlpZDpBRkJCRDU1MDEyM0ExMUU2ODE4MUUyOTNBNTRGQkIxNyIgeG1wOkNyZWF0b3' +
                    'JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJ' +
                    'vbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjIzMkM4M0M1M0MxMUU2MTFCOUJDOERFRUM2' +
                    'Q0YzMUMzIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkVDRUZCRTc4MzgxMUU2MTFCOUJDO' +
                    'ERFRUM2Q0YzMUMzIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZX' +
                    'RhPiA8P3hwYWNrZXQgZW5kPSJyIj8+riMaEQAAAL5JREFUeNqUks0JhDAQhSd7tgtLMDUIyTX' +
                    'F2IdNWIE3c0ruYg9LtgcPzvpEF8SfHR8MGR75hpcwRERmrjQXCyutDKUQAkuFu2AUpsyiJ1JK' +
                    '0UtycRgGMsbsPBFYVRVZaw/+7Zu895znOY/j+PPWT7oGp2lirTU3TbPz/4IAAGLALeic47Ztl' +
                    'x7RELHrusPAAwgoy7LlrOuay7I8TXIadYOLouC+7+XgBiP2lTbw0crFGAF9ANq1kS75G8xXgA' +
                    'EAiqu9OeWZ/voAAAAASUVORK5CYII=">' +
                    '       <img id="not-selected" style="display: inline;" src="data:image/png;' +
                    'base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAGXRFWHRTb2Z0d2FyZQ' +
                    'BBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHB' +
                    'hY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4Onht' +
                    'cG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlI' +
                    'DUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZj' +
                    'pSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXg' +
                    'tbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6' +
                    'Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvY' +
                    'mUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy' +
                    '5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDp' +
                    'FQ0VGQkU3ODM4MTFFNjExQjlCQzhERUVDNkNGMzFDMyIgeG1wTU06RG9jdW1lbnRJRD0ieG1w' +
                    'LmRpZDo2MkU1Rjk1NDExNDExMUU2ODhEQkMyRTJGOUNGODYyQyIgeG1wTU06SW5zdGFuY2VJR' +
                    'D0ieG1wLmlpZDo2MkU1Rjk1MzExNDExMUU2ODhEQkMyRTJGOUNGODYyQyIgeG1wOkNyZWF0b3' +
                    'JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJ' +
                    'vbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjI1MkM4M0M1M0MxMUU2MTFCOUJDOERFRUM2' +
                    'Q0YzMUMzIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkVDRUZCRTc4MzgxMUU2MTFCOUJDO' +
                    'ERFRUM2Q0YzMUMzIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZX' +
                    'RhPiA8P3hwYWNrZXQgZW5kPSJyIj8+t+CXswAAAFBJREFUeNrsksENwDAIA023a9YGNqlItki' +
                    'xlAFIn1VOMv5wvACAOxOZWUwsB6Gqswp36QivJNhBRHDhI0f8j9jNrCy4O2twNMobT/7QeQUY' +
                    'AFaKU1yE2OfhAAAAAElFTkSuQmCC">' +
                    '       <img id="not-all-selected" style="display: none;" src="data:image/' +
                    'png;' +
                    'base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAGXRFWHRTb2Z0d2FyZQB' +
                    'BZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY' +
                    '2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1' +
                    'ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuM' +
                    'y1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREY' +
                    'geG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjI' +
                    'j4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5' +
                    'hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL' +
                    '3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5' +
                    'jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpFQ0VGQkU3O' +
                    'DM4MTFFNjExQjlCQzhERUVDNkNGMzFDMyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpGMjU' +
                    '4MzhGQjEyM0ExMUU2QjAxM0Q2QjZFQ0IzNzM4NiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZ' +
                    'DpGMjU4MzhGQTEyM0ExMUU2QjAxM0Q2QjZFQ0IzNzM4NiIgeG1wOkNyZWF0b3JUb29sPSJBZG9' +
                    'iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppb' +
                    'nN0YW5jZUlEPSJ4bXAuaWlkOjIzMkM4M0M1M0MxMUU2MTFCOUJDOERFRUM2Q0YzMUMzIiBzdFJ' +
                    'lZjpkb2N1bWVudElEPSJ4bXAuZGlkOkVDRUZCRTc4MzgxMUU2MTFCOUJDOERFRUM2Q0YzMUMzI' +
                    'i8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQ' +
                    'gZW5kPSJyIj8+2Xml2QAAAGBJREFUeNpiYGBg8ATiZ0D8n0j8DKqH4dnhw4f/EwtAakF6GEGmA' +
                    'AEDKYCRkZGBiYFMQH+NLNjcjw2ghwMLIQWDx48Do/H5kSNHiNZw9OhREPUCRHiBNJOQyJ+A9AA' +
                    'EGACqkFldNkPUwwAAAABJRU5ErkJggg==">' +
                    '   </span>' +
                    '   <span class="ag-cell-value"></span></span>' +
                    '</div>';

                let clicked = false;

                this.querySelectors = {
                    eCalendar: eCell.querySelector('#select-all'),
                    allSelected: eCell.querySelector('#all-selected'),
                    notSelected: eCell.querySelector('#not-selected'),
                    notAllSelected: eCell.querySelector('#not-all-selected')
                };

                this.querySelectors.eCalendar.addEventListener('click', () => {
                    clicked = !clicked;

                    if (clicked) {
                        that.changeCheckboxState('allSelected', gridOptions);
                    } else {
                        that.changeCheckboxState('notSelected', gridOptions);
                    }
                });

                return eCell;
            }
        });
    }

    /**
     * Called when select the row or click on checkbox and sets the style to checkbox.
     *
     * @param isSelectCheckbox
     * @param gridOptions
     */
    changeCheckboxState(isSelectCheckbox, gridOptions) {
        switch (isSelectCheckbox) {
            case 'allSelected':
                gridOptions.api.selectAll();

                this.querySelectors.allSelected.setAttribute('style', 'display: inline;');
                this.querySelectors.notSelected.setAttribute('style', 'display: none;');
                this.querySelectors.notAllSelected.setAttribute('style', 'display: none;');
                break;

            case 'notSelected':
                gridOptions.api.deselectAll();

                this.querySelectors.allSelected.setAttribute('style', 'display: none;');
                this.querySelectors.notSelected.setAttribute('style', 'display: inline;');
                this.querySelectors.notAllSelected.setAttribute('style', 'display: none;');
                break;

            case 'notAllSelected':
                this.querySelectors.allSelected.setAttribute('style', 'display: none;');
                this.querySelectors.notSelected.setAttribute('style', 'display: none;');
                this.querySelectors.notAllSelected.setAttribute('style', 'display: inline;');
                break;

            default:
                break;
        }
    }

    /**
     * Renders the button in column.
     *
     * @example
     * let columnDefs = [
     *  { headerName: 'Employee', field: 'employee' }
     * ];
     *
     * btnRenderer(columnDefs, 'Button', 200, 'done', (event) => {
     *  // do something
     * });
     *
     * @param columnDefs
     * @param nameBtn
     * @param width
     * @param iconName
     * @param clickEvent
     */
    btnRenderer(columnDefs, nameBtn, width, iconName, clickEvent?: (event) => void) {
        columnDefs.grid.push({
            headerName: ' ',
            field: nameBtn.toLowerCase(),
            width: width,
            hideInForm: true,
            cellRenderer: () => {
                let that = this;
                let button = document.createElement('i');
                button.setAttribute('class', 'material-icons ' + nameBtn.toLowerCase() + 'Icon');
                that.translate.get(nameBtn.toUpperCase())
                    .subscribe(title => {
                        button.setAttribute('title', title);
                    });
                button.innerHTML = iconName;
                button.setAttribute('style', 'font-size: 18px; color: #009688; cursor: pointer;');
                button.addEventListener('click', (event) => {
                    if (clickEvent) {
                        clickEvent(event);
                    }
                });

                return button;
            }
        });
    }

    /**
     * Called when click on row.
     *
     * @param event
     */
    rowClicked(event) {
        this.focusedRow = event;

        if (this.clickOnDeleteBtn) {
            this.navigateToDelete(event.data['@rid']);
            this.clickOnDeleteBtn = false;
        } else if (this.clickOnEditBtn) {
            this.navigateToEdit(event.data['@rid']);
            this.clickOnEditBtn = false;
        }
    }

    /**
     * Navigate to update component and send the id parameter.
     *
     * @param id
     */
    navigateToEdit(id: number) {
        this.router.navigate([this.parentPath, 'edit', id]);
    }

    /**
     * Navigate to delete component and send the id parameter.
     *
     * @param id
     */
    navigateToDelete(id: number) {
        this.router.navigate([this.parentPath, 'delete', id]);
    }

    /**
     * Navigate to linkset component and sets next level in crud system.
     *
     * @param linsetProperty
     */
    navigateToLinkset(linksetProperty?: LinksetProperty) {
        this.nextCrudLevel(linksetProperty);
        this.router.navigate([this.parentPath, 'linkset']);
    }

    /**
     * Moves to the next level in crud system and saves the data like:
     * class name, input model (from the dynamic form) and linksetProperty.
     *
     * @param linsetProperty
     */
    nextCrudLevel(linsetProperty?: LinksetProperty) {
        let crudLevel: CrudLevel = {
            className: this.getLinkedClass(),
            inputModel: this.model,
            linksetProperty: linsetProperty
        };

        this.crudLevel.push(crudLevel);
    }

    /**
     * Moves to the previous level in crud system and removes the last level.
     *
     * @returns {CrudLevel}
     */
    previousCrudLevel(): CrudLevel {
        let previousLevel: CrudLevel = this.crudLevel.pop();

        this.setLinkedClass(previousLevel.className);
        this.setModel(previousLevel.inputModel);

        return previousLevel;
    }

    /**
     * Navigates back in the platform's history.
     *
     * @param location
     */
    backFromForm(location: Location) {
        location.back();
    }

    getSelectedRID(gridOptions) {
        let id = [];

        gridOptions.api.getSelectedRows().forEach((i) => {
            id.push(i['@rid']);
        });

        return id;
    }

    /**
     * Adds RID column.
     *
     * @param columnDefs
     */
    addRIDColumn(columnDefs) {
        columnDefs.push({
            headerName: 'RID',
            field: '@rid',
            hideInForm: true,
            width: 55
        });
    }

    /**
     * Translates the column names for grid
     *
     * @param columnDefs
     * @param name
     * @returns {Promise<TResult2|TResult1>|Promise<TResult>|Promise<U>}
     */
    translateColumnsName(columnDefs, name): Promise<any> {
        let headersName = [];

        for (let i in columnDefs) {
            if (columnDefs.hasOwnProperty(i)) {
                headersName.push(columnDefs[i][name].toUpperCase());
            }
        }

        return this.translate.get(headersName).toPromise()
            .then((columnName) => {
                return Promise.resolve(columnName);
            }, (error) => {
                this.serviceNotifications.createNotificationOnResponse(error);
                return Promise.reject(error);
            });
    }

    /**
     * Gets the column definitions with metaData for grid.
     *
     * @param className
     * @param readOnly
     * @returns {any}
     */
    getColumnDefs(className, readOnly): Observable<ColumnDefsModel> {
        let columnDefs: ColumnDefsModel = {
            grid: [],
            form: []
        };

        this.addColumnCheckbox(columnDefs, this.gridOptions);
        this.addRIDColumn(columnDefs.grid);

        if (readOnly) {
            this.btnRenderer(columnDefs, 'Edit', 30, 'mode_edit', (clickEvent) => {
                this.clickOnEditBtn = true;
            });
            this.btnRenderer(columnDefs, 'Delete', 30, 'delete', (clickEvent) => {
                this.clickOnDeleteBtn = true;
            });
        }

        return Observable.create((observer: Observer<ColumnModel>) => {
            this.databaseService.getInfoClass(className)
                .subscribe((res: Response) => {
                    let properties = res.json().properties;

                    this.setPropertiesMetaGridData(properties, className)
                        .subscribe((gridProperties: Array<GridPropertyModel>) => {
                            this.setPropertiesMetaFormData(properties, className)
                                .subscribe((formProperties: Array<FormPropertyModel>) => {
                                    columnDefs.form = columnDefs.form.concat(formProperties);
                                    columnDefs.grid = columnDefs.grid.concat(gridProperties);

                                    observer.next(columnDefs);
                                    observer.complete();
                                }, (err: Response) => {
                                    observer.error(err);
                                    observer.complete();
                                });
                        }, (err: Response) => {
                            observer.error(err);
                            observer.complete();
                        });
                }, (err: Response) => {
                    observer.error(err);
                    observer.complete();
                });
        });
    }

    /**
     * Sets the additional metaData to formProperties from metaData classes.
     * Such as: editable, visible, readOnly, etc...
     *
     * @param properties
     * @param className
     * @returns {any}
     */
    setPropertiesMetaFormData(properties, className): Observable<ColumnModel> {
        let queryCrudMetaFormData = squel.select()
            .from('CrudMetaFormData')
            .where('CrudClassMetaData.class = ?', className);

        return Observable.create((observer: Observer<ColumnModel>) => {
            this.databaseService.query(queryCrudMetaFormData.toString())
                .subscribe((res: Response) => {
                    let isExistForm: boolean;
                    let columnsForm: Array<FormPropertyModel> = [];
                    let result: Array<FormPropertyModel>;

                    try {
                        isExistForm = res.json()['result'].length > 0 ? true : false;
                        result = isExistForm ? res.json()['result'] : properties;
                    } catch (ex) {
                        observer.error(ex);
                    }

                    this.translateColumnsName(result, isExistForm ? 'property' : 'name')
                        .then((columnsName) => {
                            for (let i in result) {
                                if (result.hasOwnProperty(i)) {
                                    let column: FormPropertyModel = result[i];

                                    if (isExistForm) {
                                        column['headerName'] =
                                            columnsName[result[i]['property'].toUpperCase()];

                                        this.getPropertyMetadata(column, false, properties);
                                        columnsForm.push(column);
                                    } else {
                                        column['headerName'] =
                                            columnsName[result[i]['name'].toUpperCase()];
                                        column['property'] = result[i]['name'];
                                        column['editable'] = !result[i]['readonly'];
                                        column['visible'] = true;

                                        columnsForm.push(column);
                                    }
                                }
                            }

                            if (isExistForm) {
                                columnsForm.sort(this.compare);
                            }

                            observer.next(columnsForm);
                            observer.complete();
                        });
                }, (err) => {
                    observer.error(err);
                    observer.complete();
                });
        });
    }

    /**
     * Sets the additional metaData to gridProperties from metaData classes.
     * Such as: editable, visible, width, etc...
     *
     * @param properties
     * @param className
     * @returns {any}
     */
    setPropertiesMetaGridData(properties, className): Observable<ColumnModel> {
        let queryCrudMetaGridData = squel.select()
            .from('CrudMetaGridData')
            .where('CrudClassMetaData.class = ?', className);

        return Observable.create((observer: Observer<ColumnModel>) => {
            this.databaseService.query(queryCrudMetaGridData.toString())
                .subscribe((res: Response) => {
                    let isExistColumn: boolean;
                    let columnsGrid: Array<GridPropertyModel> = [];
                    let result: Array<GridPropertyModel>;

                    try {
                        isExistColumn = res.json()['result'].length > 0 ? true : false;
                        result = isExistColumn ? res.json()['result'] : properties;
                    } catch (ex) {
                        observer.error(ex);
                    }

                    return this.translateColumnsName(result, isExistColumn ? 'property' : 'name')
                        .then((columnsName) => {
                            for (let i in result) {
                                if (result.hasOwnProperty(i)) {
                                    let column: GridPropertyModel = result[i];

                                    if (isExistColumn) {
                                        column['headerName'] =
                                            columnsName[result[i]['property'].toUpperCase()];
                                        column['field'] = result[i]['property'];
                                        column['hide'] = !result[i]['visible'];
                                        column['width'] = result[i]['columnWidth'];
                                        column['sort'] = 'asc';

                                        this.getPropertyMetadata(column, true, properties);
                                        columnsGrid.push(column);
                                    } else {
                                        column['headerName'] =
                                            columnsName[result[i]['name'].toUpperCase()];
                                        column['field'] = result[i]['name'];
                                        column['sort'] = 'asc';
                                        columnsGrid.push(column);
                                    }
                                }
                            }

                            if (isExistColumn) {
                                columnsGrid.sort(this.compare);
                            }

                            observer.next(columnsGrid);
                            observer.complete();
                        });
                }, (error) => {
                    observer.error(error);
                    observer.complete();
                });
        });
    }

    /**
     * Gets the metadata for the property. Such as: linkedClass, mandatory, etc.
     *
     * @param column
     * @param isGrid
     * @param properties
     */
    getPropertyMetadata(column, isGrid: boolean, properties) {
        let metadataGridProperty = ['linkedClass', 'type', 'custom'];
        let metadataFormProperty = ['mandatory', 'type', 'linkedClass', 'custom'];
        let property;

        if (isGrid) {
            property = properties.filter((obj) => {
                return obj.name === column.field;
            })[0];

            if (property) {
                metadataGridProperty.forEach((i) => {
                    if (property.hasOwnProperty(i)) {
                        column[i] = property[i];
                    }
                });
            }
        } else {
            property = properties.filter((obj) => {
                return obj.name === column.property;
            })[0];

            if (property) {
                metadataFormProperty.forEach((i) => {
                    if (property.hasOwnProperty(i)) {
                        column[i] = property[i];
                    }
                });
            }
        }
    }

    /**
     * Compares the order of the properties.
     *
     * @param a
     * @param b
     * @returns {number}
     */
    compare(a, b) {
        if (a.order < b.order)
            return -1;
        if (a.order > b.order)
            return 1;
        return 0;
    }

    /**
     * Hides all messages.
     */
    hideAllMessageBoxes() {
        this.dataNotFound = false;
        this.successExecute = false;
    }

    /**
     * Gets the select options from property.
     *
     * @param columnDefsItem
     * @returns {any}
     */
    getSelectOptions(columnDefsItem) {
        if (typeof columnDefsItem !== 'undefined') {
            if (columnDefsItem.hasOwnProperty('custom')) {
                return columnDefsItem.custom.type.split(',');
            }
        }

        return [];
    }

    /**
     * Checks the limit of crud levels.
     *
     * @returns {boolean}
     */
    isLimitCrudLevel() {
        if (this.crudLevel.length >= this.limitCrudLevel - 1) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Renders input field depending on property type.
     *
     * @param type
     * @returns {string}
     */
    typeForInput(type) {
        let types = INPUT_TYPES;
        let result: string = null;

        result = types.find((i) => {
            if (i === type) {
                return true;
            }

            return false;
        });

        result = this.inputType(result);

        return result;
    }

    /**
     * Sets the type for input field depending on property type.
     *
     * @param type
     * @returns {string}
     */
    inputType(type) {
        let result: string;

        switch (type) {
            case 'STRING':
                result = 'text';
                break;
            case 'DATE':
                result = 'date';
                break;
            case 'DATETIME':
                result = 'datetime';
                break;
            case 'DOUBLE':
            case 'INTEGER':
            case 'FLOAT':
            case 'BYTE':
            case 'DECIMAL':
                result = 'number';
                break;
            default:
                result = null;
                break;
        }

        return result;
    }

    /**
     * Checks whether a multiple select is filled
     *
     * @param event
     */
    isRequired(event) {
        if (event) {
            this.multipleSelectValid = true;
            return;
        }
    }

    /**
     * Sets path from root component.
     *
     * @param parent
     */
    setParentPath(parent: Array<ActivatedRouteSnapshot>) {
        let pathFromRoot: string = '';
        let urlSuffix: string = '/';

        for (let i in parent) {
            if (parent[i].routeConfig !== null && parent[i].routeConfig.path !== '') {
                pathFromRoot += parent[i].routeConfig.path + urlSuffix;
            }
        }

        this.parentPath = pathFromRoot;
    }

    /**
     * Sets the value in the model from property with EMBEDDEDLIST type.
     *
     * @param propertyName
     * @param event
     * @returns {any}
     */
    setEmbeddedList(propertyName: string, event?: string) {
        if (!this.model[propertyName]) {
            this.model[propertyName] = [];
        } else if (typeof event !== 'undefined') {
            this.model[propertyName] = [event];
        }

        return this.model[propertyName];
    }

    resetCrudLevels() {
        this.crudLevel = [];
    }

    setClassName(className) {
        this.className = className;
    }

    getClassName() {
        return this.className;
    }

    setLinkedClass(linkedClass) {
        this.linkedClass = linkedClass;
    }

    getLinkedClass() {
        return this.linkedClass;
    }

    setModel(model) {
        this.model = model;
    }
}
