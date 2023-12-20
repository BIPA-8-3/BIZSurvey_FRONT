import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import * as React from "react";
import { MdDragIndicator } from "react-icons/md";
import style from "../../../style/survey/QuestionComp.module.css";
import OptionSelect from "./OptionSelect";
import RequiredButton from "./RequiredButton";
import ChoiceOption from "./options/ChoiceOption";
import DateOption from "./options/DateOption";
import FileOption from "./options/FileOption";
import TextOption from "./options/TextOption";

export default function QuestionComp({
  index,
  questionInfo,
  changeTitle,
  changeOption,
  deleteQuestion,
  changeRequired,
  provided,
  addAnswer,
  deleteAnswer,
  changeAnswerText,
}) {
  const {
    surveyQuestion,
    answerType,
    score,
    step,
    isRequired,
    answers,
    content,
  } = questionInfo;

  const handleBlur = (text) => {
    if (text.trim() === "") {
      changeTitle(index, "질문");
    }
  };

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

        {/*질문*/}
        <div>
          <div className={style.wrapQuestion}>
            <TextField
              value={surveyQuestion}
              id="filled-basic"
              variant="filled"
              placeholder={"질문"}
              inputProps={{
                style: { fontWeight: "bold", padding: "12px 13px" },
              }}
              sx={{ width: 600 }}
              onChange={(e) => changeTitle(index, e.target.value)}
              onBlur={(e) => handleBlur(e.target.value)}
            />
          </div>
        </div>

        {/*옵션들 */}
        <div>
          <div>
            {answerType ? (
              <>
                {/* 원하는 조건에 따른 옵션을 렌더링 */}
                {answerType === "SINGLE_CHOICE" && (
                  <ChoiceOption
                    single
                    qid={index}
                    answers={answers}
                    addAnswer={addAnswer}
                    deleteAnswer={deleteAnswer}
                    changeAnswerText={changeAnswerText}
                  />
                )}
                {answerType === "MULTIPLE_CHOICE" && (
                  <ChoiceOption
                    qid={index}
                    answers={answers}
                    addAnswer={addAnswer}
                    deleteAnswer={deleteAnswer}
                    changeAnswerText={changeAnswerText}
                  />
                )}
                {answerType === "TEXT" && <TextOption />}
                {answerType === "CALENDAR" && <DateOption />}
                {answerType === "FILE" && <FileOption />}
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
