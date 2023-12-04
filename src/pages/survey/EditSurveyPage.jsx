import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import EditSurveyTitle from "../../components/survey/surveyForm/EditSurveyTitle";
import QuestionComp from "../../components/survey/surveyForm/QuestionComp";
import style from "../../style/survey/EditSurveyPage.module.css";
import axios from "axios";
import { useEffect } from "react";

export default function EditSurveyPage() {
  const [formData, setFormData] = useState({
    surveyId: 0,
    title: "설문지 제목",
    content: "설문지 내용",
    surveyType: "기본",
    questions: [],
  });

  const [questions, setQuestions] = useState([
    {
      surveyQuestion: "",
      answerType: "",
      score: 0,
      step: 0,
      isRequired: false,
      answers: [],
    },
  ]);

  useEffect(() => {
    handleGetSurvey(7);
  }, []);

  const handleGetSurvey = async (surveyId) => {
    try {
      const response = await axios.get("/survey/" + surveyId);
      setFormData(response.data);
      setQuestions(response.data.questions);
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  const handleUpdateSurvey = async (surveyId) => {
    await axios
      .patch("/survey/" + surveyId)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));
  };

  const changeQuestionTitle = (id, text) => {
    setQuestions((pre) => {
      const result = pre.map((question, index) =>
        question.step === id
          ? { ...question, surveyQuestion: text, step: index + 1 }
          : question
      );
      return result;
    });
  };

  const changeQuestionContent = (id, text) => {
    setQuestions((pre) => {
      const result = pre.map((question, index) =>
        question.step === id
          ? { ...question, content: text, step: index + 1 }
          : question
      );
      return result;
    });
  };

  const changeOption = (id, type) => {
    setQuestions((pre) => {
      const result = pre.map((question, index) =>
        question.step === id
          ? { ...question, answerType: type, step: index + 1, answers: [] }
          : question
      );
      return result;
    });
  };

  const deleteQuestion = (id) => {
    setQuestions((pre) => {
      const result = pre
        .filter((question) => question.step !== id)
        .map((question, index) => ({ ...question, step: index + 1 }));
      return result;
    });
  };

  const addQuestion = () => {
    setQuestions((pre) => {
      const lastId = pre.length > 0 ? pre[pre.length - 1].step : 0;
      return [
        ...pre,
        {
          surveyQuestion: "",
          answerType: "",
          score: 0,
          step: lastId + 1,
          isRequired: false,
          answers: [],
        },
      ];
    });
  };

  const changeRequired = (id) => {
    setQuestions((pre) => {
      const result = pre.map((question, index) =>
        question.step === id
          ? { ...question, isRequired: !question.isRequired, step: index + 1 }
          : question
      );
      return result;
    });
  };

  const handleOption = (id, options) => {
    setQuestions((pre) => {
      const result = pre.map((question, index) =>
        question.step === id ? { ...question, answers: options } : question
      );
      return result;
    });
  };

  const changeSurveyTitle = (text) => {
    setFormData((pre) => ({ ...pre, title: text }));
  };

  const changeSurveyContent = (text) => {
    setFormData((pre) => ({ ...pre, content: text }));
  };

  return (
    <>
      <div className={style.container}>
        <div className={style.wrapContent}>
          <EditSurveyTitle
            title={formData.title}
            content={formData.content}
            changeSurveyTitle={changeSurveyTitle}
            changeSurveyContent={changeSurveyContent}
          />

          <div className={style.questionList}>
            {questions.map((questionData) => (
              <div className={style.question}>
                <QuestionComp
                  key={questionData.step}
                  index={questionData.step}
                  questionInfo={questionData}
                  changeTitle={changeQuestionTitle}
                  changeContent={changeQuestionContent}
                  changeOption={changeOption}
                  deleteQuestion={deleteQuestion}
                  changeRequired={changeRequired}
                  handleOption={handleOption}
                />
              </div>
            ))}
          </div>

          <IconButton aria-label="delete" size="medium" onClick={addQuestion}>
            <FaPlus />
          </IconButton>

          <div className={style.wrapButton}>
            <Button variant="outlined">취소</Button>
            <Button variant="contained" onClick={() => handleUpdateSurvey(7)}>
              완료
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
