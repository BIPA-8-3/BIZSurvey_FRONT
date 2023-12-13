import React, { useState } from "react";

import ECharts from "echarts-for-react";

export default function BarChart({ chartData }) {
  // chartData : [{answer:'',count:0,correct:''}, ...]

  const { name, value } = processData(chartData);

  const [options, setOptions] = useState({
    xAxis: {
      type: "value",
    },
    yAxis: {
      type: "category",
      //   data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      data: name,
    },
    series: [
      {
        data: value,
        // data: [
        //   120,
        //   {
        //     value: 200,
        //     itemStyle: {
        //       color: '#a90000'
        //     }
        //   },
        //   150,
        //   80,
        //   70,
        //   110,
        //   130
        // ],
        label: {
          show: true,
          position: "right",
          valueAnimation: true,
        },
        type: "bar",
      },
    ],
  });

  return (
    <>
      <ECharts
        option={options}
        opts={{ renderer: "svg", width: "600px", height: "300px" }}
      />
    </>
  );
}

function processData(answers) {
  const name = answers.map((answer) => answer.answer);
  console.log(name);

  const value = answers.map((answer) => ({
    value: answer.count,
    itemStyle: {
      color: answer.correct === "YES" ? "#aacbfa" : "#d6d6d6",
    },
  }));
  console.log(value);
  return { name, value };
}
