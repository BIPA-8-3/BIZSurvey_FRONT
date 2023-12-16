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
import { getSharedSurveyResult } from "../../../../pages/workspace/api";

export default function PostResult({ sharedType, sharedId }) {
  const { survey } = useContext(SurveyContext);

  // get data
  const [result, setResult] = useState({
    chartAndTextResults: [
      {
        questionId: 0,
        title: "",
        questionType: "",
        answers: [
          {
            answer: "",
            count: 0,
          },
        ],
      },
    ],
    fileResults: [
      {
        questionId: 0,
        title: "",
        questionType: "",
        fileInfos: [
          {
            filename: "",
            url: "",
          },
        ],
      },
    ],
  });

  const [processed, setProcessed] = useState([]);

  useEffect(() => {
    if (sharedId) {
      handleGetData();
    }
  }, [sharedId]);

  useEffect(() => {
    handleProcessData();
    console.log(result);
  }, [result]);

  useEffect(() => {
    console.log("processed", processed);
  }, [processed]);

  const handleGetData = async () => {
    // 데이터 받아오는 곳
    switch (sharedType) {
      case "INTERNAL":
        call("/survey/result/" + sharedId, "GET")
          .then((data) => {
            setResult(data);
          })
          .catch((error) => {
            console.log(error);
          });
        break;
      case "EXTERNAL":
        getSharedSurveyResult(sharedId)
          .then((data) => {
            setResult(data);
          })
          .catch((error) => {
            console.log(error);
          });
        break;
    }
  };

  const handleProcessData = () => {
    const processedData = [];

    // 차트, 텍스트 가공
    result.chartAndTextResults.forEach((data) => {
      const chartResult = {
        questionId: data.questionId,
        type: data.questionType,
        title: data.title,
        data: [],
      };
      if (data.questionType === "SINGLE_CHOICE" || data.questionType === "MULTIPLE_CHOICE") {
        chartResult.data = handleChartData(data.answers);
      } else {
        chartResult.data = handleTextData(data.answers);
      }
      processedData.push(chartResult);
    });

    result.fileResults.forEach((data) => {
      const fileResult = {
        questionId: data.questionId,
        type: data.questionType,
        title: data.title,
        data: data.fileInfos,
      };
      processedData.push(fileResult);
    });

    setProcessed(processedData);

    // 데이터 확인을 여기서 해도 됨
    console.log("processed", processedData);
  };

  const handleChartData = (answers) => {
    const chartArr = [];

    answers.forEach((answer) => {
      const data = {
        value: answer.count,
        name: answer.answer,
      };
      chartArr.push(data);
      console.log("chart:", data);
    });
    console.log("result", chartArr);
    return chartArr;
  };

  const handleTextData = (answers) => {
    // 주관식 , 날짜 가공
    const textArr = [];
    answers.forEach((answer) => {
      const { answer: text, count } = answer;
      textArr.push(...Array.from({ length: count }, () => text));
    });
    console.log(textArr);
    return textArr;
  };

  if (sharedId === "0") {
    return (
      <>
        <div
          style={{
            width: "700px",
            margin: "0 auto",
            textAlign: "center",
            height: "300px",
            justifyContent: "center",
            alignItems: "center",
            lineHeight: "300px",
            fontSize: "15pt",
            fontStyle: "italic",
            color: "#d6d6d6",
          }}
        >
          <p>게시물을 선택해주세요.</p>
        </div>
      </>
    );
  }

  return (
    <>
      {survey.questions.map((question, index) => {
        const matchingQuestion = processed.find((pro) => pro.questionId === question.questionId);

        return (
          <QuestionBox key={index}>
            <QuestionTitle title={question.surveyQuestion} />
            <OptionBox>
              {matchingQuestion ? (
                <>
                  {(matchingQuestion.type === "SINGLE_CHOICE" ||
                    matchingQuestion.type === "MULTIPLE_CHOICE") && (
                    <Chart chartData={matchingQuestion.data} />
                  )}
                  {(matchingQuestion.type === "TEXT" || matchingQuestion.type === "CALENDAR") && (
                    <TextList values={matchingQuestion.data} />
                  )}
                  {matchingQuestion.type === "FILE" && (
                    <FileList
                      files={matchingQuestion.data}
                      surveyId={survey.surveyId}
                      questionId={question.questionId}
                    />
                  )}
                </>
              ) : (
                <>
                  <p style={{ fontSize: "14px", paddingTop: "10px" }}>
                    질문에 대한 응답이 없습니다.
                  </p>
                </>
              )}
            </OptionBox>
          </QuestionBox>
        );
      })}
    </>
  );
}
