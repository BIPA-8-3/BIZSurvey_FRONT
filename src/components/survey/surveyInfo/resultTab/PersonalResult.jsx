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

export default function PersonalResult() {
  const { survey } = useContext(SurveyContext);

  const [user, setUser] = useState(0);
  const [userList, setUserList] = useState([]);
  const [answer, setAnswer] = useState([
    {
      questionId: 0,
      answer: "",
      url: "",
      questionType: "",
      answerType: "",
    },
  ]);

  useEffect(() => {
    // 설문 게시물 참가자 목록
    call("/result/userList/{surveyId}/{postId}", "GET")
      .then((data) => {
        setUserList(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    // 응답 결과
    call("/result/{surveyId}/{postId}/{nickname}", "GET")
      .then((data) => {
        setAnswer(data);
      .catch((error) => console.log(error));
  });

  return (
    <>
      <UserList />

      {survey.questions.map((question) => (
        <QuestionBox>
          <QuestionTitle title={"객관식"} />
          <OptionBox>
            <ChoiceField single text={"옵션111"} />
            <ChoiceField single text={"옵션222"} />
            <ChoiceField single text={"옵션333"} select />
          </OptionBox>
        </QuestionBox>
      ))}
      <QuestionBox>
        <QuestionTitle title={"객관식"} />
        <OptionBox>
          <ChoiceField single text={"옵션111"} />
          <ChoiceField single text={"옵션222"} />
          <ChoiceField single text={"옵션333"} select />
        </OptionBox>
      </QuestionBox>

      <QuestionBox>
        <QuestionTitle title={"주관식"} />
        <OptionBox>
          <Text value={"짖ㅂ에 가고 싶습니다"} personal />
        </OptionBox>
      </QuestionBox>

      <QuestionBox>
        <QuestionTitle title={"파일"} />
        <OptionBox>
          <File filename={"파일명"} url={"http://..............."} />
        </OptionBox>
      </QuestionBox>

      <QuestionBox>
        <QuestionTitle title={"날짜"} />
        <OptionBox>
          <DateInfo value={"2029-03-34"} />
        </OptionBox>
      </QuestionBox>
    </>
  );
}
