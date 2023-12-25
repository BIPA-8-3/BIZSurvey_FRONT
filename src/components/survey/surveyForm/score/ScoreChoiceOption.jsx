import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { FaCirclePlus } from "react-icons/fa6";
import { IoCloseOutline } from "react-icons/io5";
import { useEffect, useState } from "react";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

export default function ScoreChoiceOption({
  single,
  addAnswer,
  deleteAnswer,
  changeAnswerText,
  qid,
  answers,
  changeCorrect,
  answerPass,
}) {
  const addOption = () => {
    addAnswer(qid);
  };

  const deleteOption = (aid) => {
    deleteAnswer(qid, aid);
  };

  const changeText = (id, text) => {
    changeAnswerText(qid, id, text);
  };

  const changeOptionCorrect = (aid) => {
    changeCorrect(qid, aid);
  };

  return (
    <>
      <div style={{ marginTop: "15px" }}>
        {answers.map(({ correct, surveyAnswer, answerId }, index) => {
          if (answerId !== null) {
            return (
              <Option
                key={index}
                index={index}
                onDelete={deleteOption}
                changeText={changeText}
                single={single}
                text={surveyAnswer}
                changeOptionCorrect={changeOptionCorrect}
                correct={correct}
                qid={qid}
                answerPass={answerPass}
                answers={answers}
              ></Option>
            );
          }
        })}
      </div>

      <div style={{ marginTop: "10px", paddingLeft: "45px" }}>
        <Button
          variant="text"
          startIcon={<FaCirclePlus />}
          sx={{ fontSize: 13, color: "#119fb3" }}
          onClick={addOption}
        >
          옵션 추가
        </Button>
      </div>
    </>
  );
}

function Option({
  onDelete,
  index,
  changeText,
  single,
  text,
  changeOptionCorrect,
  correct,
  qid,
  answers,
  answerPass,
}) {
  // const [isPass, setPass] = useState(true);
  const [dup, setDup] = useState(false);

  const handleBlur = (text) => {
    if (text.trim() === "") {
      changeText(index, "옵션 " + (index + 1));
    }
    // checkAnswer(text);
  };

  const checkAnswer = (index, text) => {
    changeText(index, text);
    const txt = text.trim();
    const dupAnswer = answers.find(
      (answer, idx) => answer.surveyAnswer.trim() === txt && index !== idx
    );
    if (dupAnswer) {
      answerPass(false);
      setDup(true);
    } else {
      answerPass(true);
      setDup(false);
    }
  };

  return (
    <>
      <div style={{ margin: "0 auto", width: "600px" }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <span>
            <Checkbox
              {...label}
              sx={{
                color: "#119fb3",
                "&.Mui-checked": {
                  color: "#119fb3",
                },
              }}
              checked={correct === "YES"}
              onChange={() => changeOptionCorrect(index)}
            />
          </span>

          <TextField
            value={text}
            onChange={(e) => checkAnswer(index, e.target.value)}
            id="standard-multiline-static"
            variant="standard"
            placeholder={"옵션을 입력하세요"}
            inputProps={{ style: { fontSize: 15 } }}
            sx={{
              width: 550,
            }}
            onBlur={(e) => handleBlur(e.target.value)}
          />
          <IconButton aria-label="fingerprint" onClick={() => onDelete(index)}>
            <IoCloseOutline />
          </IconButton>
        </Stack>
        {dup ? (
          <p style={{ textAlign: "center", fontSize: "12px", color: "red" }}>
            중복 옵션은 지원되지 않습니다.
          </p>
        ) : null}
      </div>
    </>
  );
}
