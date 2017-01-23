import { Injectable } from '@angular/core';
import { BaThemeConfigProvider } from "./theme/theme.configProvider";
import { ColorHelper, layoutPaths } from "./theme/theme.constants";

@Injectable()
export class LineChartService {

    constructor(private _baConfig: BaThemeConfigProvider) {
    }

    getData(chartType: string, data: Object): Object {
        switch (chartType) {
            case 'Serial chart':
                return this.getSerial(data);

            case 'Pie chart':
                return this.getPie(data);

            case 'Line chart':
                return this.getLine(data);

            case 'Bar chart':
                return this.getBar(data);

            case 'Bubble chart':
                return this.getBubble(data);
        }
    }

    getSerial(data: Object) {
        var res = [];

        for (var i = 1; i <= 12; i++) {
            for (var y = 1; y <= 2; y++) {
                var date = new Date(2016, i, y*5);
                var day = date.getDate(); var monthIndex = date.getMonth();
                var year = date.getFullYear();
                res.push({
                    date: (monthIndex + " " + year),
                    value: Math.ceil(Math.random()*1000),
                    value0: Math.ceil(Math.random()*1000) });
            }
        }

        let layoutColors = this._baConfig.get().colors;
        let graphColor = this._baConfig.get().colors.custom.dashboardLineChart;

        return {
            type: 'serial',
            theme: 'blur',
            marginTop: 15,
            marginRight: 15,
            responsive: {
                'enabled': true
            },
            dataProvider: res,
            categoryField: 'date',
            categoryAxis: {
                parseDates: true,
                gridAlpha: 0,
                color: layoutColors.defaultText,
                axisColor: layoutColors.defaultText
            },
            valueAxes: [
                {
                    minVerticalGap: 50,
                    gridAlpha: 0,
                    color: layoutColors.defaultText,
                    axisColor: layoutColors.defaultText
                }
            ],
            graphs: [
                {
                    id: 'g0',
                    bullet: 'none',
                    useLineColorForBulletBorder: true,
                    //lineColor: ColorHelper.hexToRgbA(graphColor, 0.3),
                    lineThickness: 1,
                    negativeLineColor: layoutColors.danger,
                    type: 'smoothedLine',
                    valueField: 'value0',
                    fillAlphas: 1,
                    fillColorsField: 'lineColor',
                    lineColor: 'rgba(251, 213, 26, 0.3)'
                },
                {
                    id: 'g1',
                    bullet: 'none',
                    useLineColorForBulletBorder: true,
                    //lineColor: ColorHelper.hexToRgbA(graphColor, 0.15),
                    lineThickness: 1,
                    negativeLineColor: layoutColors.danger,
                    type: 'smoothedLine',
                    valueField: 'value',
                    fillAlphas: 1,
                    fillColorsField: 'lineColor',
                    lineColor: 'rgba(183, 224, 33, 0.3)'
                }
            ],
            chartScrollbar: {
                backgroundColor: 'rgba(255, 0, 0, 1)'
            },
            chartCursor: {
                categoryBalloonDateFormat: 'MM YYYY',
                categoryBalloonColor: '#4285F4',
                categoryBalloonAlpha: 0.7,
                cursorAlpha: 0,
                valueLineEnabled: true,
                valueLineBalloonEnabled: true,
                valueLineAlpha: 0.5,
                fullWidth: true
            },
            dataDateFormat: 'MM YYYY',
            export: {
                enabled: true
            },
            creditsPosition: 'bottom-right',
            zoomOutButton: {
                backgroundColor: '#fff',
                backgroundAlpha: 0
            },
            zoomOutText: '',
            pathToImages: layoutPaths.images.amChart
        };
    }

    getPie(data: Object) {
        function getStr() {
            var text = "";
            var possible = "abcdefghijklmnopqrstuvwxyz";

            for( var i=0; i < 5; i++ )
                text += possible.charAt(Math.floor(Math.random() * possible.length)); return text;
        }

        var res = [];
        var len = Math.ceil(Math.random()*15);

        for(var i = 0; i < len; i++) {
            res.push({
                country: getStr(),
                litres: Math.ceil(Math.random()*100) });
        }

        return {
            "type": "pie",
            "theme": "light",
            "dataProvider": res,
            "valueField": "litres",
            "titleField": "country",
            "balloon":{
                "fixedPosition":true
            },
            "export": {
                "enabled": true
            }
        }
    }

    getLine(data: Object) {
        var res = [];

        for(var i = 1900; i < 2016; i++) {
            var single = Math.random()*10;
            single = single > 5 ? 1 : -1;
            res.push({
                year: String(i),
                value: Math.ceil(Math.random()*100)*single
            });
        }

        return {
            "type": "serial",
            "theme": "light",
            "marginTop":0,
            "marginRight": 80,
            "dataProvider": res,
            "valueAxes": [{
                "axisAlpha": 0,
                "position": "left"
            }],
            "graphs": [{
                "id":"g1",
                "balloonText": "[[category]]<br><b><span style='font-size:14px;'>[[value]]</span></b>",
                "bullet": "round",
                "bulletSize": 8,
                "lineColor": "#d1655d",
                "lineThickness": 2,
                "negativeLineColor": "#637bb6",
                "type": "smoothedLine",
                "valueField": "value"
            }],
            "chartScrollbar": {
                "graph":"g1",
                "gridAlpha":0,
                "color":"#888888",
                "scrollbarHeight":55,
                "backgroundAlpha":0,
                "selectedBackgroundAlpha":0.1,
                "selectedBackgroundColor":"#888888",
                "graphFillAlpha":0,
                "autoGridCount":true,
                "selectedGraphFillAlpha":0,
                "graphLineAlpha":0.2,
                "graphLineColor":"#c2c2c2",
                "selectedGraphLineColor":"#888888",
                "selectedGraphLineAlpha":1

            },
            "chartCursor": {
                "categoryBalloonDateFormat": "YYYY",
                "cursorAlpha": 0,
                "valueLineEnabled":true,
                "valueLineBalloonEnabled":true,
                "valueLineAlpha":0.5,
                "fullWidth":true
            },
            "dataDateFormat": "YYYY",
            "categoryField": "year",
            "categoryAxis": {
                "minPeriod": "YYYY",
                "parseDates": true,
                "minorGridAlpha": 0.1,
                "minorGridEnabled": true
            },
            "export": {
                "enabled": true
            }
        }
    }

    getBar(data: Object) {
        function getStr() {
            var text = "";
            var possible = "abcdefghijklmnopqrstuvwxyz";

            for( var i=0; i < 5; i++ )
                text += possible.charAt(Math.floor(Math.random() * possible.length));

            return text;
        }

        var res = [];
        var len = Math.ceil(Math.random()*50);

        for(var i = 0; i < len; i++) {
            res.push({
                country: getStr(),
                visits: Math.ceil(Math.random()*10000)
            });
        }

        return {
            "type": "serial",
            "theme": "light",
            "dataProvider": res,
            "gridAboveGraphs": true,
            "startDuration": 1,
            "graphs": [ {
                "balloonText": "[[category]]: <b>[[value]]</b>",
                "fillAlphas": 0.8,
                "lineAlpha": 0.2,
                "type": "column",
                "valueField": "visits"
            } ],
            "chartCursor": {
                "categoryBalloonEnabled": false,
                "cursorAlpha": 0,
                "zoomable": false
            },
            "categoryField": "country",
            "categoryAxis": {
                "gridPosition": "start",
                "gridAlpha": 0,
                "tickPosition": "start",
                "tickLength": 20
            },
            "export": {
                "enabled": true
            }

        }
    }

    getBubble(data: Object) {
        var res = [];

        for(var i = 0; i < Math.ceil(Math.random()*30); i++) {

            res.push({
                y: Math.ceil(Math.random()*50),
                x: Math.ceil(Math.random()*50),
                value: Math.ceil(Math.random()*50),
                y2: Math.ceil(Math.random()*50),
                x2: Math.ceil(Math.random()*50),
                value2: Math.ceil(Math.random()*50)
            });
        }

        res;

        return  {
            "type": "xy",
            "theme": "light",
            "balloon":{
                "fixedPosition":true,
            },
            "dataProvider": res,
            "valueAxes": [ {
                "position": "bottom",
                "axisAlpha": 0
            }, {
                "minMaxMultiplier": 1.2,
                "axisAlpha": 0,
                "position": "left"
            } ],
            "startDuration": 1.5,
            "graphs": [ {
                "balloonText": "x:<b>[[x]]</b> y:<b>[[y]]</b><br>value:<b>[[value]]</b>",
                "bullet": "circle",
                "bulletBorderAlpha": 0.2,
                "bulletAlpha": 0.8,
                "lineAlpha": 0,
                "fillAlphas": 0,
                "valueField": "value",
                "xField": "x",
                "yField": "y",
                "maxBulletSize": 100
            }, {
                "balloonText": "x:<b>[[x]]</b> y:<b>[[y]]</b><br>value:<b>[[value]]</b>",
                "bullet": "diamond",
                "bulletBorderAlpha": 0.2,
                "bulletAlpha": 0.8,
                "lineAlpha": 0,
                "fillAlphas": 0,
                "valueField": "value2",
                "xField": "x2",
                "yField": "y2",
                "maxBulletSize": 100
            } ],
            "marginLeft": 46,
            "marginBottom": 35,
            "export": {
                "enabled": true
            }
        }
    }
}
