import { useState } from "react";
import style from "../../../style/surveyCommunity/SurveyQuestion.module.css";
import QuestionBox from "../../survey/surveyInfo/QuestionBox";
import DateOption from "./DateOption";
import FileOption from "./FileOption";
import MultipleOption from "./MultipleOption";
import SingleOption from "./SingleOption";
import TextOption from "./TextOption";
import { useEffect } from "react";

export default function SurveyQuestion({
  question,
  handleSetAnswer,
  pass,
  surveyId,
  sharedId,
}) {
  const {
    questionId,
    surveyQuestion,
    answerType,
    score,
    step,
    isRequired,
    answers,
  } = question;

  // 파일 제외 응답
  const [userAnswer, setUserAnswer] = useState([]);

  // 파일 응답
  const [fileAnswer, setFileAnswer] = useState([]);

  // [파일 제외] 사용자가 답변을 체크 할때마다 답변 설정
  useEffect(() => {
    handleSetAnswer(questionId, userAnswer, answerType, "");
  }, [userAnswer]);

  // [파일] 사용자가 답변을 체크 할때마다 답변 설정
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
          {answerType === "SINGLE_CHOICE" && answers[0].answerId !== null ? (
            <SingleOption answers={answers} setUserAnswer={setUserAnswer} />
          ) : null}
          {answerType === "MULTIPLE_CHOICE" && answers[0].answerId !== null > 0
            ? answers.map((answer, index) => {
                if (answer.answerId !== null) {
                  return (
                    <div style={{ marginBottom: "5px" }} key={index}>
                      <MultipleOption
                        answer={answer}
                        userAnswer={userAnswer}
                        setUserAnswer={setUserAnswer}
                      />
                    </div>
                  );
                }
              })
            : null}
          {answerType === "TEXT" && (
            <TextOption setUserAnswer={setUserAnswer} />
          )}
          {answerType === "CALENDAR" && (
            <DateOption setUserAnswer={setUserAnswer} />
          )}
          {answerType === "FILE" && (
            <FileOption
              sharedId={sharedId}
              surveyId={surveyId}
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
