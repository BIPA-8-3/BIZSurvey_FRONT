import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import * as React from "react";
import { useState, useEffect } from "react";
import style from "../../../../style/survey/SurveyInfo.module.css";
import QuestionInfo from "./QuestionInfo";
import ScoreQuestionInfo from "./ScoreQuestionInfo";
import SurveyTitle from "../SurveyTitle";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { SurveyContext } from "../../../../pages/survey/SurveyInfoPage";
import { call } from "../../../../pages/survey/Login";

export default function SurveyInfo() {
  const { survey } = useContext(SurveyContext);
  const navigate = useNavigate();

  const { surveyId, title, content, surveyType, questions } = survey;

  const handleDeleteSurvey = () => {
    const response = window.confirm("설문지를 삭제하시겠습니까?");
    if (response) {
      call("/survey/" + surveyId, "DELETE").then((data) => {
        console.log(data);
        alert(data);
        navigate("/workspace");
      });
    }
  };

  return (
    <>
      <div className={style.container}>
        {/* 버튼들  */}

        <div className={style.wrapButton}>
          <div></div>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#243579",
                height: "36.99px",
              }}
            >
              업로드
            </Button>
            {surveyType === "NORMAL" ? (
              <Link to={"/editSurvey"} state={{ surveyId: surveyId }}>
                <Button variant="outlined" sx={{ color: "#243579", borderColor: "#243579" }}>
                  수정
                </Button>
              </Link>
            ) : (
              <Link to={"/editScoreSurvey"} state={{ surveyId: surveyId }}>
                <Button variant="outlined" sx={{ color: "#243579", borderColor: "#243579" }}>
                  수정
                </Button>
              </Link>
            )}
            <Button
              variant="outlined"
              onClick={handleDeleteSurvey}
              sx={{ color: "#243579", borderColor: "#243579" }}
            >
              삭제
            </Button>
          </Stack>
        </div>

        {/* 설문지 제목  */}
        <SurveyTitle title={title} content={content} />

        {/* <div>
          {questions.map((question, index) => (
            <QuestionInfo key={index} info={question} />
          ))}
        </div> */}

        {surveyType === "SCORE" ? (
          <div>
            {/* ScoreQuestionInfo 렌더링 */}
            {questions.map((question, index) => (
              <ScoreQuestionInfo key={index} info={question} />
            ))}
          </div>
        ) : (
          <div>
            {/* QuestionInfo 렌더링 */}
            {questions.map((question, index) => (
              <QuestionInfo key={index} info={question} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
