import style from "../../../../../style/survey/OptionBox.module.css";

export default function OptionBox({ children }) {
  return (
    <>
      <div className={style.container}>{children}</div>
    </>
  );
}
