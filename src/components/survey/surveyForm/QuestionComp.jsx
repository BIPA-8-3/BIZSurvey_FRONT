import OptionSelect from "./OptionSelect";
import RequiredButton from "./RequiredButton";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import ChoiceOption from "./fields/ChoiceOption";
import TextOption from "./fields/TextOption";
import FileOption from "./fields/FileOption";
import DateOption from "./fields/DateOption";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import * as React from "react";

export default function QuestionComp({
  index,
  questionInfo,
  handleOption,
  changeTitle,
  changeOption,
  changeContent,
  deleteQuestion,
  changeRequired,
}) {
  const [option, setOption] = useState("");
  const {
    surveyQuestion,
    answerType,
    score,
    step,
    isRequired,
    answers,
    content,
  } = questionInfo;

  useEffect(() => {
    console.log("changeOPtion!!!!");
  }, [option]);

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
        }}
      >
        {/*ㅇㅕ긴 선택 버튼들*/}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderRadius: "10px 10px 0 0",
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <span
              style={{
                display: "inline-block",
                width: "50px",
                textAlign: "center",
              }}
            >
              {step}
            </span>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <span>
              <OptionSelect
                option={answerType}
                setOption={changeOption}
                idx={index}
              />
            </span>

            <span style={{ marginRight: "10px" }}>
              <IconButton
                aria-label="delete"
                size="small"
                onClick={() => deleteQuestion(index)}
              >
                <DeleteIcon />
              </IconButton>
            </span>
          </Stack>
        </div>

        {/*질문답변들*/}
        <div style={{ marginTop: "20px" }}>
          <div style={{ margin: "0 auto", width: "600px" }}>
            <TextField
              value={surveyQuestion}
              id="filled-basic"
              variant="filled"
              placeholder={"제목"}
              inputProps={{
                style: { fontWeight: "bold", padding: "12px 13px" },
              }}
              sx={{ width: 600 }}
              onChange={(e) => changeTitle(index, e.target.value)}
            />
            {/*<TextField*/}
            {/*    value={content}*/}
            {/*    id="standard-basic"*/}
            {/*    variant="standard"*/}
            {/*    placeholder={'설명'}*/}
            {/*    inputProps={{style: {fontSize: '14px', padding: '15px 0 0 0'}}}*/}
            {/*    sx={{width: 600}}*/}
            {/*    onChange = {(e)=>changeContent(index, e.target.value)}*/}
            {/*/>*/}
          </div>
        </div>

        {/*옵션들 */}
        <div>
          <div>
            {answerType ? (
              <>
                {/* 원하는 조건에 따른 옵션을 렌더링 */}
                {answerType === "객관식(택1)" && (
                  <ChoiceOption
                    single
                    handleOption={handleOption}
                    index={index}
                  />
                )}
                {answerType === "객관식(복수선택)" && (
                  <ChoiceOption handleOption={handleOption} index={index} />
                )}
                {answerType === "주관식" && <TextOption />}
                {answerType === "날짜" && <DateOption />}
                {answerType === "파일" && <FileOption />}
              </>
            ) : (
              <></>
            )}
          </div>
        </div>

        {/*푸터*/}

        <div
          style={{
            width: "700px",
            height: "40px",
            backgroundColor: "white",
            marginBottom: "0",
            marginTop: "20px",
            borderRadius: "0 0 10px 10px",
            borderTop: "1px solid #D6D6D6",
            paddingTop: "5px",
            paddingBottom: "5px",
            textAlign: "right",
          }}
        >
          <span style={{ margin: "20px 30px 0 0" }}>
            <RequiredButton index={index} changeRequired={changeRequired} />
          </span>
        </div>
      </div>
    </>
  );
}
