import React, { useState, useEffect } from "react";
import ECharts from "echarts-for-react";

export default function MobileChart({ chartData }) {
  const [options, setOptions] = useState({
    title: {
      text: "투표결과",
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "vertical",
      left: "right",
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: "60%",
        data: [],
        emphasis: {
          itemStyle: {
            shadowBlur: 0,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  });

  useEffect(() => {
    const data = processData(chartData);
    setOptions((prevOptions) => ({
      ...prevOptions,
      series: [
        {
          ...prevOptions.series[0],
          data: data.seriesData,
        },
      ],
    }));
  }, [chartData]);

  return <ECharts option={options} />;
}

function processData(data) {
  const legendData = data.map((item) => {
    return {
      name:
        item.name.length > 20 ? item.name.slice(0, 20) + "..." : item.name,
    };
  });

  const seriesData = data.map((item) => {
    return {
      ...item,
      name:
        item.name.length > 20 ? item.name.slice(0, 20) + "..." : item.name,
    };
  });
  return { legendData, seriesData };
}
