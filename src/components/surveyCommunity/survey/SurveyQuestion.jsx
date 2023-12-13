import { useState } from "react";
import style from "../../../style/surveyCommunity/SurveyQuestion.module.css";
import QuestionBox from "../../survey/surveyInfo/QuestionBox";
import DateOption from "./DateOption";
import FileOption from "./FileOption";
import MultipleOption from "./MultipleOption";
import SingleOption from "./SingleOption";
import TextOption from "./TextOption";
import { useEffect } from "react";

export default function SurveyQuestion({ question, handleSetAnswer, pass }) {
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
      <div className={`${pass === false ? style.questionRed : style.question}`}>
        {/* 질문  */}
        <div className={style.title}>
          <p>
            <span>{surveyQuestion} </span>
            <span style={{ color: "red" }}>
              {isRequired === true ? "*" : ""}
            </span>
          </p>
        </div>
        {/* 옵션 영역  */}
        <div className={style.option}>
          {answerType === "SINGLE_CHOICE" && (
            <SingleOption answers={answers} setUserAnswer={setUserAnswer} />
          )}
          {answerType === "MULTIPLE_CHOICE" &&
            answers.map((answer, index) => (
              <div style={{ marginBottom: "5px" }} key={index}>
                <MultipleOption
                  answer={answer}
                  userAnswer={userAnswer}
                  setUserAnswer={setUserAnswer}
                />
              </div>
            ))}
          {answerType === "TEXT" && (
            <TextOption setUserAnswer={setUserAnswer} />
          )}
          {answerType === "CALENDAR" && (
            <DateOption setUserAnswer={setUserAnswer} />
          )}
          {answerType === "FILE" && (
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
