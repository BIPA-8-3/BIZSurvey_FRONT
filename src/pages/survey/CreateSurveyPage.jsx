import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import * as React from "react";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import EditSurveyTitle from "../../components/survey/surveyForm/EditSurveyTitle";
import QuestionComp from "../../components/survey/surveyForm/QuestionComp";
import style from "../../style/survey/CreatePage.module.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import call from "../workspace/api";
import { useWorkspaceContext } from "../workspace/WorkspaceContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function CreateSurveyPage() {
  const { selectedWorkspaceId } = useWorkspaceContext();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "제목",
    content: "설명",
    surveyType: "NORMAL",
    questions: [],
  });

  const [questions, setQuestions] = useState([
    {
      surveyQuestion: "질문",
      answerType: "SINGLE_CHOICE",
      score: 0,
      step: 1,
      isRequired: false,
      answers: [
        {
          step: 0,
          surveyAnswer: "옵션 1",
        },
      ],
    },
  ]);

  const [answerPass, setAnswerPass] = useState(true);

  useEffect(() => {
    console.log("questions변경됨", questions);
  }, [questions]);

  // 드래그 정렬
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = [...questions];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    console.log("드래그됨", items);
    setQuestions(items);
  };

  // 설문 제출
  const handleSubmitSurvey = async (e) => {
    e.preventDefault();
    if (!answerPass) {
      alert("중복 답변은 입력할 수 없습니다.");
      return;
    }
    const questionData = questions.map((question, index) => ({
      ...question,
      step: index + 1,
      answers:
        question.answerType === "SINGLE_CHOICE" ||
        question.answerType === "MULTIPLE_CHOICE"
          ? question.answers.map((answer, answerIndex) => ({
              ...answer,
              step: answerIndex + 1,
            }))
          : [],
    }));
    const surveyData = { ...formData };
    surveyData.questions = questionData;
    console.log("최종데이터입니다.", surveyData);
    call("/survey/" + selectedWorkspaceId, "POST", surveyData).then((data) => {
      navigate("/workspace");
      console.log("저장 완료, ", data);
    });
  };

  // 설문지 제목
  const changeSurveyTitle = (text) => {
    setFormData((pre) => ({ ...pre, title: text }));
  };

  // 설문지 설명
  const changeSurveyContent = (text) => {
    setFormData((pre) => ({ ...pre, content: text }));
  };

  // 질문 추가 (기본 객관식)
  const addQuestion = () => {
    setQuestions((pre) => {
      return [
        ...pre,
        {
          surveyQuestion: "질문",
          answerType: "SINGLE_CHOICE",
          score: 0,
          step: 0,
          isRequired: false,
          answers: [
            {
              step: 0,
              surveyAnswer: "옵션 1",
            },
          ],
        },
      ];
    });
  };

  // 질문 제목 변경
  const changeQuestionTitle = (id, text) => {
    setQuestions((pre) => {
      const result = pre.map((question, index) =>
        index === id ? { ...question, surveyQuestion: text } : question
      );
      return result;
    });
  };

  // 질문 삭제
  const deleteQuestion = (id) => {
    if (questions.length > 1) {
      setQuestions((pre) => {
        const result = pre
          .filter((question, index) => index !== id)
          .map((question, index) => ({ ...question }));
        return result;
      });
    } else {
      return;
    }
  };

  // 옵션 변경
  const changeOption = (id, type) => {
    setQuestions((pre) => {
      const result = pre.map((question, index) =>
        index === id ? { ...question, answerType: type } : question
      );
      return result;
    });
  };

  // 필수 변경
  const changeRequired = (id) => {
    setQuestions((pre) => {
      const result = pre.map((question, index) =>
        index === id
          ? { ...question, isRequired: !question.isRequired }
          : question
      );
      return result;
    });
  };

  // 객관식 옵션 추가
  const handleAddOption = (qid) => {
    setQuestions((prevQuestions) => {
      return prevQuestions.map((question, index) => {
        if (index === qid) {
          const updatedQuestion = {
            ...question,
            answers: [
              ...question.answers,
              {
                step: 0,
                surveyAnswer: "옵션 " + String(question.answers.length + 1),
              },
            ],
          };
          return updatedQuestion;
        }
        return question;
      });
    });
  };

  // 객관식 옵션 삭제
  const handleDeleteOption = (qid, aid) => {
    setQuestions((prevQuestions) => {
      return prevQuestions.map((question, index) => {
        if (index === qid) {
          const updatedAnswers = question.answers.filter(
            (answer, answerIndex) => answerIndex !== aid
          );
          const updatedQuestion = { ...question, answers: updatedAnswers };
          return updatedQuestion;
        }
        return question;
      });
    });
  };

  // 옵션 내용 변경
  const handleChangeOptionText = (qid, aid, text) => {
    setQuestions((prevQuestions) => {
      return prevQuestions.map((question, index) => {
        if (index === qid) {
          const updatedAnswers = question.answers.map((answer, answerIndex) => {
            if (answerIndex === aid) {
              return { ...answer, surveyAnswer: text };
            }
            return answer;
          });
          const updatedQuestion = { ...question, answers: updatedAnswers };
          return updatedQuestion;
        }
        return question;
      });
    });
  };

  return (
    <>
      <div className={style.container} style={{ paddingBottom: "30px" }}>
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
                      key={index}
                      draggableId={`question-${index}`}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                        >
                          <div className={style.question}>
                            <QuestionComp
                              key={index}
                              index={index}
                              questionInfo={questionData}
                              changeTitle={changeQuestionTitle}
                              changeOption={changeOption}
                              deleteQuestion={deleteQuestion}
                              changeRequired={changeRequired}
                              provided={provided}
                              addAnswer={handleAddOption}
                              deleteAnswer={handleDeleteOption}
                              changeAnswerText={handleChangeOptionText}
                              answerPass={setAnswerPass}
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
            <span style={{ marginRight: "8px" }}>
              <Button
                variant="outlined"
                sx={{ color: "#243579", borderColor: "#243579" }}
                onClick={(e) => {
                  navigate("/workspace");
                }}
              >
                취소
              </Button>
            </span>
            <span>
              <Button
                sx={{
                  backgroundColor: "#243579",
                  height: "36.99px",
                }}
                variant="contained"
                onClick={(e) => handleSubmitSurvey(e)}
              >
                완료
              </Button>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
