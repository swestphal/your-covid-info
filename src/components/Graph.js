import React, { useState, useEffect } from 'react'
import { Line } from "react-chartjs-2";
import numeral from "numeral";
const casesTypes = [{ name: 'cases', color: 'red' }, { name: 'deaths', color: 'blue' }, { name: 'recovered', color: 'green' }]

const options = {

    elements: {
        point: {
            radius: 0,
        },
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
        mode: "index",
        intersect: false,
        callbacks: {
            label: function (tooltipItem, data) {
                return numeral(tooltipItem.value).format("+0,0");

            },
        },
    },
    scales: {
        xAxes: [
            {
                stacked: true,
                type: "time",
                time: {
                    format: "MM/DD/YY",
                    tooltipFormat: "ll",
                },
            },
        ],
        yAxes: [
            {

                gridLines: {
                    display: false,
                },
                ticks: {
                    callback: function (value, index, values) {
                        return numeral(value).format("0a");
                        //return (value.toLocaleString());
                    },
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


    let set = { labels: labels, cases: chartData.cases, deaths: chartData.deaths, recovered: chartData.recovered }
    return set;
};

const Graph = () => {
    const [data, setData] = useState({});
    useEffect(() => {
        const fetchData = async () => {
            await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=360")
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


    return (
        <div className="graph">
            {data !== null && typeof data === 'object' && (
                <Line
                    data={{
                        labels: data.labels,
                        datasets: [
                            {
                                label: 'Cases',
                                data: data.cases,
                                borderWidth: 1,
                                fill: true,
                                backgroundColor: "rgb(108 113 196 / 41%)",
                                borderColor: "#6C71C4"
                            },
                            {
                                label: 'Deaths',
                                data: data.deaths,
                                borderWidth: 1,
                                fill: true,
                                backgroundColor: "rgb(47 47 47 / 34%)",
                                borderColor: "#092B36"
                            },
                            {
                                label: 'Recovered',
                                data: data.recovered,
                                borderWidth: 1,
                                fill: true,
                                backgroundColor: "rgb(98 142 30 / 34%)",
                                borderColor: "#859900"
                            },
                        ],
                    }}



                />
            )}
        </div>
    )
}



export default Graph
