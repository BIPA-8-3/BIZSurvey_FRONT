import style from "../../../../style/survey/ChoiceInfo.module.css";
import Stack from "@mui/material/Stack";

export default function ChoiceInfo({ single, text, select }) {
  return (
    <>
      <div className={style.wrapChoice}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <span
            className={`${style.rounded} ${
              single ? style.circle : style.square
            } ${select ? style.select : ""}`}
          ></span>

          <p className={style.text}>{text}</p>
        </Stack>
      </div>
    </>
  );
}
