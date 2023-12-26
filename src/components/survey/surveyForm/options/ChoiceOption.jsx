import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { FaCirclePlus } from "react-icons/fa6";
import { IoCloseOutline } from "react-icons/io5";

export default function ChoiceOption({
  single,
  qid,
  answers,
  addAnswer,
  deleteAnswer,
  changeAnswerText,
  answerPass,
}) {
  const addOption = () => {
    addAnswer(qid);
  };

  const deleteOption = (aid) => {
    deleteAnswer(qid, aid);
  };

  const changeText = (aid, text) => {
    changeAnswerText(qid, aid, text);
  };

  return (
    <>
      <div style={{ marginTop: "15px" }}>
        {answers.map(({ step, surveyAnswer }, index) => {
          if (surveyAnswer !== null) {
            return (
              <Option
                key={index}
                index={index}
                onDelete={deleteOption}
                changeText={changeText}
                single={single}
                text={surveyAnswer}
                answers={answers}
                answerPass={answerPass}
              ></Option>
            );
          }
        })}
      </div>

      <div style={{ marginTop: "10px", paddingLeft: "45px" }}>
        <Button
          variant="text"
          startIcon={<FaCirclePlus />}
          sx={{ fontSize: 13 }}
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
  answers,
  answerPass,
}) {
  const [dup, setDup] = useState(false);

  const handleBlur = (text) => {
    if (text.trim() === "") {
      changeText(index, "옵션 " + (index + 1));
    }
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
            onChange={(e) => checkAnswer(index, e.target.value)}
            id="standard-multiline-static"
            variant="standard"
            onBlur={(e) => handleBlur(e.target.value)}
            placeholder={"옵션을 입력하세요"}
            inputProps={{ style: { fontSize: 15 } }}
            sx={{ width: 550 }}
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
