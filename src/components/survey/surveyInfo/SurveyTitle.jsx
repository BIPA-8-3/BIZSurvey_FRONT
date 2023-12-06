import { useState } from "react";
import style from "../../../style/survey/SurveyTitle.module.css";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import ButtonTab from "./ButtonTab";

export default function SurveyTitle({
  title,
  content,
  tab,
  handlechangeTab,
  page,
}) {
  if (!tab) {
    return (
      <>
        <InfoTitle title={title} content={content} />
      </>
    );
  } else {
    return (
      <>
        <InfoTitleWithTab
          title={title}
          content={content}
          page={page}
          handleChangeTab={handlechangeTab}
        />
      </>
    );
  }
}

function InfoTitle({ title, content }) {
  return (
    <>
      <div className={style.wrapSurveyInfo}>
        <p className={style.wrapTitle}>{title}</p>
        <p className={style.wrapContent}>{content}</p>
      </div>
    </>
  );
}

function InfoTitleWithTab({ title, content, page, handleChangeTab }) {
  return (
    <>
      <div className={style.wrapSurveyInfoWithTab}>
        <p className={style.wrapTitle}>{title}</p>
        <p className={style.wrapContent} style={{ marginBottom: "30px" }}>
          {content}
        </p>
        <ButtonTab
          handleChangeTab={handleChangeTab}
          page={page}
          first={"전체 통계"}
          second={"개별 응답"}
        />
      </div>
    </>
  );
}
