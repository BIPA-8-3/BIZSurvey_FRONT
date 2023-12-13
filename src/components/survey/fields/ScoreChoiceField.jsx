import style from "../../../style/survey/ChoiceField.module.css";
import Stack from "@mui/material/Stack";

export default function ScoreChoiceField(props) {
  const { single, text, select } = props;

  return (
    // 읽기 전용(상세페이지)
    <>
      <div className={style.wrapChoice}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <span
            className={`${style.rounded} ${
              single ? style.circle : style.square
            } ${select ? style.scoreSelect : ""}`}
          ></span>

          <p className={`${select ? style.scoreText : style.text}`}>{text}</p>
        </Stack>
      </div>
    </>
  );
}
