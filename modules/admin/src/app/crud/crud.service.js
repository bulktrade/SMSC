"use strict";
var orientdb_service_1 = require('../orientdb/orientdb.service');
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var ng2_translate_1 = require('ng2-translate/ng2-translate');
var notificationService_1 = require('../services/notificationService');
var loadingGrid_service_1 = require('../services/loading/loadingGrid.service');
var form_inputTypes_1 = require('./common/form/form.inputTypes');
var batchType_1 = require('../orientdb/model/batchType');
var rxjs_1 = require('rxjs');
var grid_service_1 = require('../services/grid.service');
var squel = require('squel');
var cubeGridHtml = require('../common/spinner/cubeGrid/cubeGrid.html');
var CrudService = (function () {
    function CrudService(databaseService, router, route, translate, serviceNotifications, loadingService, gridService) {
        this.databaseService = databaseService;
        this.router = router;
        this.route = route;
        this.translate = translate;
        this.serviceNotifications = serviceNotifications;
        this.loadingService = loadingService;
        this.gridService = gridService;
        this.crudLevel = [];
        this.isHint = [];
        this.multipleSelectValid = false;
        this.querySelectors = null;
        this.embeddedList = null;
        this.rowSelectionLinkset = null;
        this.linkedClass = null;
        this.initGridData = Promise.resolve();
        this.crud = Promise.resolve();
        this.parentPath = null;
        this.className = null;
        this.dataNotFound = false;
        this.successExecute = false;
        this.titleColumns = {};
        this.model = {};
        this.gridOptions = {
            rowSelection: 'multiple',
            rowHeight: 30,
            columnDefs: [],
            rowData: []
        };
        this.limitCrudLevel = 3;
    }
    CrudService.prototype.onFilterChanged = function (value, gridOptions) {
        gridOptions.api.setQuickFilter(value);
    };
    CrudService.prototype.cellValueChanged = function (value) {
        var _this = this;
        var operations = [
            {
                type: batchType_1.BatchType.UPDATE,
                record: value.data
            }
        ];
        this.databaseService.batch(operations)
            .subscribe(function (res) {
            _this.setCellStyleWhenDataIncorrect(_this.gridOptions, { backgroundColor: 'none' }, value);
            _this.serviceNotifications.createNotification('success', 'message.createSuccessful', 'orientdb.successCreate');
            _this.gridService.selectLinksetProperties(_this.gridOptions.columnDefs, [_this.gridOptions.rowData[value.node.childIndex]])
                .then(function () {
                _this.gridOptions.api.setRowData(_this.gridOptions.rowData);
            });
            return Promise.resolve(res);
        }, function (err) {
            _this.setCellStyleWhenDataIncorrect(_this.gridOptions, { backgroundColor: '#ffccba' }, value);
            _this.serviceNotifications.incorrectData(err.json().errors[0].content);
            return Promise.reject(err);
        });
    };
    CrudService.prototype.setCellStyleWhenDataIncorrect = function (gridOptions, style, changeCell) {
        gridOptions.columnDefs.filter(function (i) {
            if (i.property === changeCell.colDef.property) {
                i.cellStyle = function (params) {
                    if (params.data['@rid'] === changeCell.data['@rid']) {
                        return style;
                    }
                };
            }
        });
        gridOptions.api.setColumnDefs(this.gridOptions.columnDefs);
    };
    CrudService.prototype.createRecord = function (record, className) {
        var _this = this;
        record['@class'] = className;
        this.loadingService.start();
        var operations = [
            {
                type: batchType_1.BatchType.CREATE,
                record: record
            }
        ];
        return new Promise(function (resolve, reject) {
            _this.databaseService.batch(operations)
                .subscribe(function (res) {
                _this.loadingService.stop();
                _this.serviceNotifications.createNotification('success', 'message.createSuccessful', 'orientdb.successCreate');
                resolve(res);
            }, function (error) {
                _this.loadingService.stop();
                _this.serviceNotifications.createNotificationOnResponse(error);
                reject(error);
            });
        });
    };
    CrudService.prototype.updateRecord = function (record) {
        var _this = this;
        this.loadingService.start();
        var operations = [
            {
                type: batchType_1.BatchType.UPDATE,
                record: record
            }
        ];
        return new Promise(function (resolve, reject) {
            _this.databaseService.batch(operations)
                .subscribe(function (res) {
                _this.loadingService.stop();
                _this.serviceNotifications.createNotification('success', 'message.updateSuccessful', 'orientdb.successUpdate');
                resolve(res);
            }, function (error) {
                _this.serviceNotifications.createNotificationOnResponse(error);
                _this.loadingService.stop();
                reject(error);
            });
        });
    };
    CrudService.prototype.deleteRecord = function (rid) {
        var _this = this;
        var record = {};
        record['@rid'] = rid;
        this.loadingService.start();
        var operations = [];
        rid.forEach(function (i) {
            var operation = {
                type: batchType_1.BatchType.DELETE,
                record: {
                    '@rid': i
                }
            };
            operations.push(operation);
        });
        return rxjs_1.Observable.create(function (observer) {
            _this.databaseService.batch(operations)
                .subscribe(function (res) {
                _this.loadingService.stop();
                _this.serviceNotifications.createNotification('success', 'message.deleteSuccessful', 'orientdb.successDelete');
                observer.next(res);
                observer.complete();
            }, function (error) {
                _this.serviceNotifications.createNotificationOnResponse(error);
                _this.loadingService.stop();
            });
        });
    };
    CrudService.prototype.clickOnCell = function (event) {
        var columnDefs = event.colDef;
        switch (columnDefs.type) {
            case 'LINKSET':
            case 'LINK':
                break;
            case 'EMBEDDEDLIST':
                this.embeddedList = columnDefs.custom['type'] || '';
                break;
            default:
                break;
        }
    };
    CrudService.prototype.rowSelected = function (gridOptions) {
        if (gridOptions.api.getSelectedRows().length === gridOptions.rowData.length) {
            this.changeCheckboxState('allSelected', gridOptions);
        }
        else if (!gridOptions.api.getSelectedRows().length) {
            this.changeCheckboxState('notSelected', gridOptions);
        }
        else {
            this.changeCheckboxState('notAllSelected', gridOptions);
        }
    };
    CrudService.prototype.getStore = function (className) {
        var _this = this;
        return rxjs_1.Observable.create(function (observer) {
            _this.databaseService.query('select from ' + className)
                .subscribe(function (res) {
                observer.next(res);
                observer.complete();
            }, function (err) {
                observer.error(err);
                observer.complete();
                _this.serviceNotifications.createNotificationOnResponse(err);
            });
        });
    };
    CrudService.prototype.overlayLoadingTemplate = function () {
        return cubeGridHtml;
    };
    CrudService.prototype.addColumnCheckbox = function (columnDefs, gridOptions) {
        var _this = this;
        columnDefs.grid.unshift({
            headerName: ' ',
            field: 'checkboxSel',
            width: 45,
            hideInForm: true,
            checkboxSelection: true,
            headerCellTemplate: function () {
                var that = _this;
                var eCell = document.createElement('span');
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
                var clicked = false;
                _this.querySelectors = {
                    eCalendar: eCell.querySelector('#select-all'),
                    allSelected: eCell.querySelector('#all-selected'),
                    notSelected: eCell.querySelector('#not-selected'),
                    notAllSelected: eCell.querySelector('#not-all-selected')
                };
                _this.querySelectors.eCalendar.addEventListener('click', function () {
                    clicked = !clicked;
                    if (clicked) {
                        that.changeCheckboxState('allSelected', gridOptions);
                    }
                    else {
                        that.changeCheckboxState('notSelected', gridOptions);
                    }
                });
                return eCell;
            }
        });
    };
    CrudService.prototype.changeCheckboxState = function (isSelectCheckbox, gridOptions) {
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
    };
    CrudService.prototype.btnRenderer = function (columnDefs, nameBtn, width, iconName, clickEvent) {
        var _this = this;
        columnDefs.grid.push({
            headerName: ' ',
            field: nameBtn.toLowerCase(),
            width: width,
            hideInForm: true,
            cellRenderer: function () {
                var that = _this;
                var button = document.createElement('i');
                button.setAttribute('class', 'material-icons');
                that.translate.get(nameBtn.toUpperCase())
                    .subscribe(function (title) {
                    button.setAttribute('title', title);
                });
                button.innerHTML = iconName;
                button.setAttribute('style', 'font-size: 18px; color: #009688; cursor: pointer;');
                button.addEventListener('click', function (event) {
                    if (clickEvent) {
                        clickEvent(event);
                    }
                });
                return button;
            }
        });
    };
    CrudService.prototype.navigateToEdit = function () {
        var id = this.gridOptions.rowData[this.focusedRow]['@rid'];
        this.router.navigate([this.parentPath, 'edit', id]);
    };
    CrudService.prototype.navigateToDelete = function () {
        var id = this.gridOptions.rowData[this.focusedRow]['@rid'];
        this.router.navigate([this.parentPath, 'delete', id]);
    };
    CrudService.prototype.navigateToLinkset = function (linsetProperty) {
        this.nextCrudLevel(linsetProperty);
        this.router.navigate([this.parentPath, 'linkset']);
    };
    CrudService.prototype.nextCrudLevel = function (linsetProperty) {
        var crudLevel = {
            className: this.getLinkedClass(),
            inputModel: this.model,
            linksetProperty: linsetProperty
        };
        this.crudLevel.push(crudLevel);
    };
    CrudService.prototype.previousCrudLevel = function () {
        var previousLevel = this.crudLevel.pop();
        this.setLinkedClass(previousLevel.className);
        this.setModel(previousLevel.inputModel);
        return previousLevel;
    };
    CrudService.prototype.backFromForm = function (location) {
        location.back();
    };
    CrudService.prototype.getSelectedRID = function (gridOptions) {
        var id = [];
        gridOptions.api.getSelectedRows().forEach(function (i) {
            id.push(i['@rid']);
        });
        return id;
    };
    CrudService.prototype.addRIDColumn = function (columnDefs) {
        columnDefs.push({
            headerName: 'RID',
            field: '@rid',
            hideInForm: true,
            width: 55
        });
    };
    CrudService.prototype.translateColumnsName = function (columnDefs, name) {
        var _this = this;
        var headersName = [];
        for (var i in columnDefs) {
            if (columnDefs.hasOwnProperty(i)) {
                headersName.push(columnDefs[i][name].toUpperCase());
            }
        }
        return this.translate.get(headersName).toPromise()
            .then(function (columnName) {
            return Promise.resolve(columnName);
        }, function (error) {
            _this.serviceNotifications.createNotificationOnResponse(error);
            return Promise.reject(error);
        });
    };
    CrudService.prototype.getColumnDefs = function (className, readOnly) {
        var _this = this;
        var columnDefs = {
            grid: [],
            form: []
        };
        this.addColumnCheckbox(columnDefs, this.gridOptions);
        this.addRIDColumn(columnDefs.grid);
        if (readOnly) {
            this.btnRenderer(columnDefs, 'Edit', 30, 'mode_edit', function (clickEvent) {
                _this.navigateToEdit();
            });
            this.btnRenderer(columnDefs, 'Delete', 30, 'delete', function (clickEvent) {
                _this.navigateToDelete();
            });
        }
        return rxjs_1.Observable.create(function (observer) {
            _this.databaseService.getInfoClass(className)
                .then(function (res) {
                var properties = res.json().properties;
                _this.setPropertiesMetaGridData(properties, className)
                    .subscribe(function (gridProperties) {
                    _this.setPropertiesMetaFormData(properties, className)
                        .subscribe(function (formProperties) {
                        columnDefs.form = columnDefs.form.concat(formProperties);
                        columnDefs.grid = columnDefs.grid.concat(gridProperties);
                        observer.next(columnDefs);
                        observer.complete();
                    }, function (err) {
                        observer.error(err);
                        observer.complete();
                    });
                }, function (err) {
                    observer.error(err);
                    observer.complete();
                });
            }, function (err) {
                observer.error(err);
                observer.complete();
            });
        });
    };
    CrudService.prototype.setPropertiesMetaFormData = function (properties, className) {
        var _this = this;
        var queryCrudMetaFormData = squel.select()
            .from('CrudMetaFormData')
            .where('crudClassMetaData.class = ?', className);
        return rxjs_1.Observable.create(function (observer) {
            _this.databaseService.query(queryCrudMetaFormData.toString())
                .subscribe(function (res) {
                var isExistForm;
                var columnsForm = [];
                var result;
                try {
                    isExistForm = res.json()['result'].length > 0 ? true : false;
                    result = isExistForm ? res.json()['result'] : properties;
                }
                catch (ex) {
                    observer.error(ex);
                }
                _this.translateColumnsName(result, isExistForm ? 'property' : 'name')
                    .then(function (columnsName) {
                    for (var i in result) {
                        if (result.hasOwnProperty(i)) {
                            var column = result[i];
                            if (isExistForm) {
                                column['headerName'] =
                                    columnsName[result[i]['property'].toUpperCase()];
                                _this.getPropertyMetadata(column, false, properties);
                                columnsForm.push(column);
                            }
                            else {
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
                        columnsForm.sort(_this.compare);
                    }
                    observer.next(columnsForm);
                    observer.complete();
                });
            }, function (err) {
                observer.error(err);
                observer.complete();
            });
        });
    };
    CrudService.prototype.setPropertiesMetaGridData = function (properties, className) {
        var _this = this;
        var queryCrudMetaGridData = squel.select()
            .from('CrudMetaGridData')
            .where('crudClassMetaData.class = ?', className);
        return rxjs_1.Observable.create(function (observer) {
            _this.databaseService.query(queryCrudMetaGridData.toString())
                .subscribe(function (res) {
                var isExistColumn;
                var columnsGrid = [];
                var result;
                try {
                    isExistColumn = res.json()['result'].length > 0 ? true : false;
                    result = isExistColumn ? res.json()['result'] : properties;
                }
                catch (ex) {
                    observer.error(ex);
                }
                return _this.translateColumnsName(result, isExistColumn ? 'property' : 'name')
                    .then(function (columnsName) {
                    for (var i in result) {
                        if (result.hasOwnProperty(i)) {
                            var column = result[i];
                            if (isExistColumn) {
                                column['headerName'] =
                                    columnsName[result[i]['property'].toUpperCase()];
                                column['field'] = result[i]['property'];
                                column['hide'] = !result[i]['visible'];
                                column['width'] = result[i]['columnWidth'];
                                _this.getPropertyMetadata(column, true, properties);
                                columnsGrid.push(column);
                            }
                            else {
                                column['headerName'] =
                                    columnsName[result[i]['name'].toUpperCase()];
                                column['field'] = result[i]['name'];
                                columnsGrid.push(column);
                            }
                        }
                    }
                    if (isExistColumn) {
                        columnsGrid.sort(_this.compare);
                    }
                    observer.next(columnsGrid);
                    observer.complete();
                });
            }, function (error) {
                observer.error(error);
                observer.complete();
            });
        });
    };
    // to get additional metadata for the property. As the type linkedClass, mandatory, etc.
    CrudService.prototype.getPropertyMetadata = function (column, isGrid, properties) {
        var metadataGridProperty = ['linkedClass', 'type', 'custom'];
        var metadataFormProperty = ['mandatory', 'type', 'linkedClass', 'custom'];
        var property;
        if (isGrid) {
            property = properties.filter(function (obj) {
                return obj.name === column.field;
            })[0];
            if (property) {
                metadataGridProperty.forEach(function (i) {
                    if (property.hasOwnProperty(i)) {
                        column[i] = property[i];
                    }
                });
            }
        }
        else {
            property = properties.filter(function (obj) {
                return obj.name === column.property;
            })[0];
            if (property) {
                metadataFormProperty.forEach(function (i) {
                    if (property.hasOwnProperty(i)) {
                        column[i] = property[i];
                    }
                });
            }
        }
    };
    CrudService.prototype.compare = function (a, b) {
        if (a.order < b.order)
            return -1;
        if (a.order > b.order)
            return 1;
        return 0;
    };
    CrudService.prototype.hideAllMessageBoxes = function () {
        this.dataNotFound = false;
        this.successExecute = false;
    };
    CrudService.prototype.getSelectOptions = function (columnDefsItem) {
        if (typeof columnDefsItem !== 'undefined') {
            if (columnDefsItem.hasOwnProperty('custom')) {
                return columnDefsItem.custom.type.split(',');
            }
        }
        return [];
    };
    CrudService.prototype.isLimitCrudLevel = function () {
        if (this.crudLevel.length >= this.limitCrudLevel - 1) {
            return true;
        }
        else {
            return false;
        }
    };
    CrudService.prototype.typeForInput = function (type) {
        var types = form_inputTypes_1.INPUT_TYPES;
        var result = null;
        result = types.find(function (i) {
            if (i === type) {
                return true;
            }
            return false;
        });
        result = this.inputType(result);
        return result;
    };
    CrudService.prototype.inputType = function (type) {
        var result;
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
    };
    CrudService.prototype.isRequired = function (event) {
        if (event) {
            this.multipleSelectValid = true;
            return;
        }
    };
    CrudService.prototype.setParentPath = function (parent) {
        var pathFromRoot = '';
        var urlSuffix = '/';
        for (var i in parent) {
            if (parent[i].routeConfig !== null && parent[i].routeConfig.path !== '') {
                pathFromRoot += parent[i].routeConfig.path + urlSuffix;
            }
        }
        this.parentPath = pathFromRoot;
    };
    CrudService.prototype.setEmbeddedList = function (propertyName, event) {
        if (!this.model[propertyName]) {
            this.model[propertyName] = [];
        }
        else if (typeof event !== 'undefined') {
            this.model[propertyName] = [event];
        }
        return this.model[propertyName];
    };
    CrudService.prototype.resetCrudLevels = function () {
        this.crudLevel = [];
    };
    CrudService.prototype.setClassName = function (className) {
        this.className = className;
    };
    CrudService.prototype.getClassName = function () {
        return this.className;
    };
    CrudService.prototype.setLinkedClass = function (linkedClass) {
        this.linkedClass = linkedClass;
    };
    CrudService.prototype.getLinkedClass = function () {
        return this.linkedClass;
    };
    CrudService.prototype.setModel = function (model) {
        this.model = model;
    };
    CrudService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [orientdb_service_1.ODatabaseService, router_1.Router, router_1.ActivatedRoute, ng2_translate_1.TranslateService, notificationService_1.NotificationService, loadingGrid_service_1.LoadingGridService, grid_service_1.GridService])
    ], CrudService);
    return CrudService;
}());
exports.CrudService = CrudService;
//# sourceMappingURL=crud.service.js.map