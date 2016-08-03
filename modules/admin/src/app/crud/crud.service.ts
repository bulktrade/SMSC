import { ODatabaseService } from "../orientdb/orientdb.service";
import { Injectable } from "@angular/core";
import { RequestGetParameters } from "../orientdb/orientdb.requestGetParameters";
import { LocalStorage } from "angular2-localstorage/WebStorage";
import { Router, ActivatedRoute } from "@angular/router";
import { Response } from "@angular/http";
import { TranslateService } from "ng2-translate/ng2-translate";
import { CrudModel } from "./crud.model";

@Injectable()
export class CrudService {
    @LocalStorage() public focusedRow:any;

    crudModel = new CrudModel([], []);

    public btnDeleteDisabled = true;
    public addingFormValid = false;
    public gridOptions;
    public isActiveLinkset = null;
    public rowSelectionLinkset = null;
    public linkedClass = null;
    public showLinksetView = false;
    public initGridData:Promise<any>;
    public currPath = null;
    public className = null;
    public dataNotFound = false;
    public successExecute = false;
    public errorMessage = '';
    public successMessage = '';
    public model:any = {};

    constructor(public databaseService:ODatabaseService,
                public router:Router,
                public route:ActivatedRoute,
                public translate:TranslateService) {
        this.currPath = this.route.snapshot['_urlSegment'].pathsWithParams[0].path;

        if (this.route.data['value'].crudClass) {
            this.className = this.route.data['value'].crudClass;
        } else {
            this.setCrudClass(this.router['config']);
        }

        // init the column definitions
        this.initGridData = new Promise((resolve, reject) => {
            this.getColumnDefs(this.className, true, true)
                .then((columnDefs) => {
                    this.crudModel.columnDefs = columnDefs;
                })
                .then((res) => {
                    // init the row data
                    this.getStore(this.className)
                        .then((store) => {
                            this.crudModel.rowData = store;
                            resolve(this.crudModel.rowData);
                        }, (error) => {
                            this.dataNotFound = true;
                            this.errorMessage = 'orientdb.dataNotFound';
                        });
                });
        });
    }

    onFilterChanged(value, gridOptions) {
        gridOptions.api.setQuickFilter(value);
    }

    cellValueChanged(value) {
        this.updateRecord(value.data);
    }

    createRecord(colsValue) {
        let params:RequestGetParameters = {
            "nameClass": this.className,
            "colsValue": colsValue
        };

        this.databaseService.insert(params)
            .then((res) => {
                this.successExecute = true;
                this.successMessage = 'orientdb.successCreate';
            }, (error) => {
                this.dataNotFound = true;
                this.errorMessage = 'orientdb.dataNotCorrect';
            });
        return params;
    }

    updateRecord(value) {
        let colsValue = [];

        for (let key in value) {
            if (key !== 'rid' && key !== 'version') {
                colsValue.push(value[key]);
            }
        }

        let params = {
            "rid": value.rid,
            "version": value.version,
            "colsValue": value
        };

        return this.databaseService.update(params)
            .then((res) => {
                value.version++;
                this.successExecute = true;
                this.successMessage = 'orientdb.successUpdate';
            }, (error) => {
                this.dataNotFound = true;
                this.errorMessage = 'orientdb.dataNotCorrect';
            });
    }

    deleteRecord(rowData) {
        return this.databaseService.delete(rowData[this.focusedRow].rid)
            .then((res) => {
                this.successExecute = true;
                this.successMessage = 'orientdb.successDelete';
            }, (error) => {
                this.dataNotFound = true;
                this.errorMessage = 'orientdb.dataNotFound';
            });
    }

    clickOnCell(event) {
        this.btnDeleteDisabled = false;
        this.focusedRow = event.rowIndex;

        if (event.colDef.type === 'LINKSET' ||
            event.colDef.type === 'LINK') {
            this.linkedClass = event.colDef.linkedClass;
            this.isActiveLinkset = event.colDef.field;
            this.showLinksetView = true;
            this.rowSelectionLinkset = 'multiple';
        }

        switch (event.colDef.field) {
            case 'delete':
                break;

            case 'edit':
                this.router.navigateByUrl(this.currPath + '/edit');
                break;
        }
    }

    chooseLinkset(linksetGridOptions) {
        let focusedRows = linksetGridOptions.api.getSelectedRows();
        let linkSet = '';
        let params;

        for (let item = 0; item < focusedRows.length; item++) {
            linkSet += "" + focusedRows[item].rid + ",";
        }

        linkSet = linkSet.substring(0, linkSet.length - 1);

        if (this.gridOptions) {
            params = this.gridOptions.rowData[this.focusedRow];
            params[this.isActiveLinkset] = linkSet;
            this.updateRecord(params);

            this.gridOptions.rowData[this.focusedRow][this.isActiveLinkset] = linkSet;
            this.gridOptions.api.setRowData(this.gridOptions.rowData);
        } else {
            this.model[this.isActiveLinkset] = linkSet.split(',');
        }
    }

    setCrudClass(router) {
        for (let k in router) {
            if (typeof router[k] == "object" && router[k] !== null) {
                if (router[k].path === this.currPath) {
                    this.className = router[k].data['crudClass'];
                    return;
                } else {
                    this.setCrudClass(router[k]);
                }
            }
        }
    }

    getStore(className) {
        return this.databaseService.query('select from ' + className)
            .then((res:Response) => {
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

    addCheckboxSelection(columnDefs, gridOptions) {
        columnDefs.unshift({
            headerName: " ",
            field: "checkboxSel",
            width: 45,
            hideInForm: true,
            checkboxSelection: true,
            headerCellTemplate: () => {
                let eCell = document.createElement('span');
                eCell.innerHTML =
                    '<div style="text-align: left;">' +
                    '  <div id="agResizeBar" style="width: 4px; height: 100%; float: right; cursor: col-resize;"></div>' +
                    '  <div style="padding: 4px; overflow: hidden; text-overflow: ellipsis; text-align: center;">' +
                    '    <span class="ag-selection-checkbox" id="select-all" style="position:relative; top: -3px;">' +
                    '       <img id="all-selected" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpFQ0VGQkU3ODM4MTFFNjExQjlCQzhERUVDNkNGMzFDMyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpBRkJCRDU1MTEyM0ExMUU2ODE4MUUyOTNBNTRGQkIxNyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpBRkJCRDU1MDEyM0ExMUU2ODE4MUUyOTNBNTRGQkIxNyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjIzMkM4M0M1M0MxMUU2MTFCOUJDOERFRUM2Q0YzMUMzIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkVDRUZCRTc4MzgxMUU2MTFCOUJDOERFRUM2Q0YzMUMzIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+riMaEQAAAL5JREFUeNqUks0JhDAQhSd7tgtLMDUIyTXF2IdNWIE3c0ruYg9LtgcPzvpEF8SfHR8MGR75hpcwRERmrjQXCyutDKUQAkuFu2AUpsyiJ1JK0UtycRgGMsbsPBFYVRVZaw/+7Zu895znOY/j+PPWT7oGp2lirTU3TbPz/4IAAGLALeic47Ztlx7RELHrusPAAwgoy7LlrOuay7I8TXIadYOLouC+7+XgBiP2lTbw0crFGAF9ANq1kS75G8xXgAEAiqu9OeWZ/voAAAAASUVORK5CYII=" style="display: none;">' +
                    '       <img id="not-selected" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpFQ0VGQkU3ODM4MTFFNjExQjlCQzhERUVDNkNGMzFDMyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo2MkU1Rjk1NDExNDExMUU2ODhEQkMyRTJGOUNGODYyQyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo2MkU1Rjk1MzExNDExMUU2ODhEQkMyRTJGOUNGODYyQyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjI1MkM4M0M1M0MxMUU2MTFCOUJDOERFRUM2Q0YzMUMzIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkVDRUZCRTc4MzgxMUU2MTFCOUJDOERFRUM2Q0YzMUMzIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+t+CXswAAAFBJREFUeNrsksENwDAIA023a9YGNqlItkixlAFIn1VOMv5wvACAOxOZWUwsB6Gqswp36QivJNhBRHDhI0f8j9jNrCy4O2twNMobT/7QeQUYAFaKU1yE2OfhAAAAAElFTkSuQmCC" style="display: inline;">' +
                    '       <img id="not-all-selected" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpFQ0VGQkU3ODM4MTFFNjExQjlCQzhERUVDNkNGMzFDMyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpGMjU4MzhGQjEyM0ExMUU2QjAxM0Q2QjZFQ0IzNzM4NiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpGMjU4MzhGQTEyM0ExMUU2QjAxM0Q2QjZFQ0IzNzM4NiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjIzMkM4M0M1M0MxMUU2MTFCOUJDOERFRUM2Q0YzMUMzIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkVDRUZCRTc4MzgxMUU2MTFCOUJDOERFRUM2Q0YzMUMzIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+2Xml2QAAAGBJREFUeNpiYGBg8ATiZ0D8n0j8DKqH4dnhw4f/EwtAakF6GEGmAAEDKYCRkZGBiYFMQH+NLNjcjw2ghwMLIQWDx48Do/H5kSNHiNZw9OhREPUCRHiBNJOQyJ+A9AAEGACqkFldNkPUwwAAAABJRU5ErkJggg==" style="display: none;">' +
                    '   </span>' +
                    '  </div>' +
                    '</div>';

                let clicked = false;

                let eCalendar = eCell.querySelector('#select-all');
                let allSelected = eCell.querySelector('#all-selected');
                let notSelected = eCell.querySelector('#not-selected');
                let notAllSelected = eCell.querySelector('#not-all-selected');

                eCalendar.addEventListener('click', function() {
                    clicked = !clicked;

                    if (clicked) {
                        gridOptions.api.selectAll();

                        allSelected.setAttribute('style', 'display: inline;');
                        notSelected.setAttribute('style', 'display: none;');
                        notAllSelected.setAttribute('style', 'display: none;');
                    } else {
                        gridOptions.api.deselectAll();

                        allSelected.setAttribute('style', 'display: none;');
                        notSelected.setAttribute('style', 'display: inline;');
                        notAllSelected.setAttribute('style', 'display: none;');
                    }
                });

                return eCell;
            }
        });
    }

    getColumnDefs(className, readOnly, checkboxSelection) {
        let columnDefs = [];

        if (checkboxSelection) {
            columnDefs.push({
                headerName: " ",
                field: "checkboxSel",
                width: 45,
                hideInForm: true,
                checkboxSelection: true,
                headerCellTemplate: () => {
                    var that = this;
                    var checkbox = document.createElement('input');
                    checkbox.setAttribute('type', 'checkbox');
                    checkbox.style.height = '15px';
                    checkbox.addEventListener('click', () => {
                        this.gridOptions.api.selectAll();
                    });
                    return checkbox;
                }
            });
        }

        if (readOnly) {
            columnDefs.push({
                headerName: " ",
                field: "edit",
                width: 66,
                cellRenderer: (params) => {
                    return "<button style='height: 19px; background-color: #009688; color: #fff; border: none; " +
                        "border-radius: 3px;' disabled>Update</button>";
                },
                hideInForm: true
            });
            columnDefs.push({
                headerName: " ",
                field: "delete",
                width: 61,
                cellRenderer: (params) => {
                    return "<button style='height: 19px; background-color: #009688; color: #fff; border: none; " +
                        "border-radius: 3px;'>Delete</button>";
                },
                hideInForm: true
            });
        }

        return this.databaseService.getInfoClass(className)
            .then((res:Response) => {
                res.json().properties.forEach((item) => {
                    columnDefs.push({
                        headerName: this.translate.get(item.name.toUpperCase())['value'],
                        field: item.name,
                        editable: !item.readonly,
                        required: item.mandatory,
                        type: item.type,
                        linkedClass: item.linkedClass
                    })
                });

                return columnDefs;
            })
    }

}
