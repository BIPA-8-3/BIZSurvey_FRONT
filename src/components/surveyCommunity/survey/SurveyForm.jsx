import style from "../../../style/surveyCommunity/CommunitySurveyWrite.module.css";
import SurveyQuestion from "./SurveyQuestion";

export default function SurveyForm({ survey, handleSetAnswer, pass, type, sharedId }) {
  return (
    <>
      <div
        className={style.surveyWrap}
        style={{
          width: type ? "700px" : "90%",
          boxShadow: type ? "rgba(0, 0, 0, 0.24) 0px 3px 8px" : null,
        }}
      >
        <p className={style.requiredText}>* 표시는 필수 질문입니다</p>
        {survey.questions &&
          survey.questions.map((question, index) => (
            <SurveyQuestion
              sharedId={sharedId}
              surveyId={survey.surveyId}
              key={index}
              question={question}
              handleSetAnswer={handleSetAnswer}
              pass={pass[index]}
            />
          ))}
      </div>
    </>
  );
}
