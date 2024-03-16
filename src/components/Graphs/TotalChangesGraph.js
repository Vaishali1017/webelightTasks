import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const TotalChangesGraph = ({ data }) => {

    if (!data || !Array.isArray(data) || data.length === 0) {
        return <div>No data available</div>;
    }
    // Convert timestamps to human-readable format
    const formattedData = data.map(entry => ({
        name: new Date(entry.week * 1000).toLocaleDateString(),
        y: entry.total
    }));

    const options = {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Total Changes'
        },
        xAxis: {
            type: 'category',
            labels: {
                rotation: -45,
                style: {
                    fontSize: '13px',
                    fontFamily: 'Arial, sans-serif'
                }
            }
        },
        yAxis: {
            title: {
                text: 'Total Changes'
            }
        },
        tooltip: {
            formatter: function() {
                return `<b>${this.point.name}</b><br/>Total Changes: ${this.y}`;
            }
        },
        series: [{
            name: 'Week',
            colorByPoint: true,
            data: formattedData
        }]
    };

    return (
        <HighchartsReact highcharts={Highcharts} options={options} />
    );
};

export default TotalChangesGraph;
