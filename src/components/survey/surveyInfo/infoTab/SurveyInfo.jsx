import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import * as React from "react";
import { useState, useEffect } from "react";
import style from "../../../../style/survey/SurveyInfo.module.css";
import QuestionInfo from "./QuestionInfo";
import SurveyTitle from "../SurveyTitle";
import { Link } from "react-router-dom";

export default function SurveyInfo({ survey }) {
  const { surveyId, title, content, surveyType, questions } = survey;

  return (
    <>
      <div className={style.container}>
        {/* 버튼들  */}

        <div className={style.wrapButton}>
          <div></div>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Button variant="text">삭제</Button>
            <Button variant="contained">업로드</Button>
            <Link to={"/editSurvey"} state={{ surveyId: surveyId }}>
              <Button variant="outlined">수정</Button>
            </Link>
          </Stack>
        </div>

        {/* 설문지 제목  */}
        <SurveyTitle title={title} content={content} />

        <div>
          {questions.map((question) => (
            <QuestionInfo key={question.questionId} info={question} />
          ))}
        </div>
      </div>
    </>
  );
}
