import { useContext, useState } from "react";
import SurveyTitle from "../SurveyTitle";
import SurveyPostSelect from "./SurvePostSelect";
import { useEffect } from "react";
import call from "../../../../pages/workspace/api";
import { SurveyContext } from "../../../../pages/survey/SurveyInfoPage";
import { getSharedSurveyHistory } from "../../../../pages/workspace/api";
import PersonalResult from "./PersonalResult";
import PostResult from "./PostResult";
import ScorePersonalResult from "./ScorePersonalResult";
import ScorePostResult from "./ScorePostResult";

export default function ResultView() {
  const { survey } = useContext(SurveyContext);

  // 게시물 통계 , 사용자 응답 구별
  const [isPersonal, setIsPersonal] = useState(0);
  const [sharedId, setSharedId] = useState(0);
  const [sharedUnit, setSharedUnit] = useState([
    // {
    //   sharedId: 0,
    //   title: "",
    // },
  ]);
  const [isScore, setIsScore] = useState(false);
  // 외부 / 커뮤니티 구분
  const [sharedType, setSharedType] = useState("INTERNAL");

  useEffect(() => {
    setSharedId(0);
    setSharedUnit([]);
    switch (sharedType) {
      case "INTERNAL":
        call("/survey/result/postList/" + survey.surveyId, "GET")
          .then((data) => setSharedUnit(data))
          .catch((error) => console.log(error));
        break;
      case "EXTERNAL":
        getSharedSurveyHistory(survey.surveyId)
          .then((data) => {
            setSharedUnit(data);
          })
          .catch((error) => console.log(error));
        break;
    }
  }, [sharedType]);

  useEffect(() => {
    if (survey.surveyType === "SCORE") {
      setIsScore(true);
    } else {
      setIsScore(false);
    }
  }, [survey]);

  const handleChangeTab = (e, num) => {
    e.preventDefault();
    setIsPersonal(num);
  };

  return (
    <>
      {/* 응답 결과 탭의 모든 컴포넌트 집합  */}

      {/* 게시물 선택 & 외부 및 커뮤니티 구분*/}
      <SurveyPostSelect
        sharedUnit={sharedUnit}
        sharedId={sharedId}
        setSharedId={setSharedId}
        sharedType={sharedType}
        setSharedType={setSharedType}
      />

      {/* 전체 / 개별 선택 탭  */}
      <SurveyTitle
        tab
        handlechangeTab={handleChangeTab}
        page={isPersonal}
        title={survey.title}
        content={survey.content}
      />

      {/* 질문과 옵션들  */}

      {isScore ? (
        isPersonal ? (
          <ScorePersonalResult sharedId={sharedId} sharedType={sharedType} />
        ) : (
          <ScorePostResult sharedId={sharedId} sharedType={sharedType} />
        )
      ) : isPersonal ? (
        <PersonalResult sharedId={sharedId} sharedType={sharedType} />
      ) : (
        <PostResult sharedId={sharedId} sharedType={sharedType} />
      )}
    </>
  );
}
