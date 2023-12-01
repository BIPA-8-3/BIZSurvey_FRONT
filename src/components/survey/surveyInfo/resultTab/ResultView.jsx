import { useState } from "react";
import SurveyTitle from "../SurveyTitle";
import SurveyPostSelect from "./SurvePostSelect";

import { useEffect } from "react";
import PersonalResult from "./PersonalResult";
import PostResult from "./PostResult";

export default function ResultView({ surveyInfo }) {
  // 게시물 통계 , 사용자 응답 구별
  const [isPersonal, setIsPersonal] = useState(0);

  const handleChangeTab = (e, num) => {
    e.preventDefault();
    console.log("num" + num);
    setIsPersonal(num);
  };

  useEffect(() => {
    if (isPersonal) {
      //개별 응답 api 요청
    } else {
      //게시물 통계 api 요청
    }
  }, [isPersonal]);

  return (
    <>
      {/* 응답 결과 탭의 모든 컴포넌트 집합  */}

      {/* 게시물 선택  */}
      <SurveyPostSelect />

      {/* 전체 / 개별 선택 탭  */}
      <SurveyTitle tab handlechangeTab={handleChangeTab} page={isPersonal} />

      {/* 질문과 옵션들  */}

      {isPersonal ? <PersonalResult /> : <PostResult />}
    </>
  );
}

// 게시물 통계
//         [

// {questionId:1,

// questionType : ‘객관식’,

// answers : [

// { answer : ‘asdfas’,

// count : 3}

// ]}

// ]

// 개인 통계
// [

//     {questionId : 1,

//     answer : ‘asdf’,

//     url: ‘fdasfasf’,

//     questionType : ‘객관식’,

//     answerType : ‘파일’

//     }

//     ]
