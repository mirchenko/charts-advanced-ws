import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import StationError from './StationError';


export default ({ name, points, enabled, error }) => {
  const status = enabled ? 'online' : 'offline';

  const chartData = {
    labels: new Array(100),
    datasets: [
      {
        label: name,
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: '#FF7043',
        borderCapStyle: 'butt',
        borderWidth: .4,
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: '#AB47BC',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 3,
        pointHoverBackgroundColor: '#AB47BC',
        pointHoverBorderColor: '#AB47BC',
        pointHoverBorderWidth: 1,
        pointRadius: 1,
        pointHitRadius: 10,
        data: points
      }
    ]
  };

  const options = {
    animation: {
      duration: .1
    },
    legend: {
      display: false
    },
    scales: {
      yAxes: [ {
        gridLines: {
          color: 'rgba(103,58,183,.2)',
          lineWidth: 1,

        },
        ticks: {
          fontColor: "rgba(156,39,176,.5)",
          suggestedMin: -100,
          suggestedMax: 100
        }
      } ]
    }
  };

  return (
    <div className="station">
      <div className="station-header">
        <h2>{name}</h2>
        <span className={status}>{status}</span>
      </div>
      <div className="station-body">
        {error && <StationError/>}
        <Line data={chartData} options={options} width={600} height={250}/>
      </div>
    </div>
  );

}