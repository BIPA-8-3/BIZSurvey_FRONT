import Checkbox from "@mui/material/Checkbox";
import Stack from "@mui/material/Stack";
import style from "../../../../../style/survey/ScoreResultOption.module.css";

export default function ScoreResultOption(props) {
  const { text, correct } = props;

  if (correct === "YES") {
    return (
      <>
        <div className={style.yes}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <span style={{ zIndex: "9999" }}>
              <Checkbox
                defaultChecked={false}
                checked={correct === "YES"}
                disabled
                color="default"
              />
            </span>

            <p>{text}</p>
          </Stack>
        </div>
      </>
    );
  } else if (correct === "NO") {
    return (
      <>
        <div className={style.no}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <span style={{ zIndex: "9999" }}>
              <Checkbox
                defaultChecked={false}
                checked={correct === "NO"}
                disabled
                color="default"
              />
            </span>

            <p>{text}</p>
          </Stack>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className={style.wrapChoice}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <span style={{ zIndex: "9999" }}>
              <Checkbox disabled defaultChecked={false} checked={false} />
            </span>

            <p style={{ color: "grey" }}>{text}</p>
          </Stack>
        </div>
      </>
    );
  }
}
