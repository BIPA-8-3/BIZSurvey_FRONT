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
        <div className={style.wrapSurveyInfo}>
          <p className={style.wrapTitle}>{title}</p>
          <p className={style.wrapContent}>{content}</p>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div
          className={style.wrapSurveyInfo}
          style={{
            paddingBottom: "0",
            height: "150px",
            paddingBottom: "4px",
            overflow: "hidden",
          }}
        >
          <p className={style.wrapTitle}>제목</p>
          <p className={style.wrapContent} style={{ marginBottom: "30px" }}>
            설명
          </p>
          <ButtonTab
            handleChangeTab={handlechangeTab}
            page={page}
            first={"전체 통계"}
            second={"개별 응답"}
          />
        </div>
      </>
    );
  }
}
