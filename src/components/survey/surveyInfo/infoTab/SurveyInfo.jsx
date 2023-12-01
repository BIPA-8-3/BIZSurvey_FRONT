import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import * as React from "react";
import { useState } from "react";
import style from "../../../../style/survey/SurveyInfo.module.css";
import QuestionInfo from "./QuestionInfo";
import SurveyTitle from "../SurveyTitle";

export default function SurveyInfo() {
  const [formData, setFormData] = useState({
    surveyId: 0,
    title: "설문지 제목!!!!!",
    content: "설명!!!!!!!!!!!!!1",
    surveyType: "기본",
    questions: [],
  });

  const [questions, setQuestions] = useState([
    {
      questionId: 1,
      surveyQuestion: "제목1",
      answerType: "객관식(택1)",
      score: 0,
      step: 1,
      isRequired: false,
      answers: [
        {
          answerId: 1,
          surveyAnswer: "이건옵션111111",
          step: 1,
          correct: null,
        },
        {
          answerId: 2,
          surveyAnswer: "이건옵션2222",
          step: 2,
          correct: null,
        },
        {
          answerId: 3,
          surveyAnswer: "이건옵션333333",
          step: 3,
          correct: null,
        },
      ],
    },
    {
      questionId: 2,
      surveyQuestion: "질문2222222222222",
      answerType: "주관식",
      score: 0,
      step: 2,
      isRequired: true,
      answers: [],
    },
  ]);

  return (
    <>
      <div className={style.container}>
        {/* 버튼들  */}

        <div className={style.wrapButton}>
          <div></div>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Button variant="text">삭제</Button>
            <Button variant="contained">업로드</Button>
            <Button variant="outlined">수정</Button>
          </Stack>
        </div>

        {/* 설문지 제목  */}
        <SurveyTitle title={formData.title} content={formData.content} />

        <div>
          {questions.map((question) => (
            <QuestionInfo key={question.questionId} info={question} />
          ))}
        </div>
      </div>
    </>
  );
}
