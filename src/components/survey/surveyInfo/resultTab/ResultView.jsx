import { useContext, useState } from "react";
import SurveyTitle from "../SurveyTitle";
import SurveyPostSelect from "./SurvePostSelect";

import { useEffect } from "react";
import PersonalResult from "./PersonalResult";
import PostResult from "./PostResult";
import { SurveyContext } from "../../../../pages/survey/SurveyInfoPage";
import { call } from "../../../../pages/survey/Login";

export default function ResultView() {
  const { survey } = useContext(SurveyContext);
  // 게시물 통계 , 사용자 응답 구별
  const [isPersonal, setIsPersonal] = useState(0);
  const [postId, setPostId] = useState("0");
  const [post, setPost] = useState([
    // {
    //   postId: 0,
    //   title: "",
    // },
  ]);

  useEffect(() => {
    call("/survey/result/postList/" + survey.surveyId, "GET")
      .then((data) => setPost(data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (isPersonal) {
      //개별 응답 api 요청
    } else {
      //게시물 통계 api 요청
    }
  }, [isPersonal]);

  const handleChangeTab = (e, num) => {
    e.preventDefault();
    setIsPersonal(num);
  };

  return (
    <>
      {/* 응답 결과 탭의 모든 컴포넌트 집합  */}

      {/* 게시물 선택  */}
      <SurveyPostSelect postInfo={post} postId={postId} setPostId={setPostId} />

      {/* 전체 / 개별 선택 탭  */}
      <SurveyTitle
        tab
        handlechangeTab={handleChangeTab}
        page={isPersonal}
        title={survey.title}
        content={survey.content}
      />

      {/* 질문과 옵션들  */}

      {isPersonal ? (
        <PersonalResult postId={postId} />
      ) : (
        <PostResult postId={postId} />
      )}
    </>
  );
}
