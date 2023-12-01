import * as React from "react";
import QuestionBox from "../QuestionBox";
import QuestionTitle from "../QuestionTitle";
import ChoiceInfo from "../infoOptions/ChoiceInfo";
import OptionBox from "../resultTab/totalOptions/OptionBox";
import ChoiceField from "../../fields/ChoiceField";
import TextOption from "../../surveyForm/options/TextOption";
import DateOption from "../../surveyForm/options/DateOption";
import FileOption from "../../surveyForm/options/FileOption";

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
        <QuestionTitle title={"제목"} />
        <OptionBox>
          <ChoiceField single text={"옵션1"} />
          <ChoiceField single text={"옵션1"} />
        </OptionBox>
      </QuestionBox>

      <QuestionBox>
        <QuestionTitle title={"제목"} />
        <OptionBox>
          <TextOption />
        </OptionBox>
      </QuestionBox>

      <QuestionBox>
        <QuestionTitle title={"제목"} />
        <OptionBox>
          <DateOption />
        </OptionBox>
      </QuestionBox>

      <QuestionBox>
        <QuestionTitle title={"제목"} />
        <OptionBox>
          <FileOption />
        </OptionBox>
      </QuestionBox>
    </>
  );
}
