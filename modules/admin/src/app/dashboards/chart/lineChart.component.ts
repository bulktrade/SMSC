import { Component, ViewEncapsulation } from '@angular/core';

import { LineChartService } from './lineChart.service';
import {Input} from "@angular/core/src/metadata/directives";

@Component({
    selector: 'line-chart',
    encapsulation: ViewEncapsulation.None,
    styleUrls: [require('./lineChart.scss')],
    template: require('./lineChart.html')
})
export class LineChart {
    @Input()
    chartType: string;

    showAllBtn: boolean = false;
    //  Chart type where can use "Show all" button
    showAllBtnList: Array<string> = ['serial'];
    chartData: Object;
    chart: any;

    constructor(private _lineChartService: LineChartService) {
    }

    ngOnInit() {
        console.log(this.chartType);
        this.chartData = this._lineChartService.getData(this.chartType);

        let showAll = this.showAllBtnList.find((element) => {
            if (this.chartType == element) {
                return true;
            } else {
                return false;
            }
        });

        if (showAll) {
            this.showAllBtn = true;
        }
    };

    initChart(chart: any) {
        this.chart = chart;

        let zoomChart = () => {
            //chart.zoomToDates(new Date(2013, 3), new Date(2014, 0));
        };

        chart.addListener('rendered', zoomChart);
        zoomChart();

        if (chart.zoomChart) {
            chart.zoomChart();
        }
    }

    public showAll() {
        this.chart.zoomOut();
    }
}
