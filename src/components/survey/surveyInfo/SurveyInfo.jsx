import TextField from "@mui/material/TextField";
import * as React from "react";
import { useState } from "react";
import QuestionInfo from "./QuestionInfo";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import style from "../../../style/survey/SurveyInfo.module.css";

import BizModal from "../../common/BizModal";

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

  const [openmodal, setOpenmodal] = useState(false);
  const handleOpenModal = () => setOpenmodal(true);
  const handleCloseModal = () => setOpenmodal(false);

  return (
    <>
      <div className={style.container}>
        {/* 버튼들  */}

        <div className={style.wrapButton}>
          <div></div>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Button variant="text" onClick={handleOpenModal}>
              삭제
            </Button>
            <Button variant="contained">업로드</Button>
            <Button variant="outlined">수정</Button>
          </Stack>
        </div>

        <BizModal
          isOpen={openmodal}
          handleClose={handleCloseModal}
          title={"wpahfalsf"}
        >
          <p style={{ width: "500px", height: "400px" }}>
            as;fljaksldfjasdfdsa
          </p>
        </BizModal>

        {/* 설문지 제목  */}
        <div className={style.wrapSurveyInfo}>
          <p className={style.wrapTitle}>{formData.title}</p>
          <p className={style.wrapContent}>{formData.content}</p>
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
