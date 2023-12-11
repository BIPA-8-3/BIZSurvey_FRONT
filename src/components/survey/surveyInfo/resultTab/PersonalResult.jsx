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

export default function PersonalResult({ postId }) {
  const { survey } = useContext(SurveyContext);
  const { surveyId, questions, ...other } = survey;

  const [nickname, setNickname] = useState(0);
  const [userList, setUserList] = useState([
    {
      userId: 0,
      nickname: "",
    },
  ]);
  const [answers, setAnswers] = useState([
    // {
    //   questionId: 0,
    //   answer: [],
    //   url: "",
    //   questionType: "",
    //   answerType: "",
    // },
  ]);

  useEffect(() => {
    console.log("여긴 answers");
    console.log(answers);
    console.log("여긴 실제 questions");
    console.log(questions);
  }, [answers]);

  useEffect(() => {
    // 설문 게시물 참가자 목록
    if (nickname !== 0) {
      call(`/survey/result/${surveyId}/${postId}/${nickname}`, "GET")
        .then((data) => {
          console.log("여기");
          handleMergeAnswers(data, (newData) => {
            setAnswers(newData);
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

  const handleMergeAnswers = (answers, callback) => {
    const resultMap = new Map();

    answers.forEach((answer) => {
      console.log("데이터처리" + answer.answer);
      const { questionId, answer: answerValue } = answer;

      if (!resultMap.has(questionId)) {
        resultMap.set(questionId, { ...answer, answer: [answerValue] });
      } else {
        resultMap.get(questionId).answer.push(answerValue);
      }
    });

    const mergedAnswers = Array.from(resultMap.values());
    console.log("mergeData");
    console.log(mergedAnswers);

    callback(mergedAnswers);
  };

  if (postId === "0") {
    return (
      <>
        <p>게시물을 선택해주세요.</p>
      </>
    );
  }

  if (nickname === 0) {
    return (
      <>
        <UserList userList={userList} setUser={handleSetUser} />

        <p>응답자를 선택해주세요.</p>
      </>
    );
  }

  return (
    <>
      <UserList userList={userList} setUser={handleSetUser} />

      {questions.map((question, index) => {
        const matchingQuestion = answers.find(
          (ans) => ans.questionId === question.questionId
        );

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
                          select={matchingQuestion.answer.includes(
                            answer.surveyAnswer
                          )}
                        />
                      ))}

                    {question.answerType === "MULTIPLE_CHOICE" &&
                      matchingQuestion.answerType !== "FILE" &&
                      question.answers.map((answer, index) => (
                        <ChoiceField
                          key={index}
                          text={answer.surveyAnswer}
                          select={matchingQuestion.answer.includes(
                            answer.surveyAnswer
                          )}
                        />
                      ))}

                    {(question.answerType === "TEXT" ||
                      question.answerType === "CALENDAR") &&
                      matchingQuestion.answerType !== "FILE" &&
                      matchingQuestion.answer.map((answer, index) => (
                        <Text key={index} value={answer} personal />
                      ))}

                    {question.answerType === "FILE" &&
                      matchingQuestion.answerType === "FILE" && (
                        <File
                          filename={matchingQuestion.answer[0]}
                          url={matchingQuestion.answer.url}
                        />
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
      })}
    </>
  );
}
