import OptionSelect from "./OptionSelect";
import RequiredButton from "./RequiredButton";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import ChoiceOption from "./options/ChoiceOption";
import TextOption from "./options/TextOption";
import FileOption from "./options/FileOption";
import DateOption from "./options/DateOption";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import * as React from "react";
import style from "../../../style/survey/QuestionComp.module.css";
import { MdDragIndicator } from "react-icons/md";
import ScoreOptionSelect from "./score/ScoreOptionSelect";

export default function QuestionComp({
  index,
  questionInfo,
  handleOption,
  changeTitle,
  changeOption,
  changeContent,
  deleteQuestion,
  changeRequired,
  provided,
  isScore,
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

  return (
    <>
      <div className={style.container}>
        {/*ㅇㅕ긴 선택 버튼들*/}
        <div className={style.wrapTopButton}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <span className={style.dragButton} {...provided.dragHandleProps}>
              <MdDragIndicator />
            </span>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <span>
              {isScore ? (
                <ScoreOptionSelect
                  option={answerType}
                  setOption={changeOption}
                  idx={index}
                />
              ) : (
                <OptionSelect
                  option={answerType}
                  setOption={changeOption}
                  idx={index}
                />
              )}
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

        {/*질문*/}
        <div>
          <div className={style.wrapQuestion}>
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
                    answers={answers}
                  />
                )}
                {answerType === "객관식(복수형)" && (
                  <ChoiceOption
                    handleOption={handleOption}
                    index={index}
                    answers={answers}
                  />
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

        {/*필수체크 버튼*/}

        <div className={style.footer}>
          <span className={style.requiredButton}>
            <RequiredButton
              required={isRequired}
              index={index}
              changeRequired={changeRequired}
            />
          </span>
        </div>
      </div>
    </>
  );
}
