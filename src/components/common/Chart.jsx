import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";

import ECharts, { EChartsReactProps } from "echarts-for-react";

export default function Chart({ chartData }) {
  // chartData : [{value : '개수', name: '옵션명'},{value : '개수', name: '옵션명'},... ]

  const [options, setOptions] = useState({
    tooltip: {
      trigger: "item",
    },
    legend: {
      type: "scroll",
      orient: "vertical",
      
      top: 40,
      bottom: 20,
    },
    series: [
      {
        type: "pie",
        radius: ["50px", "100px"],
        avoidLabelOverlap: false,
        center: ["20%", "50%"],
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
          label: {
            show: false,
            fontSize: 15,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: chartData,
      },
    ],
  });

  return (
    <>
      <ECharts
        option={options}
        opts={{ renderer: "svg", width: "600px", height: "240px" }}
      />
    </>
  );
}
