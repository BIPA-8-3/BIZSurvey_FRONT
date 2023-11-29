import QuestionComp from "../../components/survey/surveyForm/QuestionComp";
import * as React from "react";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import style from "../../style/survey/CreatePage.module.css";

export default function CreateSurveyPage() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    surveyType: "기본",
    questions: [],
  });

  const [questions, setQuestions] = useState([
    {
      surveyQuestion: "",
      answerType: "",
      score: 0,
      step: 1,
      isRequired: false,
      answers: [],
    },
  ]);

  const changeQuestionTitle = (id, text) => {
    setQuestions((pre) => {
      const result = pre.map((question, index) =>
        question.step === id
          ? { ...question, surveyQuestion: text, step: index + 1 }
          : question
      );
      return result;
    });
  };

  const changeQuestionContent = (id, text) => {
    setQuestions((pre) => {
      const result = pre.map((question, index) =>
        question.step === id
          ? { ...question, content: text, step: index + 1 }
          : question
      );
      return result;
    });
  };

  const changeOption = (id, type) => {
    setQuestions((pre) => {
      const result = pre.map((question, index) =>
        question.step === id
          ? { ...question, answerType: type, step: index + 1 }
          : question
      );
      return result;
    });
  };

  const deleteQuestion = (id) => {
    setQuestions((pre) => {
      const result = pre
        .filter((question) => question.step !== id)
        .map((question, index) => ({ ...question, step: index + 1 }));
      return result;
    });
  };

  const addQuestion = () => {
    setQuestions((pre) => {
      const lastId = pre.length > 0 ? pre[pre.length - 1].step : 0;
      return [
        ...pre,
        {
          surveyQuestion: "",
          answerType: "",
          score: 0,
          step: lastId + 1,
          isRequired: false,
          answers: [],
        },
      ];
    });
  };

  const changeRequired = (id) => {
    setQuestions((pre) => {
      const result = pre.map((question, index) =>
        question.step === id
          ? { ...question, isRequired: !question.isRequired, step: index + 1 }
          : question
      );
      return result;
    });
  };

  const handleOption = (id, options) => {
    setQuestions((pre) => {
      const result = pre.map((question, index) =>
        question.step === id ? { ...question, answers: options } : question
      );
      return result;
    });
  };

  const changeSurveyTitle = (text) => {
    setFormData((pre) => ({ ...pre, title: text }));
  };

  const changeSurveyContent = (text) => {
    setFormData((pre) => ({ ...pre, content: text }));
  };

  return (
    <>
      <div className={style.container}>
        <div className={style.wrapContent}>
          <div className={style.wrapSurveyInfo}>
            <div className={style.surveyText}>
              <TextField
                id="standard-basic"
                variant="standard"
                placeholder={"설문지 제목"}
                sx={{ width: 600 }}
                value={formData.title}
                onChange={(e) => changeSurveyTitle(e.target.value)}
                inputProps={{
                  style: {
                    fontSize: "25px",
                    fontWeight: "bold",
                    padding: "15px 0 0 0",
                  },
                }}
              />
            </div>

            <div className={style.surveyText}>
              <TextField
                id="standard-basic"
                placeholder={"설문지 설명"}
                inputProps={{
                  style: {
                    fontSize: "14px",
                    padding: "15px 0 0 0",
                    marginTop: "10px",
                  },
                }}
                sx={{ width: 600 }}
                value={formData.content}
                onChange={(e) => changeSurveyContent(e.target.value)}
                variant="standard"
              />
            </div>
          </div>

          <div className={style.questionList}>
            {questions.map((questionData) => (
              <div className={style.question}>
                <QuestionComp
                  key={questionData.step}
                  index={questionData.step}
                  questionInfo={questionData}
                  changeTitle={changeQuestionTitle}
                  changeContent={changeQuestionContent}
                  changeOption={changeOption}
                  deleteQuestion={deleteQuestion}
                  changeRequired={changeRequired}
                  handleOption={handleOption}
                />
              </div>
            ))}
          </div>

          <IconButton aria-label="delete" size="medium" onClick={addQuestion}>
            <FaPlus />
          </IconButton>

          <div className={style.wrapButton}>
            <Button variant="outlined">취소</Button>
            <Button variant="contained">완료</Button>
          </div>
        </div>
      </div>
    </>
  );
}
