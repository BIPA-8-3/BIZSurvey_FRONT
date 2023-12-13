import style from "../../../style/surveyCommunity/CommunitySurveyWrite.module.css";
import SurveyQuestion from "./SurveyQuestion";

export default function SurveyForm({ survey, handleSetAnswer, pass, type }) {
  return (
    <>
      <div className={style.surveyWrap}>
        <p className={style.requiredText}>* 표시는 필수 질문입니다</p>
        {survey.questions &&
          survey.questions.map((question, index) => (
            <SurveyQuestion
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
