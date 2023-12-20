import * as React from "react";
import style from "../../style/surveyCommunity/CommunitySurveyWrite.module.css";
import "../../style/Common.css";
import useFadeIn from "../../style/useFadeIn";
import back from "../../assets/img/back.png";
import Button from "@mui/material/Button";
import logo from "../../assets/img/avatar.png";
import { Link, useLocation } from "react-router-dom";
import Comment from "../community/Comment";
import ParentsComment from "../community/ParentsComment";
import ChildCommentForm from "../community/ChildCommentForm";
import ChildComment from "../community/ChildComment";
import SurveyQuestion from "./survey/SurveyQuestion";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import call from "../../pages/workspace/api";
import SurveyForm from "./survey/SurveyForm";

export default function CommunityPost() {
  const fadeIn = useFadeIn();
  const navigate = useNavigate();
  const location = useLocation();
  const postId = location.state ? location.state.postId : 0;

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

  const [answers, setAnswers] = useState([
    {
      questionId: 0,
      answer: [],
      answerType: "",
      url: "",
    },
  ]);

  const [pass, setPass] = useState([]);

  useEffect(() => {
    call("/s-community/survey/" + postId, "GET")
      .then((data) => {
        setSurvey(data);
      })
      .then(() => {
        const newPassArray = Array(survey.questions.length).fill(true);
        setPass(newPassArray);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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

  const handleSubmitAnswer = async () => {
    const res = handleCheckAnswer();

    if (!res) {
      alert("필수 질문에 응답해주세요.");
      return;
    } else {
      const result = answers.filter(
        (answer) =>
          answer.questionId !== 0 &&
          answer.answer.length > 0 &&
          !answer.answer.includes("")
      );

      try {
        const response = await call(
          "/s-community/survey/" + postId,
          "POST",
          result
        );
        console.log(response);
        alert(response);
        navigate("/surveyCommunityDetail", { state: { postId: postId } });
      } catch (error) {
        console.error("답변 제출 중 오류 발생:", error);
      }
    }
  };

  const handleCheckAnswer = () => {
    let result = true;
    let newPassArray = Array(survey.questions.length).fill(true);

    survey.questions.map((question, index) => {
      if (question.isRequired) {
        const match = answers.find(
          (ans) => ans.questionId === question.questionId
        );

        if (
          !match ||
          !match.answer ||
          match.answer.length < 1 ||
          match.answer[0] === ""
        ) {
          newPassArray[index] = false;
          result = false;
        }
      }
    });

    setPass(newPassArray);

    return result;
  };

  if (survey.surveyId === 0) {
    return;
  }

  return (
    <div className={`fade-in ${fadeIn ? "active" : ""}`}>
      <div className={style.contentWrap}>
        <div style={{ backgroundColor: "rgba(209, 232, 248, 0.1)" }}>
          <div className={style.title}>
            <h1>{survey.title}</h1>
            <p style={{ display: "flex" }}>
              <p style={{ textAlign: "center" }}>
                <div
                  className={style.profil}
                  style={{ textAlign: "center" }}
                ></div>
              </p>
              <div style={{ marginTop: "16px" }}>
                <span>{survey.content}</span>
              </div>
            </p>
          </div>
        </div>
        <div className={style.content}>
          {/* 설문지 영역  */}

          <SurveyForm
            survey={survey}
            handleSetAnswer={handleSetAnswer}
            pass={pass}
          />

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
