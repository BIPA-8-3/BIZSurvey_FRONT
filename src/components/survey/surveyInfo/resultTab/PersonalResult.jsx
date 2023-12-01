import UserList from "./UserList";
import OptionBox from "./totalOptions/OptionBox";
import TextList, { Text } from "./totalOptions/TextList";
import QuestionBox from "../QuestionBox";
import QuestionTitle from "../QuestionTitle";
import ChoiceField from "../../fields/ChoiceField";
import { File } from "./totalOptions/FileList";
import DateInfo from "../infoOptions/DateInfo";

export default function PersonalResult() {
  return (
    <>
      <UserList></UserList>

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
