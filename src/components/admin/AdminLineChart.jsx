import React, { useState } from "react";

import ECharts from "echarts-for-react";

export default function AdminLineChart({ chartData }) {
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
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type: 'line'
        }
      ]
  });

  return (
    <>
      <ECharts
        option={options}
      />
    </>
  );
}


