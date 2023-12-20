import * as React from "react";
import style from "../../style/community/VoteWrite.module.css";
import "../../style/Common.css";
import useFadeIn from "../../style/useFadeIn";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";

export default function CommunityPost({ voteTitle, voteOptions }) {
  const [value, setValue] = React.useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const fadeIn = useFadeIn();

  return (
    <div className={style.registerVoteWrap}>
      <div className={style.voteTitleWrap}>
        <h2>
          <span className={style.voteSpan}>투표</span> {voteTitle}
        </h2>
      </div>
      <div className={style.voteContentWrap}>
        <FormControl>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={value}
            onChange={handleChange}
          >
            {voteOptions.map((option, index) => (
              <FormControlLabel
                key={index}
                value={option}
                control={<Radio />}
                label={option}
                disabled
              />
            ))}
            {/*                         
                        <FormControlLabel value="따듯한 아메리카노" control={<Radio />} label="따듯한 아메리카노" disabled/>
                        <FormControlLabel value="카페 라떼" control={<Radio />} label="카페 라떼" disabled/>
                        <FormControlLabel value="카푸치노" control={<Radio />} label="카푸치노" disabled/>
                        <FormControlLabel value="맥심 믹스 커피" control={<Radio />} label="맥심 믹스 커피" disabled/> */}
          </RadioGroup>
        </FormControl>
      </div>
    </div>
  );
}
