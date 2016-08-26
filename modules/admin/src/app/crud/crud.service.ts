import { ODatabaseService } from "../orientdb/orientdb.service";
import { Injectable } from "@angular/core";
import { RequestGetParameters } from "../orientdb/orientdb.requestGetParameters";
import { Router, ActivatedRoute } from "@angular/router";
import { Response } from "@angular/http";
import { TranslateService } from "ng2-translate/ng2-translate";
import { CrudModel } from "./crud.model";
import { GridOptions } from "ag-grid";
import { ServiceNotifications } from "../services/serviceNotification";
import { LoadingGridService } from "../services/loadingGrid.service";

const squel = require('squel');
declare let sprintf: any;

let cubeGridHtml = require('../common/spinner/cubeGrid/cubeGrid.html');
let cubeGridStyle = require('../common/spinner/cubeGrid/cubeGrid.scss');

@Injectable()
export class CrudService {
    crudModel = new CrudModel([], []);

    public pageSize = 50;
    public showCrudModify: boolean = false;
    public isEditForm: boolean = false;
    public modifiedRecord: any = {};
    public lastCrudElement: any;
    public allOfTheData;
    public focusedRow: any;
    public addingFormValid = false;
    public querySelectors = null;
    public embeddedList = null;
    public isActiveLinkset = null;
    public rowSelectionLinkset = null;
    public linkedClass = null;
    public showLinksetView = false;
    public initGridData: Promise<any> = Promise.resolve();
    public crud: Promise<any> = Promise.resolve();
    public parentPath = null;
    public className = null;
    public dataNotFound = false;
    public successExecute = false;
    public errorMessage = '';
    public successMessage = '';
    public multiCrud = [];
    public titleColumns = {};
    public model = {};

    public gridOptions: GridOptions = {
        columnDefs: this.crudModel.columnDefs,
        rowData: this.crudModel.rowData,
        rowSelection: 'multiple',
        rowHeight: 50,
        rowModelType: 'pagination'
    };

    constructor(public databaseService: ODatabaseService,
                public router: Router,
                public route: ActivatedRoute,
                public translate: TranslateService,
                public serviceNotifications: ServiceNotifications,
                public loadingService: LoadingGridService) {
    }

    onFilterChanged(value, gridOptions) {
        gridOptions.api.setQuickFilter(value);
    }

    cellValueChanged(value) {
        this.updateRecord(value.data);
    }

    isRequired(event) {
        if (event) {
            this.addingFormValid = true;
            return;
        }
    }

    createRecord(colsValue): Promise<any> {
        let params: RequestGetParameters = {
            "nameClass": this.getClassName(),
            "colsValue": colsValue
        };

        this.loadingService.start();

        this.crud = this.databaseService.insert(params)
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

    updateRecord(value) {
        let colsValue = {};

        for (let key in value) {
            if (key !== 'rid' && key !== 'version') {
                colsValue[key] = value[key];
            }
        }

        let params = {
            "rid": value.rid,
            "version": value.version,
            "colsValue": colsValue
        };

        this.loadingService.start();

        this.crud = this.databaseService.update(params)
            .then((res) => {
                value.version++;
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
        this.loadingService.start();

        this.crud = this.databaseService.delete(rid)
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
                this.isActiveLinkset = columnDefs.field;
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

                result.forEach((item) => {
                    item['rid'] = item['@rid'];
                    item['version'] = item['@version'];

                    delete item['@rid'];
                    delete item['@version'];
                    delete item['@fieldTypes'];
                    delete item['@class'];
                    delete item['@type'];
                });

                return result;
            })
    }

    removeProperties(obj, properties: Array<string>) {
        properties.forEach((i) => {
            delete obj[i];
        });

        return obj;
    }

    overlayLoadingTemplate() {
        return cubeGridHtml + '<style>' + cubeGridStyle + '</style>';
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

    btnRenderer(columnDefs, nameBtn) {
        columnDefs.grid.push({
            headerName: " ",
            field: nameBtn.toLowerCase(),
            width: 66,
            cellRenderer: () => {
                let that = this;
                let eCell = document.createElement('button');
                eCell.innerHTML = that.translate.get(nameBtn.toUpperCase())['value'];
                eCell.setAttribute('style', "height: 19px; background-color: #009688; color: #fff; border: none; " +
                    "border-radius: 3px; cursor: pointer;");
                eCell.addEventListener('click', () => {

                    switch (nameBtn) {
                        case 'Edit':
                            this.navigateToEdit();
                            break;
                        case 'Delete':
                            let id = this.gridOptions.rowData[this.focusedRow].rid;
                            that.router.navigate([that.parentPath, 'delete', id]);
                            break;
                        default:
                            break;
                    }
                });
                return eCell;
            },
            hideInForm: true
        });
    }

    getSelectedRID(gridOptions) {
        let id = [];

        gridOptions.api.getSelectedRows().forEach((i) => {
            id.push(i.rid);
        });

        return id;
    }

    navigateToEdit() {
        let id = this.gridOptions.rowData[this.focusedRow].rid;

        this.router.navigate([this.parentPath, 'edit', id]);
    }

    createNewDatasource(allOfTheData, gridOptions) {
        if (!this.allOfTheData) {
            return;
        }

        var dataSource = {
            pageSize: this.pageSize,
            getRows: (params) => {
                setTimeout(() => { // @todo timeout???, slice???
                    var rowsThisPage = allOfTheData.slice(params.startRow, params.endRow);

                    var lastRow = -1;
                    if (allOfTheData.length <= params.endRow) {
                        lastRow = allOfTheData.length;
                    }
                    params.successCallback(rowsThisPage, lastRow);
                }, 500);
            }
        };

        gridOptions.api.setDatasource(dataSource);
    }

    setRowData(rowData, gridOptions) {
        this.allOfTheData = rowData;
        this.createNewDatasource(this.allOfTheData, gridOptions);
    }

    getColumnDefs(className, readOnly) {
        let columnDefs = {
            grid: [],
            form: []
        };

        columnDefs.grid.push({
            headerName: "RID",
            field: "rid",
            hideInForm: true,
            width: 45
        });

        if (readOnly) {
            this.btnRenderer(columnDefs, 'Edit');
            this.btnRenderer(columnDefs, 'Delete');
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
                        let isExistColumn = res.json()['result'].length;
                        let result = isExistColumn ? res.json()['result'] : properties; // add try / catch, can throws an error

                        for (let i in result) {
                            let column = result[i];

                            if (isExistColumn) {
                                this.translate.get(result[i]['property'].toUpperCase())
                                    .toPromise()
                                    .then((headerName) => {
                                        column['headerName'] = headerName;
                                        column['field'] = result[i]['property'];
                                        column['hide'] = !result[i]['visible'];
                                        column['width'] = result[i]['columnWidth'];

                                        this.getPropertyMetadata(column, true, properties);
                                        columnDefs.grid.push(column);
                                    });
                            } else {
                                this.translate.get(result[i]['name'].toUpperCase())
                                    .toPromise()
                                    .then((headerName) => {
                                        column['headerName'] = headerName;
                                        column['field'] = result[i]['name'];
                                        columnDefs.grid.push(column);
                                    });
                            }
                        }

                    }, (error) => {
                        this.dataNotFound = true;
                        this.errorMessage = 'orientdb.dataNotFound';
                    })
                    .then(() => {
                        return this.databaseService.query(queryCrudMetaFormData.toString())
                            .then((res: Response) => {
                                let isExistForm = res.json()['result'].length;
                                let result = isExistForm ? res.json()['result'] : properties;

                                for (let i in result) {
                                    let column = result[i];

                                    if (isExistForm) {
                                        this.translate.get(result[i]['property'].toUpperCase())
                                            .toPromise()
                                            .then((headerName) => {
                                                column['headerName'] = headerName;

                                                this.getPropertyMetadata(column, false, properties);
                                                columnDefs.form.push(column);
                                            });
                                    } else {
                                        this.translate.get(result[i]['name'].toUpperCase())
                                            .toPromise()
                                            .then((headerName) => {
                                                column['headerName'] = headerName;
                                                column['property'] = result[i]['name'];
                                                column['editable'] = !result[i]['mandatory'];
                                                column['visible'] = true;

                                                columnDefs.form.push(column);
                                            });
                                    }
                                }

                                if (isExistForm) {
                                    columnDefs.grid.sort(this.compare);
                                    columnDefs.form.sort(this.compare);
                                }

                                return Promise.resolve(columnDefs);
                            }, (error) => {
                                this.dataNotFound = true;
                                this.errorMessage = 'orientdb.dataNotFound';
                            })
                    }, (error) => {
                        this.dataNotFound = true;
                        this.errorMessage = 'orientdb.dataNotFound';
                    })
            }, (error) => {
                this.serviceNotifications.createNotificationOnResponse(error);
                return Promise.reject(error);
            });
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

    initGrid(className, isGrid: boolean, initRowData?: (columnDefs) => void, initColumnDefs?: (rowData) => void): Promise<any> {
        return this.initGridData = this.getColumnDefs(className, true)
            .then((columnDefs) => {
                this.gridOptions.columnDefs = isGrid ? columnDefs.grid : columnDefs.form;

                this.addColumnCheckbox(columnDefs, this.gridOptions);
                if (initColumnDefs) {
                    initColumnDefs(columnDefs);
                }
            })
            .then((res) => {
                // init the row data
                this.getStore(className)
                    .then((store) => {
                        this.gridOptions.rowData = store;

                        if (this.gridOptions.hasOwnProperty('api')) {
                            this.setRowData(store, this.gridOptions);
                        }

                        if (initRowData) {
                            initRowData(store);
                        }

                        return Promise.resolve(res);
                    }, (error) => {
                        this.dataNotFound = true;
                        this.errorMessage = 'orientdb.dataNotFound';
                    });
            });
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
