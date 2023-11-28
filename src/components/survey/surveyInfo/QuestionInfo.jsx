import * as React from "react";
import ChoiceOption from "../surveyForm/fields/ChoiceOption";
import TextOption from "../surveyForm/fields/TextOption";
import DateOption from "../surveyForm/fields/DateOption";
import FileOption from "../surveyForm/fields/FileOption";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

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
      <div
        style={{
          width: "700px",
          backgroundColor: "white",
          borderRadius: "10px",
          minHeight: "150px",
          border: "1px solid #D6D6D6",
          borderTop: "10px solid #0171D1",
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          margin: "0 auto",
          marginBottom: "25px",
        }}
      >
        {/* 제목 */}
        <div style={{ marginTop: "20px" }}>
          <div style={{ margin: "0 auto", width: "600px" }}>
            <p
              style={{
                fontWeight: "bold",
                width: "600px",
                paddingTop: "15px",
              }}
            >
              {surveyQuestion}
            </p>
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
      <div style={{ margin: "0 auto", width: "600px" }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <span
            style={{
              width: "16px",
              height: "16px",
              border: "2px solid #D6D6D6",
              textAlign: "center",
              borderRadius: single ? "50%" : "3px",
            }}
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
