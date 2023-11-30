import * as React from "react";
import ChoiceOption from "../surveyForm/fields/ChoiceOption";
import TextOption from "../surveyForm/fields/TextOption";
import DateOption from "../surveyForm/fields/DateOption";
import FileOption from "../surveyForm/fields/FileOption";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import style from "../../../style/survey/QuestionInfo.module.css";

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
      <div className={style.container}>
        {/* 제목 */}
        <div>
          <div className={style.wrapQuestion}>
            <p className={style.questionText}>{surveyQuestion}</p>
          </div>
        </div>

        {/*옵션들 */}
        <div>
          <div style={{ marginBottom: "30px" }}>
            {answerType ? (
              <>
                {/* 원하는 조건에 따른 옵션을 렌더링 */}
                {answerType === "객관식(택1)" &&
                  answers.map((answer, index) => (
                    <Choice single key={index} text={answer.surveyAnswer} />
                  ))}
                {answerType === "객관식(복수선택)" &&
                  answers.map((answer, index) => (
                    <Choice key={index} text={answer.surveyAnswer} />
                  ))}
                {answerType === "주관식" && <TextOption />}
                {answerType === "날짜" && <DateOption />}
                {answerType === "파일" && <FileOption />}
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function Choice({ single, text }) {
  return (
    <>
      <div className={style.wrapChoice}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <span
            className={`${style.rounded} ${
              single ? style.circle : style.square
            }`}
          ></span>
          <TextField
            value={text}
            id="standard-multiline-static"
            variant="standard"
            disabled
            inputProps={{ style: { fontSize: 15 } }}
            sx={{ width: 550 }}
          />
        </Stack>
      </div>
    </>
  );
}
