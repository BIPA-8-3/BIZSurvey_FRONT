import * as React from "react";
import { useState } from "react";
import { IoMdDownload } from "react-icons/io";
import QuestionBox from "../QuestionBox";
import QuestionTitle from "../QuestionTitle";
import OptionBox from "./totalOptions/OptionBox";
import Button from "@mui/material/Button";
import { useEffect } from "react";
import call, { getURI } from "../../../../pages/workspace/api";
import { useContext } from "react";
import { SurveyContext } from "../../../../pages/survey/SurveyInfoPage";
import { getSharedSurveyScoreResult } from "../../../../pages/workspace/api";
import BarChart from "../../../common/BarChart";

export default function ScorePostResult({ sharedId, sharedType }) {
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
    if (sharedId) {
      handleGetData();
    }
  }, [sharedId]);

  useEffect(() => {
    console.log("여기: ", result);
  }, [result]);

  const handleGetData = async () => {
    // 데이터 받아오는 곳
    switch (sharedType) {
      case "INTERNAL":
        call("/survey/result/score/" + sharedId, "GET")
          .then((data) => {
            setResult(data);
          })
          .catch((error) => {
            console.log(error);
          });
        break;
      case "EXTERNAL":
        console.log(survey.surveyId);
        getSharedSurveyScoreResult(survey.surveyId, sharedId)
          .then((data) => {
            console.log("asdf", data);
            setResult(data);
          })
          .catch((error) => {
            console.log(error);
          });
        break;
    }
  };

  if (sharedId === 0) {
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
      <div
        style={{
          width: "700px",
          margin: "0 auto",
          textAlign: "right",
          marginBottom: "3px",
        }}
      >
        <a
          href={getURI() + "/survey/result/file/" + sharedType + "/" + sharedId}
        >
          <Button
            // onClick={handleDownloadExcel}
            variant="text"
            startIcon={<IoMdDownload />}
            sx={[
              {
                color: "#0171d1",
              },
              {
                ":hover": {
                  backgroundColor: "#f5fbff",
                },
              },
            ]}
          >
            엑셀 다운받기
          </Button>
        </a>
      </div>
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
