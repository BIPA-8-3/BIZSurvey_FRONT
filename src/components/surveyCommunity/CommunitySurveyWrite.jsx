import * as React from "react";
import style from "../../style/surveyCommunity/CommunitySurveyWrite.module.css";
import "../../style/Common.css";
import useFadeIn from "../../style/useFadeIn";
import back from "../../assets/img/back.png";
import Button from "@mui/material/Button";
import logo from "../../assets/img/avatar.png";
import { Link } from "react-router-dom";
import Comment from "../community/Comment";
import ParentsComment from "../community/ParentsComment";
import ChildCommentForm from "../community/ChildCommentForm";
import ChildComment from "../community/ChildComment";
import SurveyQuestion from "./survey/SurveyQuestion";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { login, call } from "../../pages/survey/Login";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

export default function CommunityPost() {
  const fadeIn = useFadeIn();
  const navigate = useNavigate();

  // 설문지 데이터
  const [survey, setSurvey] = useState({
    surveyId: 0,
    title: "",
    content: "",
    surveyType: "",
    questions: [
      {
        questionId: 1,
        surveyQuestion: "",
        answerType: "",
        score: 0,
        step: 0,
        isRequired: true,
        answers: [
          {
            answerId: 0,
            surveyAnswer: "",
            step: 0,
            correct: false,
          },
        ],
      },
    ],
  });

  // 사용자 입력 데이터
  const [answers, setAnswers] = useState([
    {
      questionId: 0,
      answer: [],
      answerType: "",
      url: "",
    },
  ]);

  useEffect(() => {
    login();
    call("/s-community/survey/1", "GET")
      .then((data) => {
        setSurvey(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    console.log(answers);
  }, [answers]);

  const handleSetAnswer = (questionId, userAnswer, answerType, url) => {
    setAnswers((pre) => {
      const existingAnswer = pre.find((ans) => ans.questionId === questionId);

      if (existingAnswer) {
        return pre.map((ans) =>
          ans.questionId === questionId
            ? { ...ans, answer: [...userAnswer], url: url }
            : ans
        );
      } else {
        return [
          ...pre,
          {
            questionId: questionId,
            answer: [...userAnswer],
            answerType: answerType,
            url: url,
          },
        ];
      }
    });
  };

  const handleSubmitAnswer = () => {
    const result = answers.filter(
      (answer) =>
        answer.questionId !== 0 &&
        answer.answer.length > 0 &&
        !answer.answer.includes("")
    );

    const response = call("/s-community/survey/1", "POST", result);
    console.log(response);
  };

  return (
    <div className={`fade-in ${fadeIn ? "active" : ""}`}>
      <div className={style.contentWrap}>
        <div style={{ backgroundColor: "rgba(209, 232, 248, 0.1)" }}>
          <div className={style.title}>
            <h1>21년도 상반기 설문조사</h1>
            <p style={{ display: "flex" }}>
              <p style={{ textAlign: "center" }}>
                <div
                  className={style.profil}
                  style={{ textAlign: "center" }}
                ></div>
              </p>
              <div style={{ marginTop: "16px" }}>
                <span>COMMUNITY</span>
              </div>
            </p>
          </div>
        </div>
        <div className={style.content}>
          {/* 설문지 영역  */}
          <div className={style.surveyWrap}>
            <p className={style.requiredText}>* 표시는 필수 질문입니다</p>
            {survey.questions &&
              survey.questions.map((question, index) => (
                <SurveyQuestion
                  key={index}
                  question={question}
                  handleSetAnswer={handleSetAnswer}
                />
              ))}
          </div>

          <div className={style.surveyBtnWrap}>
            <Button
              variant="contained"
              href="#contained-buttons"
              onClick={handleSubmitAnswer}
              sx={[
                {
                  padding: "11px 30px",
                  backgroundColor: "#243579",
                  fontWeight: "bold",
                  marginBottom: "10px",
                  border: "1px solid #243579",
                  boxShadow: 0,
                  marginLeft: "5px",
                },
                {
                  ":hover": {
                    border: "1px solid #1976d2",
                    boxShadow: 0,
                  },
                },
              ]}
            >
              저장
            </Button>
          </div>
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <Link to={"/"}>
          <Button
            variant="contained"
            href="#contained-buttons"
            sx={{
              padding: "11.5px 30px",
              backgroundColor: "#243579",
              fontWeight: "bold",
            }}
          >
            홈으로
          </Button>
        </Link>
      </div>
      <img src={back} alt="배경" className={style.back} />
    </div>
  );
}
