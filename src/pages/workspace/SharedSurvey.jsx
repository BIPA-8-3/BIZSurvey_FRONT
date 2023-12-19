import { useEffect, useState } from "react";
import SurveyForm from "../../components/surveyCommunity/survey/SurveyForm";
import { useLocation, useNavigate } from "react-router-dom";
import call from "./api";
import useFadeIn from "../../style/useFadeIn";
import style from "../../style/workspace/SharedSurvey.module.css";
import SurveyTitle from "../../components/survey/surveyInfo/SurveyTitle";
import SharedFooter from "../../components/workspace/SharedFooter";
import Button from "@mui/material/Button";

export default function SharedSurvey() {
  const { state } = useLocation();
  const { token, sharedSurveyId, surveyId } = state;
  const fadeIn = useFadeIn();
  const navigate = useNavigate();
  const [pass, setPass] = useState([]);

  // 설문지 데이터 [ 나의 설문 구조에 맞게 수정 ]
  const [survey, setSurvey] = useState([]);

  // 처음 렌더링 시 조회 및 pass true 처리
  useEffect(() => {
    if (state) {
      call("/survey/" + surveyId, "GET")
        .then((data) => {
          setSurvey(data);
        })
        .then(() => {
          const newPassArray = Array(survey.questions.length).fill(true);
          setPass(newPassArray);
        })
        .catch((error) => {
          console.log(error);
          console.log(error.response);
        });
    }
  }, []);

  // [커뮤니티 답변 DTO]  사용자 입력 데이터 [수정 필요] | 햇음
  const [answers, setAnswers] = useState([
    {
      questionId: 0,
      surveyAnswer: [],
      answerType: "",
      url: "",
    },
  ]);
  // 답변 설정 ( SurveyQuestion 사용함 )
  const handleSetAnswer = (questionId, userAnswer, answerType, url) => {
    // 현재 값의 복사 값으로 맵핑 진행
    setAnswers((pre) => {
      // 기존 Answers의 답변과 사용자가 체크한 답변을 비교
      const existingAnswer = pre.find((ans) => ans.questionId === questionId);

      // 질문을 찾았을떄
      if (existingAnswer) {
        return pre.map((ans) =>
          ans.questionId === questionId ? { ...ans, surveyAnswer: [...userAnswer], url: url } : ans
        );
      } else {
        return [
          ...pre,
          {
            questionId: questionId,
            surveyAnswer: [...userAnswer],
            answerType: answerType,
            url: url,
          },
        ];
      }
    });
  };

  // 응답 저장 [ 수정 필요 ] |
  const handleSubmitAnswer = async () => {
    // 필수 체크 검사
    const res = handleCheckAnswer();

    // 필수 체크에 답을 안했을때
    if (!res) {
      alert("필수 질문에 응답해주세요.");
      return;
    }
    // 필수 통과
    else {
      let result = answers.filter(
        (answer) =>
          answer.questionId !== 0 &&
          answer.surveyAnswer.length > 0 &&
          !answer.surveyAnswer.includes("")
      );

      try {
        result = {
          surveyId: sharedSurveyId,
          token: token,
          sharedAnswerList: [...result],
        };

        const response = await call("/workspace/shared-survey/survey", "POST", result);
        navigate("/authorization/result/external", {
          state: { message: "설문 참여를 완료하였습니다." },
        });
      } catch (error) {
        console.log("error", error);
        console.log("error", error.response);
        navigate("/authorization/result/external", {
          state: { message: error },
        });
      }
    }
  };

  // 저장 요청 시 실행 메소드, 필수 체크 Temp true로 초기화 후 검사 하는 메소드
  const handleCheckAnswer = () => {
    let result = true;
    let newPassArray = Array(survey.questions.length).fill(true);
    console.log("survey", survey);
    survey.questions.map((question, index) => {
      if (question.isRequired) {
        const match = answers.find((ans) => ans.questionId === question.questionId);

        if (
          !match ||
          !match.surveyAnswer ||
          match.surveyAnswer.length < 1 ||
          match.surveyAnswer[0] === ""
        ) {
          newPassArray[index] = false;
          setPass(newPassArray);
          console.log(match);
          return false;
        }
      }
    });

    setPass(newPassArray);
    return result;
  };

  return (
    <div className={style.container}>
      <div>
        <SurveyTitle title={survey.title} content={survey.content} />
        <SurveyForm
          survey={survey}
          handleSetAnswer={handleSetAnswer}
          pass={pass}
          type={"EXTERNAL"}
        />
        <div className={style.surveyBtnWrap}>
          <Button
            variant="contained"
            onClick={(e) => {
              handleSubmitAnswer();
            }}
          >
            제출
          </Button>
          <Button>양식 초기화</Button>
        </div>
      </div>
      <SharedFooter />
    </div>
  );
}
