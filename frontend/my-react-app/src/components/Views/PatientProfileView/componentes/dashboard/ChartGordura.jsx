import React from 'react';
import ReactApexChart from 'react-apexcharts';

class FatLossChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [{
        name: 'Perda de Gordura',
        data: [2, 4, 3, 2, 3, 4, 2, 1, 2, 3]
      }],
      options: {
        chart: {
          type: 'line',
          events: {
            click: function(chart, w, e) {
              // console.log(chart, w, e)
            }
          }
        },
        plotOptions: {
          bar: {
            columnWidth: '70%', // Define a largura das barras
            distributed: true,
            barHeight: '100%'
          }
        },
        dataLabels: {
          enabled: false
        },
        legend: {
          show: false
        },
        xaxis: {
          categories: [
            'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out'
          ],
          labels: {
            style: {
              fontSize: '12px'
            }
          }
        },
        colors: ['#FC5555'], // Vermelho
        responsive: [{
          breakpoint: 1000,
          options: {
            chart: {
              width: '100%'
            }
          }
        }]
      },
    };
  }

  render() {
    return (
      <div style={{ width: '100%' }}>
        <ReactApexChart options={this.state.options} series={this.state.series} type="line" height={350} width={550}/>
      </div>
    );
  }
}

export default FatLossChart;
