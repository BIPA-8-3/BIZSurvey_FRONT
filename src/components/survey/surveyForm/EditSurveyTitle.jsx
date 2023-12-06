import { TextField } from "@mui/material";
import style from "../../../style/survey/EditSurveyTitle.module.css";

export default function EditSurveyTitle({
  title,
  content,
  changeSurveyContent,
  changeSurveyTitle,
}) {
  return (
    <>
      <div className={style.wrapSurveyInfo}>
        <div className={style.surveyText}>
          <TextField
            id="standard-basic"
            variant="standard"
            placeholder={"설문지 제목"}
            sx={{ width: 600 }}
            value={title}
            onChange={(e) => changeSurveyTitle(e.target.value)}
            inputProps={{
              style: {
                fontSize: "25px",
                fontWeight: "bold",
                padding: "15px 0 0 0",
              },
            }}
          />
        </div>
        <div className={style.surveyText}>
          <TextField
            id="standard-basic"
            placeholder={"설문지 설명"}
            inputProps={{
              style: {
                fontSize: "14px",
                padding: "15px 0 0 0",
                marginTop: "10px",
              },
            }}
            sx={{ width: 600 }}
            value={content}
            onChange={(e) => changeSurveyContent(e.target.value)}
            variant="standard"
          />
        </div>
      </div>
    </>
  );
}
