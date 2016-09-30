"use strict";
var core_1 = require('@angular/core');
var orientdb_service_1 = require('../orientdb/orientdb.service');
var notificationService_1 = require('./notificationService');
var squel = require('squel');
var GridService = (function () {
    function GridService(database, serviceNotifications) {
        this.database = database;
        this.serviceNotifications = serviceNotifications;
    }
    GridService.prototype.selectLinksetProperties = function (columnDefs, rowData) {
        var linksetProperties = [];
        columnDefs.filter(function (obj) {
            if (obj.type === 'LINKSET' ||
                obj.type === 'LINK') {
                linksetProperties.push({
                    name: obj.property,
                    linkedClass: obj.linkedClass,
                    type: obj.type
                });
            }
        });
        return this.replaceLinksetItemsWithName(linksetProperties, rowData);
    };
    GridService.prototype.replaceLinksetItemsWithName = function (linksetProperties, rowData) {
        var _this = this;
        var promises = [];
        linksetProperties.forEach(function (i) {
            rowData.forEach(function (row) {
                var linkset = row[i['name']];
                if (typeof linkset !== 'undefined' && i['type'] === 'LINKSET') {
                    for (var keyLink = 0; keyLink < linkset.length; keyLink++) {
                        promises.push(_this.getLinksetName(linkset, keyLink, i['linkedClass'], i['type']));
                    }
                    linkset['type'] = i['type'];
                }
                else if (i['type'] === 'LINK') {
                    if (typeof row[i['name']] !== 'undefined' && row[i['name']] !== null) {
                        promises.push(_this.getLinksetName(row, i['name'], i['linkedClass'], i['type']));
                    }
                }
            });
        });
        return Promise.all(promises);
    };
    GridService.prototype.getLinksetName = function (linkset, keyLink, className, type) {
        var _this = this;
        return this.database.load(linkset[keyLink])
            .then(function (res) {
            return _this.getTitleColumns(className)
                .then(function (columnName) {
                var record = res.json();
                switch (type) {
                    case 'LINKSET':
                        linkset['_' + keyLink] = linkset[keyLink];
                        if (record.hasOwnProperty(columnName)
                            && typeof columnName !== 'undefined') {
                            linkset[keyLink] = record[columnName];
                        }
                        break;
                    case 'LINK':
                        if (record.hasOwnProperty(columnName)
                            && typeof columnName !== 'undefined') {
                            var rid = linkset[keyLink];
                            linkset[keyLink] = [];
                            linkset[keyLink][0] = record[columnName];
                            linkset[keyLink]['rid'] = rid;
                            linkset[keyLink]['type'] = type;
                        }
                        break;
                    default:
                        break;
                }
            });
        }, function (error) {
            _this.serviceNotifications.createNotification('error', 'ERROR', 'orientdb.dataNotFound');
            return Promise.reject(error);
        });
    };
    GridService.prototype.getTitleColumns = function (className) {
        var _this = this;
        var queryCrudClassMetaData = squel.select()
            .from('CrudClassMetaData')
            .where('class = ?', className);
        return new Promise(function (resolve, reject) {
            _this.database.query(queryCrudClassMetaData.toString())
                .subscribe(function (res) {
                var result = null;
                if (res.json().result.length) {
                    result = res.json().result[0].titleColumns;
                }
                ;
                resolve(result);
            }, function (err) {
                reject(err);
            });
        });
    };
    GridService.prototype.combineOperators = function (currentCrudLevel) {
        if (typeof currentCrudLevel !== 'undefined') {
            var promises = [];
            var expression_1 = squel.expr();
            for (var i in currentCrudLevel.linksetProperty.bingingProperties) {
                if (currentCrudLevel.linksetProperty.bingingProperties.hasOwnProperty(i)) {
                    var rid = currentCrudLevel.linksetProperty.bingingProperties[i];
                    promises.push(this.database.load(rid)
                        .then(function (res) {
                        var result = res.json();
                        var fromComponent = result.fromProperty + ' ' + result.operator[0] + ' ?';
                        switch (result.combineOperator[0]) {
                            case 'AND':
                                expression_1
                                    .and(fromComponent, result.toProperty);
                                break;
                            case 'OR':
                                expression_1
                                    .or(fromComponent, result.toProperty);
                                break;
                            case 'NOT':
                                expression_1
                                    .not(fromComponent, result.toProperty);
                                break;
                            default:
                                break;
                        }
                    }));
                }
            }
            return Promise.all(promises)
                .then(function () {
                return Promise.resolve(expression_1);
            });
        }
        else {
            return Promise.resolve(null);
        }
    };
    GridService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [orientdb_service_1.ODatabaseService, notificationService_1.NotificationService])
    ], GridService);
    return GridService;
}());
exports.GridService = GridService;
//# sourceMappingURL=grid.service.js.map