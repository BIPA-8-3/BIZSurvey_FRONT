import { TextField } from "@mui/material";
import style from "../../../style/survey/EditSurveyTitle.module.css";

export default function EditSurveyTitle({
  title,
  content,
  changeSurveyContent,
  changeSurveyTitle,
}) {
  const handleTitleBlur = (text) => {
    if (text.trim() === "") {
      changeSurveyTitle("제목");
    }
  };

  const handleContentBlur = (text) => {
    if (text.trim() === "") {
      changeSurveyContent("설명");
    }
  };

  return (
    <>
      <div className={style.wrapSurveyInfo}>
        <div className={style.surveyText}>
          <TextField
            id="standard-basic"
            variant="standard"
            placeholder={"제목"}
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
            onBlur={(e) => handleTitleBlur(e.target.value)}
          />
        </div>
        <div className={style.surveyText}>
          <TextField
            id="standard-basic"
            placeholder={"설명"}
            multiline
            inputProps={{
              style: {
                fontSize: "14px",
                padding: "15px 0 0 0",
                marginTop: "10px",
              },
            }}
            sx={{ width: 600, marginBottom: "30px" }}
            value={content}
            onChange={(e) => changeSurveyContent(e.target.value)}
            variant="standard"
            onBlur={(e) => handleContentBlur(e.target.value)}
          />
        </div>
      </div>
    </>
  );
}
