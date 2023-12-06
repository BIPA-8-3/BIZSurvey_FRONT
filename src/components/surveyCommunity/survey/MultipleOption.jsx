import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

export default function MultipleOption({ answer, userAnswer, setUserAnswer }) {
  const { answerId, surveyAnswer, step, correct } = answer;

  const handleChange = (isChecked) => {
    if (isChecked) {
      // 선택된 경우
      setUserAnswer((prevUserAnswer) => [...prevUserAnswer, surveyAnswer]);
    } else {
      // 선택이 해제된 경우
      setUserAnswer((prevUserAnswer) =>
        prevUserAnswer.filter((value) => value !== surveyAnswer)
      );
    }
  };

  return (
    <>
      <div>
        <FormControlLabel
          control={<Checkbox />}
          label={surveyAnswer}
          value={surveyAnswer}
          checked={userAnswer.includes(surveyAnswer)}
          onChange={(e) => handleChange(e.target.checked)}
        />
      </div>
    </>
  );
}
