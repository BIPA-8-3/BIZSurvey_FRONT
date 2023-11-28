import TextField from "@mui/material/TextField";
import * as React from "react";
import { useState } from "react";
import QuestionInfo from "./QuestionInfo";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

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
      <div style={{ width: "700px", margin: "0 auto" }}>
        {/* 버튼들  */}

        <div
          style={{
            display: "flex",
            borderRadius: "10px 10px 0 0",
            justifyContent: "space-between",
            textAlign: "right",
            margin: "30px 0 30px 0",
          }}
        >
          <div></div>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Button variant="text">삭제</Button>
            <Button variant="contained">업로드</Button>
            <Button variant="outlined">수정</Button>
          </Stack>
        </div>

        {/* 설문지 제목  */}
        <div
          style={{
            width: "700px",
            borderRadius: "10px",
            minHeight: "120px",
            border: "1px solid #D6D6D6",
            paddingTop: "20px",
            borderTop: "10px solid #243579",
            margin: "0 auto",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            paddingBottom: "25px",
            marginBottom: "25px",
          }}
        >
          <p
            style={{
              width: "600px",
              fontSize: "25px",
              fontWeight: "bold",
              margin: "0 auto",
              paddingTop: "30px",
            }}
          >
            {formData.title}
          </p>
          <p
            style={{
              width: "600px",
              fontSize: "14px",
              margin: "0 auto",
              paddingTop: "15px",
            }}
          >
            {formData.content}
          </p>
        </div>

        <div>
          {questions.map((question) => (
            <QuestionInfo key={question.questionId} info={question} />
          ))}
        </div>
      </div>
    </>
  );
}
