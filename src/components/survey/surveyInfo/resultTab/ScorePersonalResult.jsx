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

export default function ScorePersonalResult({ postId }) {
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
    // {
    //   questionId: 0,
    //   title: "",
    //   answers: [
    //     {
    //       answer: "",
    //       correct: "", //YES, NO, ''
    //     },
    //   ],
    // },
  ]);

  const [score, setScore] = useState({
    total: 0,
    get: 0,
  });

  useEffect(() => {
    console.log(resultData);
  }, [resultData]);

  useEffect(() => {
    // 설문 게시물 참가자 목록
    if (nickname !== 0) {
      call(`/survey/result/score/${surveyId}/${postId}/${nickname}`, "GET")
        .then((data) => {
          console.log("여기");
          handleMergeAnswers(data, (newData) => {
            setResultData(newData);
          });
        })
        .catch((error) => console.log(error));
    }
  }, [nickname]);

  useEffect(() => {
    if (postId !== "0") {
      call(`/survey/result/userList/${surveyId}/${postId}`, "GET")
        .then((data) => {
          setUserList(data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
    }
  }, [postId]);

  const handleSetUser = (nick) => {
    setNickname(nick);
  };

  const handleMergeAnswers = (userAnswers, callback) => {
    const result = [];

    let totalScore = 0;
    let totalGetScore = 0;

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

      const hasNoCorrect = !updateAnswer.some((ans) => ans.correct === "NO");
      const hasAtLeastOneYes = updateAnswer.some(
        (ans) => ans.correct === "YES"
      );

      const questionGetScore =
        hasNoCorrect && hasAtLeastOneYes ? question.score : 0;

      result.push({
        questionId: question.questionId,
        title: question.surveyQuestion,
        score: question.score,
        getScore: questionGetScore,
        answers: updateAnswer,
      });

      totalGetScore += questionGetScore;
      totalScore += question.score;
    });

    setScore({
      total: totalScore,
      get: totalGetScore,
    });

    callback(result);
  };

  if (postId === "0") {
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
        <UserList userList={userList} setUser={handleSetUser} />

        <div className={style.selectPost}>
          <p>응답자를 선택해주세요.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <UserList userList={userList} setUser={handleSetUser} />

      <div>
        <p className={style.totalScore}>
          총점 : {score.get} / {score.total}
        </p>
      </div>

      {resultData.map((question, index) => {
        return (
          <>
            <QuestionBox key={index} score>
              <QuestionTitle title={question.title} />
              <OptionBox>
                {/* {matchingQuestion ? ( */}
                <>
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
                </>
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
        );
      })}
    </>
  );
}
