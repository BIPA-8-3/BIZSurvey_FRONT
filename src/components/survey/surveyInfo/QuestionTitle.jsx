import style from "../../../style/survey/QuestionTitle.module.css";

export default function QuestionTitle({ title }) {
  return (
    <>
      <div className={style.wrapTitle}>
        <p className={style.titleText}>{title}</p>
      </div>
    </>
  );
}
