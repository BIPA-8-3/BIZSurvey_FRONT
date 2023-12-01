import * as React from "react";
import { useEffect, useState } from "react";
import SurveyInfo from "../../components/survey/surveyInfo/infoTab/SurveyInfo";

import ButtonTab from "../../components/survey/surveyInfo/ButtonTab";
import ResultView from "../../components/survey/surveyInfo/resultTab/ResultView";

export default function SurveyInfoPage() {
  const [page, setPage] = useState(0);

  const [element, setElement] = useState(<></>);

  useEffect(() => {
    if (page) {
      setElement(<ResultView />);
    } else {
      setElement(<SurveyInfo />);
    }
    console.log(page);
  }, [page]);

  const handleChangeTab = (e, num) => {
    e.preventDefault();
    console.log("num" + num);
    setPage(num);
  };

  return (
    <>
      <div>
        <div style={{ width: "700px", margin: "0 auto" }}>
          <ButtonTab
            handleChangeTab={handleChangeTab}
            page={page}
            first={"설문지 폼"}
            second={"응답 결과"}
          ></ButtonTab>
        </div>

        <div>{element}</div>
      </div>
    </>
  );
}
