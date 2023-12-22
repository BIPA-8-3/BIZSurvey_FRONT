import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function SingleOption({ answers, setUserAnswer }) {
  const handleChangeAnswer = (e) => {
    setUserAnswer([e.target.value]);
  };

  return (
    <>
      <div>
        <FormControl>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
          >
            {answers.map((answer, index) => {
              if (answer.answerId !== null) {
                return (
                  <div style={{ marginBottom: "5px" }} key={index}>
                    <FormControlLabel
                      value={answer.surveyAnswer}
                      control={<Radio onChange={handleChangeAnswer} />}
                      label={answer.surveyAnswer}
                    />
                  </div>
                );
              }
            })}
          </RadioGroup>
        </FormControl>
      </div>
    </>
  );
}
