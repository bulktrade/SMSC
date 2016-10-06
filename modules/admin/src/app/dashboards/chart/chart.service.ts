import {Injectable} from '@angular/core';
import {BaThemeConfigProvider, colorHelper} from './theme';

@Injectable()
export class TrafficChartService {

    constructor(private _baConfig:BaThemeConfigProvider) {
    }


    getData() {
        let dashboardColors = this._baConfig.get().colors.dashboard;
        return [10, 20, 30];
    }

    getConfig(chartType: string): Object {
        switch(chartType) {
            case 'doughnut':
                return {
                    type: 'doughnut',
                    data: {
                        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                        datasets: [{
                            label: '# of Votes',
                            data: [12, 19, 3, 5, 2, 3],
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)'
                            ],
                            borderColor: [
                                'rgba(255,99,132,1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)'
                            ],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        segmentShowStroke: false,
                        percentageInnerCutout : 30,
                        responsive: true,
                        maintainAspectRatio: false,
                        scaleShowLabels: false,
                        legend: {
                            display: false
                        },
                        onResize: () => {
                            console.log('resize');
                        }
                    }
                };
            case 'pie':
                return {
                    type: 'pie',
                    data: {
                        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                        datasets: [{
                            label: '# of Votes',
                            data: [12, 19, 3, 5, 2, 3],
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)'
                            ],
                            borderColor: [
                                'rgba(255,99,132,1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)'
                            ],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        segmentShowStroke: false,
                        percentageInnerCutout : 30,
                        responsive: true,
                        maintainAspectRatio: false,
                        scaleShowLabels: false,
                        legend: {
                            display: false
                        },
                        onResize: () => {
                            console.log('resize');
                        }
                    }
                };

            case 'line':
                return {
                    type: 'line',
                    data: {
                        labels: ["Red", "Blue", "Yellow"],
                        datasets: [
                            {
                                label: '# of Votes',
                                data: [
                                    {
                                        x: 0,
                                        y: 0
                                    }, {
                                        x: 0,
                                        y: 10
                                    }, {
                                        x: 0,
                                        y: 5
                                    }
                                ],
                                backgroundColor: "rgba(0,192,192,0.4)",
                                borderWidth: 1
                            },
                            {
                                label: '# of Votes',
                                data: [
                                    {
                                        x: 0,
                                        y: 5
                                    }, {
                                        x: 0,
                                        y: 3
                                    }, {
                                        x: 0,
                                        y: 5
                                    }
                                ],
                                backgroundColor: "rgba(255,0,0,0.4)",
                                borderWidth: 1
                            }
                        ]
                    },
                    options: {
                        segmentShowStroke: false,
                        percentageInnerCutout : 30,
                        responsive: true,
                        maintainAspectRatio: false,
                        scaleShowLabels: false,
                        legend: {
                            display: false
                        },
                        onResize: () => {
                            console.log('resize');
                        }
                    }
                };

            case 'bar':
                return {
                    type: 'bar',
                    data: {
                        labels: ["January", "February", "March", "April", "May", "June", "July"],
                        datasets: [
                            {
                                label: "My First dataset",
                                backgroundColor: [
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(255, 206, 86, 0.2)',
                                    'rgba(75, 192, 192, 0.2)',
                                    'rgba(153, 102, 255, 0.2)',
                                    'rgba(255, 159, 64, 0.2)'
                                ],
                                borderColor: [
                                    'rgba(255,99,132,1)',
                                    'rgba(54, 162, 235, 1)',
                                    'rgba(255, 206, 86, 1)',
                                    'rgba(75, 192, 192, 1)',
                                    'rgba(153, 102, 255, 1)',
                                    'rgba(255, 159, 64, 1)'
                                ],
                                borderWidth: 1,
                                data: [65, 59, 80, 81, 56, 55, 40],
                            }
                        ]
                    },
                    options: {
                        segmentShowStroke: false,
                        percentageInnerCutout : 30,
                        responsive: true,
                        maintainAspectRatio: false,
                        scaleShowLabels: false,
                        legend: {
                            display: false
                        },
                        onResize: () => {
                            console.log('resize');
                        }
                    }
                };

            case 'radar':
                return {
                    type: 'radar',
                    data: {
                        labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
                        datasets: [
                            {
                                label: "My First dataset",
                                backgroundColor: "rgba(179,181,198,0.2)",
                                borderColor: "rgba(179,181,198,1)",
                                pointBackgroundColor: "rgba(179,181,198,1)",
                                pointBorderColor: "#fff",
                                pointHoverBackgroundColor: "#fff",
                                pointHoverBorderColor: "rgba(179,181,198,1)",
                                data: [65, 59, 90, 81, 56, 55, 40]
                            },
                            {
                                label: "My Second dataset",
                                backgroundColor: "rgba(255,99,132,0.2)",
                                borderColor: "rgba(255,99,132,1)",
                                pointBackgroundColor: "rgba(255,99,132,1)",
                                pointBorderColor: "#fff",
                                pointHoverBackgroundColor: "#fff",
                                pointHoverBorderColor: "rgba(255,99,132,1)",
                                data: [28, 48, 40, 19, 96, 27, 100]
                            }
                        ]
                    },
                    options: {
                        segmentShowStroke: false,
                        percentageInnerCutout : 30,
                        responsive: true,
                        maintainAspectRatio: false,
                        scaleShowLabels: false,
                        legend: {
                            display: false
                        }
                    }
                };

            case 'polarArea':
                return {
                    type: 'polarArea',
                    data: {
                        datasets: [{
                            data: [
                                11,
                                16,
                                7,
                                3,
                                14
                            ],
                            backgroundColor: [
                                "#FF6384",
                                "#4BC0C0",
                                "#FFCE56",
                                "#E7E9ED",
                                "#36A2EB"
                            ],
                            label: 'My dataset' // for legend
                        }],
                        labels: [
                            "Red",
                            "Green",
                            "Yellow",
                            "Grey",
                            "Blue"
                        ]
                    },
                    options: {
                        segmentShowStroke: false,
                        percentageInnerCutout : 30,
                        responsive: true,
                        maintainAspectRatio: false,
                        scaleShowLabels: false,
                        legend: {
                            display: false
                        }
                    }
                };

            case 'bubble':
                return {
                    type: 'bubble',
                    data: {
                        datasets: [{
                            label: 'First Dataset',
                            data: [
                                {
                                    x: 20,
                                    y: 30,
                                    r: 15
                                },
                                {
                                    x: 40,
                                    y: 10,
                                    r: 10
                                }
                            ],
                            backgroundColor:"#FF6384",
                            hoverBackgroundColor: "#FF6384",
                        }]
                    },
                    options: {
                        segmentShowStroke: false,
                        percentageInnerCutout : 30,
                        responsive: true,
                        maintainAspectRatio: false,
                        scaleShowLabels: false
                    }
                };
        }

        return null;
    }
}
