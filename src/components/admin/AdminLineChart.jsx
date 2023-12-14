import React, { useState, useEffect } from "react";

import ECharts from "echarts-for-react";

export default function AdminLineChart({ lineChartData }) {
  // chartData : [{value : '개수', name: '옵션명'},{value : '개수', name: '옵션명'},... ]


  const [options, setOptions] = useState({
    title: {
        text: '가입 통계',
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'right',
      },
      xAxis: {
        type: 'category',
        data: []
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [],
          type: 'line'
        }
      ]
  });

  useEffect(() => {
    // Transform the lineChartData into the format expected by ECharts
    const xAxisData = lineChartData.map(item => item.dayOfWeek);
    const seriesData = lineChartData.map(item => item.signupCount);

    // Update the options state with the transformed data
    setOptions(prevOptions => ({
      ...prevOptions,
      xAxis: {
        ...prevOptions.xAxis,
        data: xAxisData
      },
      series: [
        {
          ...prevOptions.series[0],
          data: seriesData
        }
      ]
    }));
  }, [lineChartData]);


  return (
    <>
      <ECharts
        option={options}
      />
    </>
  );
}


