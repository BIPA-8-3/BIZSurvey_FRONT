import * as React from "react";
import QuestionBox from "../QuestionBox";
import QuestionTitle from "../QuestionTitle";
import ChoiceInfo from "../infoOptions/ChoiceInfo";
import OptionBox from "../resultTab/totalOptions/OptionBox";
import ChoiceField from "../../fields/ChoiceField";
import TextOption from "../../surveyForm/options/TextOption";
import DateOption from "../../surveyForm/options/DateOption";
import FileOption from "../../surveyForm/options/FileOption";
import { TextField } from "@mui/material";

export default function QuestionInfo({ info }) {
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
      <QuestionBox>
        <QuestionTitle title={surveyQuestion} />
        <OptionBox>
          {answerType === "SINGLE_CHOICE" &&
            answers.map((answer, index) => (
              <ChoiceField key={index} single text={answer.surveyAnswer} />
            ))}
          {answerType === "MULTIPLE_CHOICE" &&
            answers.map((answer, index) => (
              <ChoiceField key={index} text={answer.surveyAnswer} />
            ))}
          {answerType === "TEXT" && <TextOption />}
          {answerType === "CALENDAR" && <DateOption />}
          {answerType === "FILE" && <FileOption />}
        </OptionBox>
      </QuestionBox>
    </>
  );
}
