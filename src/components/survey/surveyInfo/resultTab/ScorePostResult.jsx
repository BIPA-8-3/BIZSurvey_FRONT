import style from "../../../../style/survey/PostResult.module.css";
import * as React from "react";
import { useState } from "react";
import OptionBox from "./totalOptions/OptionBox";
import TextList from "./totalOptions/TextList";
import QuestionBox from "../QuestionBox";
import QuestionTitle from "../QuestionTitle";
import Chart from "../../../common/Chart";
import FileList from "./totalOptions/FileList";
import { call } from "../../../../pages/survey/Login";
import { useEffect } from "react";
import { useContext } from "react";
import { SurveyContext } from "../../../../pages/survey/SurveyInfoPage";
import SurveyQuestion from "../../../surveyCommunity/survey/SurveyQuestion";
import BarChart from "../../../common/BarChart";

export default function ScorePostResult({ postId }) {
  const { survey } = useContext(SurveyContext);

  //   const [survey, setSurvey] = useState({
  //     surveyId: 0,
  //     title: "",
  //     content: "",
  //     surveyType: "",
  // questions: [
  //   {
  //     questionId: 0,
  //     surveyQuestion: "",
  //     answerType: "",
  //     score: 0,
  //     step: 0,
  //     isRequired: false,
  //     answers: [],
  //   },
  // ],
  //   });

  // get data
  const [result, setResult] = useState([
    // {
    //   questionId: 0,
    //   title: "",
    //   answers: [
    //     {
    //       answer: "1",
    //       count: 0,
    //       correct: "",
    //     },
    //   ],
    // },
  ]);

  useEffect(() => {
    if (postId !== "0") {
      handleGetData();
    }
  }, [postId]);

  useEffect(() => {
    console.log(result);
  }, [result]);

  const handleGetData = async () => {
    // 데이터 받아오는 곳
    call("/survey/result/score/" + postId, "GET")
      .then((data) => {
        setResult(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (postId === "0") {
    return (
      <>
        <p>게시물을 선택해주세요</p>
      </>
    );
  }

  return (
    <>
      {result.map((question, index) => {
        return (
          <QuestionBox key={index} score>
            <QuestionTitle title={question.title} />
            <OptionBox>
              <BarChart chartData={question.answers} />
            </OptionBox>
          </QuestionBox>
        );
      })}
    </>
  );
}
