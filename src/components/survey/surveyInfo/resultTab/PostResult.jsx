import style from "../../../../style/survey/PostResult.module.css";
import * as React from "react";
import { useState } from "react";
import OptionBox from "./totalOptions/OptionBox";
import TextList from "./totalOptions/TextList";
import QuestionBox from "../QuestionBox";
import QuestionTitle from "../QuestionTitle";
import Chart from "../../../common/Chart";
import FileList from "./totalOptions/FileList";

export default function PostResult() {
  // 객관식 데이터
  const chartData = [
    {
      value: "43",
      name: "옵션1",
    },
    {
      value: "53",
      name: "옵션12",
    },
    {
      value: "123",
      name: "옵션134",
    },
    {
      value: "34",
      name: "옵션1234",
    },
  ];

  // 주관식 데이터
  const texts = ["data1", "data2", "data3", "data4", "data5"];

  // 파일 데이터
  const files = [
    {
      name: "파일명1",
      url: "http://.............",
    },
    {
      name: "파일명1",
      url: "http://.............",
    },
    {
      name: "파일명1",
      url: "http://.............",
    },
    {
      name: "파일명1",
      url: "http://.............",
    },
    {
      name: "파일명1",
      url: "http://.............",
    },
    {
      name: "파일명1",
      url: "http://.............",
    },
  ];

  return (
    <>
      <QuestionBox>
        <QuestionTitle title={"주관식, 날짜"} />
        <OptionBox>
          <TextList values={texts}></TextList>
        </OptionBox>
      </QuestionBox>

      <QuestionBox>
        <QuestionTitle title={"객관식"} />
        <OptionBox>
          <Chart chartData={chartData}></Chart>
        </OptionBox>
      </QuestionBox>

      <QuestionBox>
        <QuestionTitle title={"파일"} />
        <OptionBox>
          <FileList files={files}></FileList>
        </OptionBox>
      </QuestionBox>
    </>
  );
}
