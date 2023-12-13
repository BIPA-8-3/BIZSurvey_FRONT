import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import { IoCloseOutline } from "react-icons/io5";
import Stack from "@mui/material/Stack";
import { useEffect, useState } from "react";
import { FaCirclePlus } from "react-icons/fa6";
import Button from "@mui/material/Button";

export default function ChoiceOption({
  single,
  qid,
  answers,
  addAnswer,
  deleteAnswer,
  changeAnswerText,
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
        {answers.map(({ step, surveyAnswer }, index) => (
          <Option
            key={index}
            index={index}
            onDelete={deleteOption}
            changeText={changeText}
            single={single}
            text={surveyAnswer}
          ></Option>
        ))}
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

function Option({ onDelete, index, changeText, single, text }) {
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
            onChange={(e) => changeText(index, e.target.value)}
            id="standard-multiline-static"
            variant="standard"
            placeholder={"옵션을 입력하세요"}
            inputProps={{ style: { fontSize: 15 } }}
            sx={{ width: 550 }}
          />
          <IconButton aria-label="fingerprint" onClick={() => onDelete(index)}>
            <IoCloseOutline />
          </IconButton>
        </Stack>
      </div>
    </>
  );
}
