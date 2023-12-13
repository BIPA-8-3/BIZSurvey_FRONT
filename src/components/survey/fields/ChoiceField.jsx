import style from "../../../style/survey/ChoiceField.module.css";
import Stack from "@mui/material/Stack";

export default function ChoiceField(props) {
  const { single, text, select } = props;

  console.log("객관식" + text);
  console.log("객관식 선택여부" + select);

  return (
    // 읽기 전용(상세페이지)
    <>
      <div className={style.wrapChoice}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <span
            className={`${style.rounded} ${
              single ? style.circle : style.square
            } ${select ? style.select : ""}`}
          ></span>

          <p className={`${select ? style.boldText : style.text}`}>{text}</p>
        </Stack>
      </div>
    </>
  );
}
