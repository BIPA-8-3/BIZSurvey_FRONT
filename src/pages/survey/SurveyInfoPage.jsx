import * as React from "react";
import { useEffect, useState } from "react";
import SurveyInfo from "../../components/survey/surveyInfo/infoTab/SurveyInfo";
import axios from "axios";
import ButtonTab from "../../components/survey/surveyInfo/ButtonTab";
import ResultView from "../../components/survey/surveyInfo/resultTab/ResultView";

export default function SurveyInfoPage() {
  const [page, setPage] = useState(0);
  const [element, setElement] = useState(<></>);
  const [loading, setLoading] = useState(true);

  const [survey, setSurvey] = useState({
    surveyId: 0,
    title: "",
    content: "",
    surveyType: "",
    questions: [],
  });

  useEffect(() => {
    handleGetSurvey(10);
  }, []);

  useEffect(() => {
    if (page) {
      setElement(<ResultView />);
    } else {
      setElement(loading ? <></> : <SurveyInfo survey={survey} />);
    }
  }, [page, survey, loading]);

  const handleGetSurvey = async (surveyId) => {
    setLoading(true); // 데이터 로딩 시작

    try {
      const response = await axios.get("/survey/" + surveyId);
      setSurvey(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // 데이터 로딩 완료
    }
  };

  const handleChangeTab = (e, num) => {
    e.preventDefault();
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
