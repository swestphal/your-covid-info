import React, { useState, useEffect } from 'react'
import { Line } from "react-chartjs-2";
import numeral from "numeral";
const casesTypes = [{ name: 'cases', color: 'red' }, { name: 'deaths', color: 'blue' }, { name: 'recovered', color: 'green' }]

const options = {
    title: {
        display: true,
        text: 'Reports',
        fontSize: 24,
        fontColor: 'rgb(32, 182, 219)'
    },
    elements: {
        point: {
            radius: 0,
        },
    },
    layout: {
        padding: {
            left: 50,
            right: 50,
            top: 20,
            bottom: 20
        }
    },
    legend: {
        display: true,
        labels: {
            fontColor: 'rgb(255, 99, 132)',
            fontSize: 16,
            boxWidth: 20
        }
    },

    responsive: true,



    tooltips: {
        mode: "index",
        intersect: false,
        callbacks: {
            label: function (tooltipItem, data) {
                return numeral(tooltipItem.value).format("+0,0");

            },
        },
        backgroundColor: "#102A44"

    },
    scales: {
        xAxes: [
            {
                scaleLabel: {
                    display: true,
                    labelString: 'Date',
                    fontSize: 24,
                    fontColor: 'rgb(255, 99, 132)',

                },
                stacked: true,
                type: "time",
                time: {
                    parser: 'MM/DD/YY',
                    unit: 'month',
                    displayFormats: {
                        month: 'MMM YYYY'
                    },

                },
                /*time: {
                    format: "MM/DD/YY",
                    tooltipFormat: "ll",
                },*/
                ticks: {
                    fontColor: 'rgb(32, 182, 219)',
                    fontSize: 14,
                    autoSkip: true,
                    maxTicksLimit: 20,
                    maxRotation: 45,
                    minRotation: 45
                }

            },
        ],
        yAxes: [
            {

                gridLines: {
                    display: false,
                },
                ticks: {
                    fontColor: 'rgb(32, 182, 219)',
                    fontSize: 14,
                    callback: function (value, index, values) {
                        return numeral(value).format("0a");
                        //return (value.toLocaleString());
                    },
                },
                scaleLabel: {
                    display: true,
                    labelString: 'Cases in Million',
                    fontSize: 20,
                    fontColor: 'rgb(255, 99, 132)',

                },
            },
        ],
    },
};

const buildChartData = (data) => {
    let labels = [];
    let type = [];
    let chartData = [];
    let first = true;

    casesTypes.map((caseType) => {

        let lastDataPoint;
        let i = 0;
        for (let date in data[caseType.name]) {
            if (!(i % 7)) {

                // veränderungen pro Woche  -> lastDataPoint
                if (lastDataPoint) {
                    let newDataPoint = {
                        counts: data[caseType.name][date] - lastDataPoint,
                    };
                    if (newDataPoint.counts >= 0) { type.push(newDataPoint.counts) } else {
                        //negative value -> not possible
                        type.push(newDataPoint.counts * (-1))
                    }
                    if (first === true) {
                        let newLabelPoint = {
                            label: date
                        }
                        labels.push(newLabelPoint.label);

                    }
                }
                lastDataPoint = data[caseType.name][date];
            }
            i++
        }
        chartData[caseType.name] = type;
        type = [];
        first = false
    })

    return { ...chartData, labels: labels };
};

const Graph = (props) => {
    const { width, height } = props;

    const [data, setData] = useState({});
    useEffect(() => {
        const fetchData = async () => {
            await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=500")
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    let chartData = buildChartData(data);

                    setData(chartData);
                });
        };
        fetchData();
    }, []);

    const chartData = (canvas) => {
        const ctx = canvas.getContext("2d")

        const gradientDeaths = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
        gradientDeaths.addColorStop(0, "rgba(0, 0, 8,0.8)");
        gradientDeaths.addColorStop(0.7, "rgba(5, 3, 32,0.8)");
        gradientDeaths.addColorStop(1, " rgba(17, 23, 82,0.8)");

        const gradientRecovered = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
        gradientRecovered.addColorStop(0, "rgba(75, 119, 93,.8)");
        gradientRecovered.addColorStop(0.5, "rgba(133, 190, 135,.8)");
        gradientRecovered.addColorStop(1, "rgba(174, 204, 142,.8)");

        const gradientCases = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
        gradientCases.addColorStop(0, "rgba(97, 73, 105,.8)");
        gradientCases.addColorStop(0.5, "rgba(160, 35, 103,.8)");
        gradientCases.addColorStop(1, "rgba(230, 60, 97,.8)");



        return {
            labels: data.labels,
            datasets: [

                {
                    label: 'Deaths',
                    data: data.deaths,
                    borderWidth: 1,
                    fill: true,
                    backgroundColor: gradientDeaths,
                    borderColor: "#092B36"
                },
                {
                    label: 'Recovered',
                    data: data.recovered,
                    borderWidth: 1,
                    fill: true,
                    backgroundColor: gradientRecovered,
                    borderColor: "#859900"
                }, {
                    label: 'Cases',

                    data: data.cases,
                    borderWidth: 1,
                    fill: true,
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "#ff6c23",
                    backgroundColor: gradientCases,
                    borderColor: "#6C71C4"
                },
            ],
        }
    }

    return (
        <div className="graph box">
            {data !== null && typeof data === 'object' && (
                <Line
                    data={chartData}
                    options={options}
                />
            )}
        </div>
    )
}



export default Graph
