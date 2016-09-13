import { ODatabaseService } from "../orientdb/orientdb.service";
import { Injectable } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Response } from "@angular/http";
import { TranslateService } from "ng2-translate/ng2-translate";
import { GridOptions } from "ag-grid";
import { NotificationService } from "../services/notificationService";
import { LoadingGridService } from "../services/loading/loadingGrid.service";
import { ColumnModel } from "./model/crud.column.model";
import { INPUT_TYPES } from "./common/form/form.inputTypes";
import { ColumnDefsModel } from "./model/columnDefs.model";

const squel = require('squel');

let cubeGridHtml = require('../common/spinner/cubeGrid/cubeGrid.html');

@Injectable()
export class CrudService {
    private _currentCrudLevel: number = 1;
    private limitCrudLevel: number = 3;
    public hintMessage: string;
    public isHint: Array<boolean> = [];
    public modifiedRecord: any = {};
    public focusedRow: any;
    public multipleSelectValid = false;
    public querySelectors = null;
    public embeddedList = null;
    public rowSelectionLinkset = null;
    public linkedClass = null;
    public initGridData: Promise<any> = Promise.resolve();
    public crud: Promise<any> = Promise.resolve();
    public parentPath = null;
    public className = null;
    public dataNotFound = false;
    public successExecute = false;
    public errorMessage = '';
    public titleColumns = {};
    public model = {};

    public gridOptions: GridOptions = {
        rowSelection: 'multiple',
        rowHeight: 30,
        columnDefs: [],
        rowData: []
    };

    constructor(public databaseService: ODatabaseService,
                public router: Router,
                public route: ActivatedRoute,
                public translate: TranslateService,
                public serviceNotifications: NotificationService,
                public loadingService: LoadingGridService) {
    }

    onFilterChanged(value, gridOptions) {
        gridOptions.api.setQuickFilter(value);
    }

    cellValueChanged(value) {
        this.updateRecord(value.data);
    }

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

    isRequired(event) {
        if (event) {
            this.multipleSelectValid = true;
            return;
        }
    }

    createRecord(record, className): Promise<any> {
        record['@class'] = className;

        this.loadingService.start();

        this.crud = this.databaseService.createRecord(record)
            .then((res) => {
                this.loadingService.stop();
                this.serviceNotifications.createNotification('success', 'message.createSuccessful', 'orientdb.successCreate');
                return Promise.resolve(res);
            }, (error) => {
                this.loadingService.stop();
                this.serviceNotifications.createNotificationOnResponse(error);
                return Promise.reject(error);
            });

        return this.crud;
    }

    updateRecord(record) {
        this.loadingService.start();

        this.crud = this.databaseService.updateRecord(record)
            .then((res) => {
                this.loadingService.stop();
                this.serviceNotifications.createNotification('success', 'message.updateSuccessful', 'orientdb.successUpdate');
                return Promise.resolve(res);
            }, (error) => {
                this.serviceNotifications.createNotificationOnResponse(error);
                this.loadingService.stop();
                return Promise.reject(error);
            });

        return this.crud;
    }

    deleteRecord(rid): Promise<any> {
        let record: any = {};
        record['@rid'] = rid;

        this.loadingService.start();

        this.crud = this.databaseService.deleteRecord(record)
            .then((res) => {
                this.loadingService.stop();
                this.serviceNotifications.createNotification('success', 'message.deleteSuccessful', 'orientdb.successDelete');
                return Promise.resolve(res);
            }, (error) => {
                this.serviceNotifications.createNotificationOnResponse(error);
                this.loadingService.stop();
                return Promise.reject(error);
            });

        return this.crud;
    }

    multipleDeleteRecords(id): Promise<any> {
        let result: Promise<any>;

        let rid = id.split(',');

        rid.forEach((i) => {
            result = this.deleteRecord(i);
        });

        return result;
    }

    clickOnCell(event) {
        let columnDefs = event.colDef;

        switch (columnDefs.type) {
            case "LINKSET":
            case "LINK":
                break;

            case "EMBEDDEDLIST":
                this.embeddedList = columnDefs.custom['type'] || '';
                break;
        }
    }

    rowSelected(gridOptions) {
        if (gridOptions.api.getSelectedRows().length === gridOptions.rowData.length) {
            this.changeCheckboxState('allSelected', gridOptions);
        } else if (!gridOptions.api.getSelectedRows().length) {
            this.changeCheckboxState('notSelected', gridOptions);
        } else {
            this.changeCheckboxState('notAllSelected', gridOptions);
        }
    }

    getStore(className) {
        return this.databaseService.query('select from ' + className)
            .then((res: Response) => {
                let result = res.json()['result'];

                return Promise.resolve(result);
            })
    }

    overlayLoadingTemplate() {
        return cubeGridHtml;
    }

    addColumnCheckbox(columnDefs, gridOptions) {
        columnDefs.grid.unshift({
            headerName: " ",
            field: "checkboxSel",
            width: 45,
            hideInForm: true,
            checkboxSelection: true,
            headerCellTemplate: () => {
                let that = this;
                let eCell = document.createElement('span');
                eCell.innerHTML =
                    '<div colid="checkboxSel" tabindex="-1" class="ag-cell-no-focus ag-cell ag-cell-not-inline-editing" style="left: 0px; width: 45px;"><span class="ag-cell-wrapper">' +
                    '   <span class="ag-selection-checkbox" id="select-all">' +
                    '       <img id="all-selected" style="display: none;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpFQ0VGQkU3ODM4MTFFNjExQjlCQzhERUVDNkNGMzFDMyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpBRkJCRDU1MTEyM0ExMUU2ODE4MUUyOTNBNTRGQkIxNyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpBRkJCRDU1MDEyM0ExMUU2ODE4MUUyOTNBNTRGQkIxNyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjIzMkM4M0M1M0MxMUU2MTFCOUJDOERFRUM2Q0YzMUMzIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkVDRUZCRTc4MzgxMUU2MTFCOUJDOERFRUM2Q0YzMUMzIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+riMaEQAAAL5JREFUeNqUks0JhDAQhSd7tgtLMDUIyTXF2IdNWIE3c0ruYg9LtgcPzvpEF8SfHR8MGR75hpcwRERmrjQXCyutDKUQAkuFu2AUpsyiJ1JK0UtycRgGMsbsPBFYVRVZaw/+7Zu895znOY/j+PPWT7oGp2lirTU3TbPz/4IAAGLALeic47Ztlx7RELHrusPAAwgoy7LlrOuay7I8TXIadYOLouC+7+XgBiP2lTbw0crFGAF9ANq1kS75G8xXgAEAiqu9OeWZ/voAAAAASUVORK5CYII=">' +
                    '       <img id="not-selected" style="display: inline;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpFQ0VGQkU3ODM4MTFFNjExQjlCQzhERUVDNkNGMzFDMyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo2MkU1Rjk1NDExNDExMUU2ODhEQkMyRTJGOUNGODYyQyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo2MkU1Rjk1MzExNDExMUU2ODhEQkMyRTJGOUNGODYyQyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjI1MkM4M0M1M0MxMUU2MTFCOUJDOERFRUM2Q0YzMUMzIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkVDRUZCRTc4MzgxMUU2MTFCOUJDOERFRUM2Q0YzMUMzIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+t+CXswAAAFBJREFUeNrsksENwDAIA023a9YGNqlItkixlAFIn1VOMv5wvACAOxOZWUwsB6Gqswp36QivJNhBRHDhI0f8j9jNrCy4O2twNMobT/7QeQUYAFaKU1yE2OfhAAAAAElFTkSuQmCC">' +
                    '       <img id="not-all-selected" style="display: none;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpFQ0VGQkU3ODM4MTFFNjExQjlCQzhERUVDNkNGMzFDMyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpGMjU4MzhGQjEyM0ExMUU2QjAxM0Q2QjZFQ0IzNzM4NiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpGMjU4MzhGQTEyM0ExMUU2QjAxM0Q2QjZFQ0IzNzM4NiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjIzMkM4M0M1M0MxMUU2MTFCOUJDOERFRUM2Q0YzMUMzIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkVDRUZCRTc4MzgxMUU2MTFCOUJDOERFRUM2Q0YzMUMzIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+2Xml2QAAAGBJREFUeNpiYGBg8ATiZ0D8n0j8DKqH4dnhw4f/EwtAakF6GEGmAAEDKYCRkZGBiYFMQH+NLNjcjw2ghwMLIQWDx48Do/H5kSNHiNZw9OhREPUCRHiBNJOQyJ+A9AAEGACqkFldNkPUwwAAAABJRU5ErkJggg==">' +
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
        }
    }

    btnRenderer(columnDefs, nameBtn, width, iconName, clickEvent?: (event) => void) {
        columnDefs.grid.push({
            headerName: " ",
            field: nameBtn.toLowerCase(),
            width: width,
            hideInForm: true,
            cellRenderer: () => {
                let that = this;
                let button = document.createElement('i');
                button.setAttribute('class', 'material-icons');
                that.translate.get(nameBtn.toUpperCase())
                    .subscribe(title => {
                        button.setAttribute('title', title);
                    });
                button.innerHTML = iconName;
                button.setAttribute('style', "font-size: 18px; color: #009688; cursor: pointer;");
                button.addEventListener('click', (event) => {
                    if (clickEvent) {
                        clickEvent(event);
                    }
                });

                return button;
            }
        });
    }

    navigateToEdit() {
        let id = this.gridOptions.rowData[this.focusedRow]['@rid'];
        this.router.navigate([this.parentPath, 'edit', id]);
    }

    navigateToDelete() {
        let id = this.gridOptions.rowData[this.focusedRow]['@rid'];
        this.router.navigate([this.parentPath, 'delete', id]);
    }

    navigateToLinkset() {
        this.nextCrudLevel();
        this.router.navigate([this.parentPath, 'linkset']);
    }

    getSelectedRID(gridOptions) {
        let id = [];

        gridOptions.api.getSelectedRows().forEach((i) => {
            id.push(i['@rid']);
        });

        return id;
    }

    addRIDColumn(columnDefs) {
        columnDefs.push({
            headerName: "RID",
            field: "@rid",
            hideInForm: true,
            width: 45
        });
    }

    translateColumnsName(columnDefs, name): Promise<any> {
        let headersName = [];

        for (let i in columnDefs) {
            headersName.push(columnDefs[i][name].toUpperCase());
        }

        return this.translate.get(headersName).toPromise()
            .then((columnName) => {
                return Promise.resolve(columnName);
            }, (error) => {
                this.serviceNotifications.createNotificationOnResponse(error);
                return Promise.reject(error);
            });
    }

    getColumnDefs(className, readOnly) {
        let columnDefs: ColumnDefsModel = {
            grid: [],
            form: []
        };

        this.addColumnCheckbox(columnDefs, this.gridOptions);
        this.addRIDColumn(columnDefs.grid);

        if (readOnly) {
            this.btnRenderer(columnDefs, 'Edit', 30, 'mode_edit', (clickEvent) => {
                this.navigateToEdit();
            });
            this.btnRenderer(columnDefs, 'Delete', 30, 'delete', (clickEvent) => {
                this.navigateToDelete();
            });
        }

        let queryCrudMetaGridData = squel.select()
            .from('CrudMetaGridData')
            .where('crudClassMetaData.class = ?', className);

        let queryCrudMetaFormData = squel.select()
            .from('CrudMetaFormData')
            .where('crudClassMetaData.class = ?', className);

        return this.databaseService.getInfoClass(className)
            .then((res: Response) => {
                let properties = res.json().properties;

                return this.databaseService.query(queryCrudMetaGridData.toString())
                    .then((res: Response) => {
                        let isExistColumn: boolean = res.json()['result'].length > 0 ? true : false;

                        let columnsGrid = [];
                        let result = isExistColumn ? res.json()['result'] : properties; // add try / catch, can throws an error

                        return this.translateColumnsName(result, isExistColumn ? 'property' : 'name')
                            .then((columnsName) => {
                                for (let i in result) {
                                    let column = result[i];

                                    if (isExistColumn) {
                                        column['headerName'] = columnsName[result[i]['property'].toUpperCase()];
                                        column['field'] = result[i]['property'];
                                        column['hide'] = !result[i]['visible'];
                                        column['width'] = result[i]['columnWidth'];

                                        this.getPropertyMetadata(column, true, properties);
                                        columnsGrid.push(column);
                                    } else {
                                        column['headerName'] = columnsName[result[i]['name'].toUpperCase()];
                                        column['field'] = result[i]['name'];
                                        columnsGrid.push(column);
                                    }
                                }

                                let gridColumnModel: ColumnModel = {
                                    grid: columnsGrid,
                                    isExistGridColumn: isExistColumn,
                                };

                                return Promise.resolve(gridColumnModel);
                            });
                    }, (error) => {
                        return Promise.reject(error);
                    })
                    .then((gridColumnModel: ColumnModel) => {
                        return this.databaseService.query(queryCrudMetaFormData.toString())
                            .then((res: Response) => {
                                let isExistForm = res.json()['result'].length > 0 ? true : false;
                                let columnsForm = [];
                                let result = isExistForm ? res.json()['result'] : properties;

                                return this.translateColumnsName(result, isExistForm ? 'property' : 'name')
                                    .then((columnsName) => {
                                        for (let i in result) {
                                            let column = result[i];

                                            if (isExistForm) {
                                                column['headerName'] = columnsName[result[i]['property'].toUpperCase()];

                                                this.getPropertyMetadata(column, false, properties);
                                                columnsForm.push(column);
                                            } else {
                                                column['headerName'] = columnsName[result[i]['name'].toUpperCase()];
                                                column['property'] = result[i]['name'];
                                                column['editable'] = !result[i]['readonly'];
                                                column['visible'] = true;

                                                columnsForm.push(column);
                                            }
                                        }

                                        let columnModel: ColumnModel = {
                                            grid: gridColumnModel.grid,
                                            isExistGridColumn: gridColumnModel.isExistGridColumn,
                                            form: columnsForm,
                                            isExistFormColumn: isExistForm,
                                            columnDefs: columnDefs,
                                        };

                                        return Promise.resolve(columnModel);
                                    });
                            }, (error) => {
                                return Promise.reject(error);
                            })
                    }, (error) => {
                        return Promise.reject(error);
                    })
            }, (error) => {
                return Promise.reject(error);
            });
    }

    initColumnDefs(className, isGrid: boolean, readOnly: boolean): Promise<any> {
        return this.getColumnDefs(className, readOnly)
            .then((result: ColumnModel) => {
                let columnDefs: ColumnDefsModel = result.columnDefs;

                if (result.isExistFormColumn) {
                    result.form.sort(this.compare);
                }

                if (result.isExistGridColumn) {
                    result.grid.sort(this.compare);
                }

                columnDefs.form = columnDefs.form.concat(result.form);
                columnDefs.grid = columnDefs.grid.concat(result.grid);

                return Promise.resolve(isGrid ? columnDefs.grid : columnDefs.form);
            }, err => {
                this.serviceNotifications.createNotificationOnResponse(err);
                return Promise.reject(err);
            })
    }

    // to get additional metadata for the property. As the type linkedClass, mandatory, etc.
    getPropertyMetadata(column, isGrid: boolean, properties) {
        let metadataGridProperty = ['linkedClass', 'type'];
        let metadataFormProperty = ['mandatory', 'type', 'linkedClass'];
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

    compare(a, b) {
        if (a.order < b.order)
            return -1;
        if (a.order > b.order)
            return 1;
        return 0;
    }

    hideAllMessageBoxes() {
        this.dataNotFound = false;
        this.successExecute = false;
    }

    getSelectOptions(columnDefsItem) {
        if (typeof columnDefsItem !== 'undefined') {
            if (columnDefsItem.hasOwnProperty('custom')) {
                return columnDefsItem.custom.type.split(',');
            }
        }

        return [];
    }

    isLimitCrudLevel() {
        if (this.currentCrudLevel >= this.limitCrudLevel) {
            return true;
        } else {
            return false;
        }
    }

    nextCrudLevel() {
        this._currentCrudLevel += 1;
    }

    previousCrudLevel() {
        this._currentCrudLevel -= 1;
    }

    get currentCrudLevel(): number {
        return this._currentCrudLevel;
    }

    set currentCrudLevel(value: number) {
        this._currentCrudLevel = value;
    }

    setClassName(className) {
        this.className = className;
    }

    getClassName() {
        return this.className;
    }

    setModifiedRecord(ridModifiedRecord) {
        this.modifiedRecord = ridModifiedRecord;
    }

    getModifiedRecord() {
        return this.modifiedRecord;
    }

    setLinkedClass(linkedClass) {
        this.linkedClass = linkedClass;
    }

    getLinkedClass() {
        return this.linkedClass;
    }

    setParentPath(parentPath) {
        this.parentPath = parentPath;
    }

    setModel(model) {
        this.model = model;
    }
}
