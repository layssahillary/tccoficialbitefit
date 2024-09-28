import React from 'react';
import ReactApexChart from 'react-apexcharts';

class WeightChart extends React.Component {
  constructor(props) {
    super(props);

  
    this.state = {
      series: [{ name: 'Peso', data: [] }],
      options: {
        chart: { type: 'line' },
        dataLabels: { enabled: false },
        xaxis: { categories: [], labels: { style: { fontSize: '12px' } } },
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
        
     
      const sortedData = historyData.slice().sort((a, b) => new Date(a.data_registro) - new Date(b.data_registro));
      
      const dates = sortedData.map((entry) => new Date(entry.data_registro).toLocaleDateString());
      const weights = sortedData.map((entry) => entry.peso);

      this.setState({
        series: [{ name: 'Peso', data: weights }],
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

export default WeightChart;
