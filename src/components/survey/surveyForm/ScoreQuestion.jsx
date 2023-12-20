import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import * as React from "react";
import { MdDragIndicator } from "react-icons/md";
import style from "../../../style/survey/QuestionComp.module.css";
import RequiredButton from "./RequiredButton";
import ScoreChoiceOption from "./score/ScoreChoiceOption";
import ScoreOptionSelect from "./score/ScoreOptionSelect";

export default function ScoreQuestion({
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
  changeScore,
  changeCorrect,
  checkDuplication,
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

  const handleScoreBlur = (text) => {
    if (isNaN(text) || parseInt(text) < 0 || text === "") {
      changeScore(index, 0);
    }
  };

  return (
    <>
      <div className={style.scoreContainer}>
        {/*ㅇㅕ긴 선택 버튼들*/}
        <div className={style.wrapTopButton}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <span className={style.scoreDrag} {...provided.dragHandleProps}>
              <MdDragIndicator />
            </span>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <span>
              <ScoreOptionSelect
                option={answerType}
                setOption={changeOption}
                idx={index}
                isScore
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
            <>
              <ScoreChoiceOption
                qid={index}
                answers={answers}
                addAnswer={addAnswer}
                deleteAnswer={deleteAnswer}
                changeAnswerText={changeAnswerText}
                changeCorrect={changeCorrect}
                checkDuplication={checkDuplication}
              />
            </>

            <></>
          </div>
        </div>

        {/*필수체크 버튼, 점수 입력칸*/}

        <div className={style.scoreFooter}>
          <span style={{ marginTop: "8px", marginLeft: "30px" }}>
            <span style={{ fontSize: "10pt", marginTop: "10px" }}>점수</span>
            <input
              type="number"
              // pattern="[0-9]+"
              value={score}
              className={style.scoreInput}
              onChange={(e) => changeScore(index, e.target.value)}
              onBlur={(e) => handleScoreBlur(e.target.value)}
            />
          </span>

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
