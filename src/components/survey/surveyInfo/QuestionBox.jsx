import style from "../../../style/survey/QuestionBox.module.css";

export default function QuestionBox({ children }) {
  return (
    <>
      <div>
        <div className={style.container}>{children}</div>
      </div>
    </>
  );
}
