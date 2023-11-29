import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";

import ECharts, { EChartsReactProps } from "echarts-for-react";

export default function Chart({ chartData }) {
  // chartData : [{value : '개수', name: '옵션명'},{value : '개수', name: '옵션명'},... ]

  const data = processData(chartData);

  const [options, setOptions] = useState({
    tooltip: {
      trigger: "item",
    },
    legend: {
      type: "scroll",
      orient: "vertical",
      right: "50px",
      top: 40,
      bottom: 20,
      data: data.legendData,
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
        data: data.seriesData,
      },
    ],
  });

  return (
    <>
      <ECharts
        option={options}
        opts={{ renderer: "svg", width: "550px", height: "240px" }}
      />
    </>
  );
}

function processData(data) {
  const legendData = data.map((item) => {
    return {
      name: item.name.length > 20 ? item.name.slice(0, 20) + "..." : item.name,
    };
  });

  const seriesData = data.map((item) => {
    return {
      ...item,
      name: item.name.length > 20 ? item.name.slice(0, 20) + "..." : item.name,
    };
  });
  return { legendData, seriesData };
}
