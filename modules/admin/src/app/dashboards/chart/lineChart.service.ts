import { Injectable } from '@angular/core';
import { BaThemeConfigProvider } from "./theme/theme.configProvider";
import { colorHelper, layoutPaths } from "./theme/theme.constants";

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
        }
    }

    getSerial(data: Object) {
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
            dataProvider: data,
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
                    //lineColor: colorHelper.hexToRgbA(graphColor, 0.3),
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
                    //lineColor: colorHelper.hexToRgbA(graphColor, 0.15),
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
        return {
            "type": "pie",
            "theme": "light",
            "dataProvider": data,
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
}
