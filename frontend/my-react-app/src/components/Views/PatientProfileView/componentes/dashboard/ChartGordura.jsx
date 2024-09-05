import React from 'react';
import ReactApexChart from 'react-apexcharts';

class BodyFatChart extends React.Component {
  constructor(props) {
    super(props);

    // Inicialmente, o estado é definido com uma estrutura de dados vazia
    this.state = {
      series: [{ name: 'Gordura Corporal', data: [] }],
      options: {
        chart: { type: 'line' },
        dataLabels: { enabled: false },
        xaxis: { categories: [], labels: { style: { fontSize: '12px' } } },
        colors: ['#FF0000'],
        responsive: [
          { breakpoint: 1000, options: { chart: { width: '100%' } } },
        ],
      },
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.historyData !== this.props.historyData) {
      
      const historyData = Array.isArray(this.props.historyData)
        ? this.props.historyData
        : [];
      const dates = historyData.map((entry) =>
        new Date(entry.data_registro).toLocaleDateString(),
      );
      const bodyFats = historyData.map((entry) => entry.gordura_corporal);

      this.setState({
        series: [{ name: 'Gordura Corporal', data: bodyFats }],
        options: { ...this.state.options, xaxis: { categories: dates } },
      });
    }
  }

  render() {
    return (
      <div style={{ width: '100%' }}>
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="line"
          height={350}
          width={550}
        />
      </div>
    );
  }
}

export default BodyFatChart;
