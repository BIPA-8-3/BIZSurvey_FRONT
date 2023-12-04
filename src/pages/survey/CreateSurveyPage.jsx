import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import * as React from "react";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import EditSurveyTitle from "../../components/survey/surveyForm/EditSurveyTitle";
import QuestionComp from "../../components/survey/surveyForm/QuestionComp";
import style from "../../style/survey/CreatePage.module.css";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useEffect } from "react";

export default function CreateSurveyPage() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    surveyType: "기본",
    questions: [],
  });

  const [questions, setQuestions] = useState([
    {
      surveyQuestion: "",
      answerType: "",
      score: 0,
      step: 1,
      isRequired: false,
      answers: [],
    },
  ]);

  useEffect(() => {
    console.log(questions);
  }, [questions]);

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = [...questions];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setQuestions(items);
  };

  const handleSaveSubmit = async (e) => {
    e.preventDefault();
    const questionData = questions.map((question, index) => ({
      ...question,
      step: index + 1,
    }));
    const surveyData = { ...formData };
    surveyData.questions = questionData;
    console.log(surveyData);
    await axios
      .post("/survey/1", surveyData)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
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
          ? { ...question, answerType: type, step: index + 1 }
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
          {/* 설문지 제목  */}
          <EditSurveyTitle
            title={formData.title}
            content={formData.content}
            changeSurveyTitle={changeSurveyTitle}
            changeSurveyContent={changeSurveyContent}
          />

          {/* 질문들  */}
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="createQuestions">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={style.questionList}
                >
                  {questions.map((questionData, index) => (
                    <Draggable
                      key={questionData.step}
                      draggableId={`question-${questionData.step}`}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                        >
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
                              provided={provided}
                            />
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>

          {/* 추가 버튼  */}
          <IconButton aria-label="delete" size="medium" onClick={addQuestion}>
            <FaPlus />
          </IconButton>

          {/* 저장 및 취소 버튼  */}
          <div className={style.wrapButton}>
            <Button variant="outlined">취소</Button>
            <Button variant="contained" onClick={(e) => handleSaveSubmit(e)}>
              완료
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
