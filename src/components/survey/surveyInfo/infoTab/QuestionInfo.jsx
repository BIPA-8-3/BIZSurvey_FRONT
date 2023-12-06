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
          {answerType === "객관식(택1)" &&
            answers.map((answer) => (
              <ChoiceField single text={answer.surveyAnswer} />
            ))}
          {answerType === "객관식(복수형)" &&
            answers.map((answer) => <ChoiceField text={answer.surveyAnswer} />)}
          {answerType === "주관식" && <TextOption />}
          {answerType === "날짜" && <DateOption />}
          {answerType === "파일" && <FileOption />}
        </OptionBox>
      </QuestionBox>
    </>
  );
}
