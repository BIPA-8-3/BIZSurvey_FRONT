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

export default function PostResult({ postId }) {
  const { survey } = useContext(SurveyContext);
  // 객관식 데이터
  // const chartData = [
  //   {
  //     value: "43",
  //     name: "옵션1",
  //   },
  //   {
  //     value: "53",
  //     name: "옵션12",
  //   },
  // ];

  // // 주관식 데이터
  // const texts = ["data1", "data2", "data3", "data4", "data5"];

  // // 파일 데이터
  // const files = [
  //   {
  //     name: "파일명1",
  //     url: "http://.............",
  //   },
  //   {
  //     name: "파일명1",
  //     url: "http://.............",
  //   },
  // ];

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
    if (postId !== "0") {
      handleGetData();
    }
  }, [postId]);

  useEffect(() => {
    handleProcessData();
    console.log(result);
  }, [result]);

  useEffect(() => {
    console.log("processed", processed);
  }, [processed]);

  const handleGetData = async () => {
    // 데이터 받아오는 곳
    call("/survey/result/" + postId, "GET")
      .then((data) => {
        setResult(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleProcessData = () => {
    const processedData = [];
    // get 데이터 가공

    // {
    //   questionId : 0,
    //   title :'',
    //   questionType : '',
    //   answers : [
    //     {
    //       answer: '',
    //       count: 0
    //     }
    //   ]
    // }

    // 차트, 텍스트 가공
    result.chartAndTextResults.forEach((data) => {
      const chartResult = {
        questionId: data.questionId,
        type: data.questionType,
        title: data.title,
        data: [],
      };
      if (
        data.questionType === "SINGLE_CHOICE" ||
        data.questionType === "MULTIPLE_CHOICE"
      ) {
        chartResult.data = handleChartData(data.answers);
      } else {
        chartResult.data = handleTextData(data.answers);
      }
      processedData.push(chartResult);
    });

    //파일 데이터 가공
    // {
    //   questionId: 0,
    //   title: "",
    //   questionType: "",
    //   fileInfos: [
    //     {
    //       filename: "",
    //       url: "",
    //     },
    //   ],
    // },

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
    //차트 데이터 가공
    //   answers : [
    //     {
    //       answer: '',
    //       count: 0
    //     }
    //   ]
    // 이렇게 변경
    // {
    //   value: "43",
    //   name: "옵션1",
    // },
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

  if (postId === "0") {
    return (
      <>
        <p>게시물을 선택해주세요</p>
      </>
    );
  }

  return (
    <>
      {survey.questions.map((question, index) => {
        const matchingQuestion = processed.find(
          (pro) => pro.questionId === question.questionId
        );

        return (
          <QuestionBox key={index}>
            <QuestionTitle title={question.surveyQuestion} />
            <OptionBox>
              {matchingQuestion ? (
                <>
                  {/* matchingQuestion이 존재할 때 수행할 내용 */}
                  {(matchingQuestion.type === "SINGLE_CHOICE" ||
                    matchingQuestion.type === "MULTIPLE_CHOICE") && (
                    <Chart chartData={matchingQuestion.data} />
                  )}
                  {(matchingQuestion.type === "TEXT" ||
                    matchingQuestion.type === "CALENDAR") && (
                    <TextList values={matchingQuestion.data} />
                  )}
                  {matchingQuestion.type === "FILE" && (
                    <FileList files={matchingQuestion.data} />
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
