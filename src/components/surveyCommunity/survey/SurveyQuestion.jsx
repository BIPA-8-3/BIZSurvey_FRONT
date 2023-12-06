import { useState } from "react";
import style from "../../../style/surveyCommunity/SurveyQuestion.module.css";
import QuestionBox from "../../survey/surveyInfo/QuestionBox";
import DateOption from "./DateOption";
import FileOption from "./FileOption";
import MultipleOption from "./MultipleOption";
import SingleOption from "./SingleOption";
import TextOption from "./TextOption";
import { useEffect } from "react";

export default function SurveyQuestion({ question, handleSetAnswer }) {
  const {
    questionId,
    surveyQuestion,
    answerType,
    score,
    step,
    isRequired,
    answers,
  } = question;

  const [userAnswer, setUserAnswer] = useState([]);
  const [fileAnswer, setFileAnswer] = useState([]);

  useEffect(() => {
    console.log("answerTYpd: " + answerType);
    console.log("ans" + userAnswer);

    handleSetAnswer(questionId, userAnswer, answerType, "");
  }, [userAnswer]);

  useEffect(() => {
    if (fileAnswer.length !== 0) {
      const filename = [fileAnswer[0].name];
      handleSetAnswer(questionId, filename, answerType, fileAnswer[0].url);
    }
  }, [fileAnswer]);

  return (
    <>
      <div className={style.question}>
        {/* 질문  */}
        <div className={style.title}>
          <p>
            <span>{surveyQuestion} </span>
            <span style={{ color: "red" }}>
              {isRequired === true ? "*" : ""}
            </span>{" "}
          </p>
        </div>
        {/* 옵션 영역  */}
        <div className={style.option}>
          {answerType === "객관식(택1)" && (
            <SingleOption answers={answers} setUserAnswer={setUserAnswer} />
          )}
          {answerType === "객관식(복수형)" &&
            answers.map((answer, index) => (
              <div style={{ marginBottom: "5px" }}>
                <MultipleOption
                  key={index}
                  answer={answer}
                  userAnswer={userAnswer}
                  setUserAnswer={setUserAnswer}
                />
              </div>
            ))}
          {answerType === "주관식" && (
            <TextOption setUserAnswer={setUserAnswer} />
          )}
          {answerType === "날짜" && (
            <DateOption setUserAnswer={setUserAnswer} />
          )}
          {answerType === "파일" && (
            <FileOption
              setFileAnswer={setFileAnswer}
              questionId={questionId}
              fileAnswer={fileAnswer}
            />
          )}
        </div>
      </div>
    </>
  );
}
