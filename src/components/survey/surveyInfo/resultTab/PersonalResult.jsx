import { useContext, useEffect, useState } from "react";
import call from "../../../../pages/workspace/api";
import { SurveyContext } from "../../../../pages/survey/SurveyInfoPage";
import { getPersonalResult, getSharedContactList } from "../../../../pages/workspace/api";
import ChoiceField from "../../fields/ChoiceField";
import QuestionBox from "../QuestionBox";
import QuestionTitle from "../QuestionTitle";
import UserList from "./UserList";
import { File } from "./totalOptions/FileList";
import OptionBox from "./totalOptions/OptionBox";
import { Text } from "./totalOptions/TextList";

export default function PersonalResult({ sharedType, sharedId }) {
  const { survey } = useContext(SurveyContext);
  const { surveyId, questions, ...other } = survey;

  const [user, setUser] = useState(0);
  const [userList, setUserList] = useState([
    // {
    //   userId: 0,
    //   nickname: "",
    // },
  ]);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    // 설문 게시물 참가자 목록
    if (user !== 0) {
      switch (sharedType) {
        case "INTERNAL":
          call(`/survey/result/${surveyId}/${sharedId}/${user}`, "GET")
            .then((data) => {
              handleMergeAnswers(data, (newData) => {
                setAnswers(newData);
              });
            })
            .catch((error) => console.log(error));
          break;
        case "EXTERNAL":
          getPersonalResult(user)
            .then((data) => {
              handleMergeAnswers(data, (newData) => {
                setAnswers(newData);
              });
            })
            .catch((error) => console.log(error));
          break;
      }
    }
  }, [user]);

  // 로딩 시 유저정보 조회
  useEffect(() => {
    if (sharedId) {
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
              setUserList(data.filter((user) => user.response > 0));
            })
            .catch((error) => {
              console.log(error);
            });
          break;
      }
    } else {
    }
  }, [sharedId]);

  const handleSetUser = (user) => {
    setUser(user);
  };

  const handleMergeAnswers = (answers, callback) => {
    const resultMap = new Map();

    answers.forEach((answer) => {
      const { questionId, answer: answerValue } = answer;

      if (!resultMap.has(questionId)) {
        resultMap.set(questionId, { ...answer, answer: [answerValue] });
      } else {
        resultMap.get(questionId).answer.push(answerValue);
      }
    });

    const mergedAnswers = Array.from(resultMap.values());

    callback(mergedAnswers);
  };

  if (sharedId === 0) {
    return (
      <>
        <div
          style={{
            width: "700px",
            margin: "0 auto",
            textAlign: "center",
            height: "300px",
            justifyContent: "center",
            alignItems: "center",
            lineHeight: "300px",
            fontSize: "15pt",
            fontStyle: "italic",
            color: "#d6d6d6",
          }}
        >
          <p>게시물을 선택해주세요.</p>
        </div>
      </>
    );
  }

  if (userList.length > 0) {
    if (user === 0) {
      return (
        <>
          <UserList userList={userList} setUser={handleSetUser} sharedType={sharedType} />
          <div
            style={{
              width: "700px",
              margin: "0 auto",
              textAlign: "center",
              height: "300px",
              justifyContent: "center",
              alignItems: "center",
              lineHeight: "300px",
              fontSize: "15pt",
              fontStyle: "italic",
              color: "#d6d6d6",
            }}
          >
            <p>응답자를 선택해주세요.</p>
          </div>
        </>
      );
    } else {
      return (
        <>
          <UserList userList={userList} setUser={handleSetUser} sharedType={sharedType} />
          {createAnswerItem(questions, answers)}
        </>
      );
    }
  } else {
    return (
      <>
        <div
          style={{
            width: "700px",
            margin: "0 auto",
            textAlign: "center",
            height: "300px",
            justifyContent: "center",
            alignItems: "center",
            lineHeight: "300px",
            fontSize: "15pt",
            fontStyle: "italic",
            color: "#d6d6d6",
          }}
        >
          <p>응답자가 존재하지 않습니다.</p>
        </div>
      </>
    );
  }
}

function createAnswerItem(questions, answers) {
  return questions.map((question, index) => {
    const matchingQuestion = answers.find((ans) => ans.questionId === question.questionId);
    return (
      <>
        <QuestionBox key={index}>
          <QuestionTitle title={question.surveyQuestion} />
          <OptionBox>
            {matchingQuestion ? (
              <>
                {question.answerType === "SINGLE_CHOICE" &&
                  matchingQuestion.answerType !== "FILE" &&
                  question.answers.map((answer, index) => (
                    <ChoiceField
                      key={index}
                      single
                      text={answer.surveyAnswer}
                      select={matchingQuestion.answer.includes(answer.surveyAnswer)}
                    />
                  ))}

                {question.answerType === "MULTIPLE_CHOICE" &&
                  matchingQuestion.answerType !== "FILE" &&
                  question.answers.map((answer, index) => (
                    <ChoiceField
                      key={index}
                      text={answer.surveyAnswer}
                      select={matchingQuestion.answer.includes(answer.surveyAnswer)}
                    />
                  ))}

                {(question.answerType === "TEXT" || question.answerType === "CALENDAR") &&
                  matchingQuestion.answerType !== "FILE" &&
                  matchingQuestion.answer.map((answer, index) => (
                    <Text key={index} value={answer} personal />
                  ))}

                {question.answerType === "FILE" && matchingQuestion.answerType === "FILE" && (
                  <File filename={matchingQuestion.answer[0]} url={matchingQuestion.url} />
                )}
              </>
            ) : (
              <>
                <p
                  style={{
                    fontSize: "14px",
                    paddingTop: "10px",
                    color: "grey",
                  }}
                >
                  사용자 응답이 없습니다.
                </p>
              </>
            )}
          </OptionBox>
        </QuestionBox>
      </>
    );
  });
}
