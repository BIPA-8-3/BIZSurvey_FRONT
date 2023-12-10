import TextField from "@mui/material/TextField";

export default function TextOption({ setUserAnswer }) {
  const handleChangeAnswer = (e) => {
    setUserAnswer([e.target.value]);
  };

  return (
    <>
      <TextField
        id="standard-basic"
        placeholder="답변을 입력해주세요"
        variant="standard"
        multiline
        fullWidth
        defaultValue={""}
        onChange={handleChangeAnswer}
      />
    </>
  );
}
