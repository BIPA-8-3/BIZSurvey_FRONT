import * as React from "react";
import ScoreChoiceField from "../../fields/ScoreChoiceField";
import QuestionBox from "../QuestionBox";
import QuestionTitle from "../QuestionTitle";
import OptionBox from "../resultTab/totalOptions/OptionBox";

export default function ScoreQuestionInfo({ info }) {
  const {
    questionId,
    surveyQuestion,
    answerType,
    score,
    step,
    isRequired,
    answers,
  } = info;

  return (
    <>
      <QuestionBox score>
        <QuestionTitle title={surveyQuestion} />
        <OptionBox>
          {answers.map((answer, index) => {
            if (answer.correct === "YES") {
              return (
                <ScoreChoiceField
                  select
                  key={index}
                  text={answer.surveyAnswer}
                />
              );
            } else if (answer.correct === "NO") {
              return (
                <ScoreChoiceField key={index} text={answer.surveyAnswer} />
              );
            }
          })}
        </OptionBox>
      </QuestionBox>
    </>
  );
}
