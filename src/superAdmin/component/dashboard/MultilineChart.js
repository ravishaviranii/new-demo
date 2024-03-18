import React, { useEffect, useState, useRef } from "react";
import Chart from "chart.js/auto";

const MultiLineChart = (props) => {
  const { chartdata } = props;
  const chartRef = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    if (chartdata) {

      const dates = chartdata.map(item => item.date);
      const loyalCustomersData = chartdata.map(item => item.loyalCustomers);
       const newCustomersData = chartdata.map(item => item.newCustomers);
      
      const data1 = {
        labels: dates,
        datasets: [
          {
            label: 'Loyal Customers',
            data: loyalCustomersData,
            fill: true,
            borderColor: '#02468B',
            backgroundColor: 'rgb(52,100,204,0.3)',
            tension: 0.1,
          },
          {
            label: 'New Customers',
            data: newCustomersData,
            fill: true,
            borderColor: '#dc3912',
            backgroundColor: 'rgb(219,60,20,0.3)',
            borderDash: [5, 5],

            tension: 0.1,
          },
        ],

      };
      // Destroy the previous chart if it exists
      if (chartInstance) {
        chartInstance.destroy();
      }

      // Create the chart
      const newChartInstance = new Chart(chartRef.current, {
        type: "line",
        data: data1,
      });
      setChartInstance(newChartInstance);
    }
  }, [chartdata]);

  return (
    <div className='multiline_chart trend_graph'>
      
      <canvas ref={chartRef} className="charts" />

    </div>
  );
};

export default MultiLineChart;
