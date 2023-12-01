import Navbar from "../../components/workspace/Navbar";
import style from "../../style/workspace/Main.module.css";
import SurveyCard from "../../components/workspace/SurveyCard";
import DefaultCard from "../../components/workspace/DefaultCard";

export default function Main() {
  return (
    <div id={style.SectionBody}>
      <Navbar></Navbar>
      <div className={style.sectionWrap}>
        <div className={style.section}>
          <div className={style.inputWrap}>
            <input value="New Workspace" className={style.inputTitle}></input>
          </div>
          <div className={style.cardContainer}>
            <DefaultCard></DefaultCard>
            <SurveyCard info={"🗒️"} className={style.cardItem}></SurveyCard>
            <SurveyCard info={"🗒️"} className={style.cardItem}></SurveyCard>
            <SurveyCard info={"📝"} className={style.cardItem}></SurveyCard>
            <SurveyCard info={"🗒️"} className={style.cardItem}></SurveyCard>
            <SurveyCard info={"📝"} className={style.cardItem}></SurveyCard>
            <SurveyCard info={"📝"} className={style.cardItem}></SurveyCard>
          </div>
        </div>
      </div>
    </div>
  );
}
