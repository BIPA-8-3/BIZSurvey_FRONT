import UserList from "./UserList";
import OptionBox from "./totalOptions/OptionBox";
import TextList, { Text } from "./totalOptions/TextList";
import QuestionBox from "../QuestionBox";
import QuestionTitle from "../QuestionTitle";
import ChoiceField from "../../fields/ChoiceField";
import { File } from "./totalOptions/FileList";
import DateInfo from "../infoOptions/DateInfo";
import { useContext, useEffect, useState } from "react";
import { call } from "../../../../pages/survey/Login";
import { SurveyContext } from "../../../../pages/survey/SurveyInfoPage";
import ScoreResultOption from "./personalOption/ScoreResultOption";
import style from "../../../../style/survey/ScorePersonalResult.module.css";
import {
  getSharedContactList,
  getdPersonalScoreResult,
} from "../../../../pages/workspace/api";

export default function ScorePersonalResult({ sharedId, sharedType }) {
  const { survey } = useContext(SurveyContext);
  const { surveyId, questions, ...other } = survey;

  const [nickname, setNickname] = useState(0);
  const [userList, setUserList] = useState([
    {
      userId: 0,
      nickname: "",
    },
  ]);
  //   const [answers, setAnswers] = useState([
  //     // {
  //     //   questionId: 0,
  //     //   answer: [],
  //     //   url: "",
  //     //   questionType: "",
  //     //   answerType: "",
  //     // },
  //   ]);

  const [resultData, setResultData] = useState([
    {
      questionId: 0,
      title: "",
      answers: [
        {
          answer: "",
          correct: "", //YES, NO, ''
        },
      ],
    },
  ]);

  const [score, setScore] = useState({
    total: 0,
    get: 0,
  });

  useEffect(() => {
    // 설문 게시물 참가자 목록
    if (nickname !== 0) {
      switch (sharedType) {
        case "INTERNAL":
          call(
            `/survey/result/score/${surveyId}/${sharedId}/${nickname}`,
            "GET"
          )
            .then((data) => {
              handleMergeAnswers(data, (newData) => {
                setResultData(newData);
              });
            })
            .catch((error) => console.log(error));
          break;
        case "EXTERNAL":
          getdPersonalScoreResult(nickname)
            .then((data) => {
              handleMergeAnswers(data, (newData) => {
                setResultData(newData);
              });
            })
            .catch((error) => console.log(error));
          break;
      }
    }
  }, [nickname]);

  useEffect(() => {
    if (sharedId !== 0) {
      switch (sharedType) {
        case "INTERNAL":
          call(`/survey/result/userList/${surveyId}/${sharedId}`, "GET")
            .then((data) => {
              setUserList(data);
            })
            .catch((error) => {
              console.log(error);
            });
          break;
        case "EXTERNAL":
          getSharedContactList(sharedId)
            .then((data) => {
              setUserList(data);
            })
            .catch((error) => {
              console.log(error);
            });
          break;
      }
    } else {
    }
  }, [sharedId]);

  const handleSetUser = (nick) => {
    setNickname(nick);
  };

  const handleMergeAnswers = (userAnswers, callback) => {
    // 결과 배열
    const result = [];

    // 총점 저장
    let totalScore = 0;
    let totalGetScore = 0;

    // 실제 설문지의 문제 기준으로 사용자 답변을 비교하며 점수 산출
    questions.map((question) => {
      const userAnswer = userAnswers.find(
        (ans) => ans.questionId === question.questionId
      );

      const updateAnswer = question.answers.map((ans) => {
        const isUserAnswer =
          userAnswer && userAnswer.userAnswer.includes(ans.surveyAnswer);

        return {
          answer: ans.surveyAnswer,
          correct: isUserAnswer ? ans.correct : "",
        };
      });

      // 하나라도 NO가 잇는지 (없으면 True)
      const hasNoCorrect = !updateAnswer.some((ans) => ans.correct === "NO");

      // 하나라도 yes가 잇는지
      const hasAtLeastOneYes = updateAnswer.some(
        (ans) => ans.correct === "YES"
      );

      // yse가 잇고 NO가 없으면 점수, 아니면 0
      const questionGetScore =
        hasNoCorrect && hasAtLeastOneYes ? question.score : 0;

      result.push({
        questionId: question.questionId,
        title: question.surveyQuestion,
        score: question.score,
        getScore: questionGetScore,
        answers: updateAnswer,
      });

      // 나의 총점
      totalGetScore += questionGetScore;

      // 원래 총점
      totalScore += question.score;
    });

    // 모든 질문으로 파싱 후 점수 저장
    setScore({
      total: totalScore,
      get: totalGetScore,
    });

    // 콜백
    callback(result);
  };

  if (sharedId === 0) {
    return (
      <>
        <div className={style.selectPost}>
          <p>게시물을 선택해주세요.</p>
        </div>
      </>
    );
  }

  if (nickname === 0) {
    return (
      <>
        {userList.length !== 0 ? (
          <UserList
            userList={userList}
            setUser={handleSetUser}
            sharedType={sharedType}
          />
        ) : null}

        <div className={style.selectPost}>
          <p>응답자를 선택해주세요.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <UserList
        userList={userList}
        setUser={handleSetUser}
        sharedType={sharedType}
      />

      <div>
        <p className={style.totalScore}>
          총점 : {score.get} / {score.total}
        </p>
      </div>

      {resultData.map((question, index) => (
        <>
          <QuestionBox key={index} score>
            <QuestionTitle title={question.title} />
            <OptionBox>
              {/* {matchingQuestion ? ( */}

              {question.answers.map((answer, index) => (
                // <ChoiceField
                //   key={index}
                //   text={answer.answer}
                //   select={matchingQuestion.answer.includes(
                //     answer.surveyAnswer
                //   )}
                // />
                <ScoreResultOption
                  key={index}
                  text={answer.answer}
                  correct={answer.correct}
                />
              ))}

              {/* // ) : (
                //   <>
                //     <p
                //       style={{
                //         fontSize: "14px",
                //         paddingTop: "10px",
                //         color: "grey",
                //       }}
                //     >
                //       사용자 응답이 없습니다.
                //     </p>
                //   </>
                // )} */}
              <p className={style.score}>
                {question.getScore} / {question.score}
              </p>
            </OptionBox>
          </QuestionBox>
        </>
      ))}
    </>
  );
}
