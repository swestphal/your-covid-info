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
                    // Include a dollar sign in the ticks
                    callback: function (value, index, values) {
                        return numeral(value).format("0a");
                    },
                },
            },
        ],
    },
};

const buildChartData = (data) => {

    let cases = [];
    let deaths = [];
    let recovered = [];
    let labels = [];
    let charData = [];

    //casesTypes.map((caseType) => {
    let caseType = { name: 'cases' }
    let lastDataPoint;
    //})
    for (let date in data.cases) {
        if (lastDataPoint) {
            let newDataPoint = {
                counts: data[caseType.name][date] - lastDataPoint,
            };
            if (newDataPoint.counts >= 0) cases.push(newDataPoint.counts);
            let newLabelPoint = {
                label: date
            }
            labels.push(newLabelPoint.label);
        }
        lastDataPoint = data[caseType.name][date];
    }

    let set = { labels: labels, cases: cases }

    return set;
};

const Graph = () => {
    const [data, setData] = useState({});
    useEffect(() => {
        const fetchData = async () => {
            await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
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
                                label: casesTypes.map(caseType => caseType),
                                data: data.cases,
                                borderWidth: 1,
                                fill: true,
                                backgroundColor: "rgba(75,192,192,0.2)",
                                borderColor: "rgba(75,192,192,1)"
                            },
                        ],
                    }}



                />
            )}
        </div>
    )
}



export default Graph
