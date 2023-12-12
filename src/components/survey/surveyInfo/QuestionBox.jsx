import style from "../../../style/survey/QuestionBox.module.css";

export default function QuestionBox({ children, score }) {
  return (
    <>
      <div>
        <div className={`${score ? style.scoreContainer : style.container}`}>
          {children}
        </div>
      </div>
    </>
  );
}
