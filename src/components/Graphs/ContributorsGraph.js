import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const ContributorsGraph = ({ data }) => {
    // Check if data is empty or null
    if (!data || !Array.isArray(data) || data.length === 0) {
        return <div>No data available</div>;
    }

    // Extract contributors from data
    const contributors = [...new Set(data.flatMap(entry => entry.contributors))];

    // Prepare series data for each contributor
    const seriesData = contributors.map(contributor => ({
        name: contributor,
        data: data
            .filter(entry => entry.contributors && entry.contributors.includes(contributor))
            .map(entry => ({
                x: new Date(entry.week * 1000).getTime(),
                y: entry.total
            }))
    }));

    const options = {
        chart: {
            type: 'spline'
        },
        title: {
            text: 'Contributor Changes'
        },
        xAxis: {
            type: 'datetime',
            labels: {
                rotation: -45,
                style: {
                    fontSize: '13px',
                    fontFamily: 'Arial, sans-serif'
                }
            },
            title: {
                text: 'Week'
            }
        },
        yAxis: {
            title: {
                text: 'Total Changes'
            }
        },
        tooltip: {
            formatter: function() {
                return `<b>${new Date(this.x).toLocaleDateString()}</b><br/>Total Changes: ${this.y}<br/>Contributor: ${this.series.name}`;
            }
        },
        plotOptions: {
            series: {
                marker: {
                    enabled: true
                }
            }
        },
        series: seriesData
    };

    return (
        <HighchartsReact highcharts={Highcharts} options={options} />
    );
};

export default ContributorsGraph;
