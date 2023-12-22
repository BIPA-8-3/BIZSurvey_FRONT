import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import EditSurveyTitle from "../../components/survey/surveyForm/EditSurveyTitle";
import QuestionComp from "../../components/survey/surveyForm/QuestionComp";
import style from "../../style/survey/EditSurveyPage.module.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import call from "../workspace/api";

export default function EditSurveyPage() {
  // state
  const navigate = useNavigate();
  const location = useLocation();
  let surveyId = location.state.surveyId || 0;
  const [formData, setFormData] = useState({
    surveyId: 0,
    title: "설문지 제목",
    content: "설문지 내용",
    surveyType: "NORMAL",
    questions: [],
  });

  const [questions, setQuestions] = useState([
    {
      questionId: 0,
      surveyQuestion: "",
      answerType: "",
      score: 0,
      step: 0,
      isRequired: false,
      answers: [],
    },
  ]);

  // effect
  useEffect(() => {
    console.log(surveyId);
    handleGetSurvey(surveyId);
  }, []);

  // functions
  const handleGoBack = () => {
    navigate(-1);
  };

  // 드래그 정렬
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = [...questions];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setQuestions(items);
  };

  // 설문 가져오기
  const handleGetSurvey = async (surveyId) => {
    try {
      const data = await call(`/survey/${surveyId}`, "GET");
      setFormData(data);

      let newArr = [];
      for (const question of data.questions) {
        let modifiedAnswers = [];
        modifiedAnswers = question.answers
          .filter((answer) => answer.answerId !== null) // null이 아닌 것만 필터링
          .map((answer) => ({
            answerId: answer.answerId,
            surveyAnswer: answer.surveyAnswer,
            step: answer.step,
            correct: answer.correct,
          }));

        // question 객체를 새로운 배열에 추가 (answers를 수정한 버전으로)
        newArr.push({
          questionId: question.questionId,
          surveyQuestion: question.surveyQuestion,
          answerType: question.answerType,
          score: question.score,
          step: question.step,
          isRequired: question.isRequired,
          answers: modifiedAnswers,
        });
      }
      setQuestions(newArr);
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  // 설문 제출
  const handleUpdateSurvey = async (surveyId) => {
    const { createQuestion, updateQuestion } = questions.reduce(
      (acc, question, index) => {
        const { questionId, ...rest } = {
          ...question,
          step: index + 1,
          answers:
            question.answerType === "SINGLE_CHOICE" ||
            question.answerType === "MULTIPLE_CHOICE"
              ? question.answers
              : [],
        };

        if (questionId === 0) {
          acc.createQuestion.push(rest);
        } else {
          acc.updateQuestion.push({
            ...question,
            step: index + 1,
            answers:
              question.answerType === "SINGLE_CHOICE" ||
              question.answerType === "MULTIPLE_CHOICE"
                ? question.answers
                : [],
          });
        }

        return acc;
      },
      { createQuestion: [], updateQuestion: [] }
    );

    const surveyData = {
      ...formData,
      questions: undefined, // questions 필드 없애기
      updateQuestions: updateQuestion,
      createQuestions: createQuestion,
    };

    await call(`/survey/${surveyId}`, "PATCH", surveyData)
      .then((response) => {
        console.log(response);
        alert(response);
        navigate("/workspace/info");
      })
      .catch((error) => console.log(error));
  };

  // 질문 제목
  const changeQuestionTitle = (id, text) => {
    setQuestions((pre) => {
      const result = pre.map((question, index) =>
        index === id ? { ...question, surveyQuestion: text } : question
      );
      return result;
    });
  };

  // 옵션 변경
  const changeOption = (id, type) => {
    setQuestions((pre) => {
      const result = pre.map((question, index) => {
        if (index === id) {
          if (type === "SINGLE_CHOICE" || type === "MULTIPLE_CHOICE") {
            return {
              ...question,
              answerType: type,
              answers: [
                {
                  step: 0,
                  surveyAnswer: "옵션 1",
                },
              ],
            };
          } else {
            return { ...question, answerType: type };
          }
        } else {
          return question;
        }
      });
      return result;
    });
  };

  // 질문 삭제
  const deleteQuestion = (id) => {
    setQuestions((pre) => {
      const result = pre
        .filter((question, index) => index !== id)
        .map((question, index) => ({ ...question }));
      return result;
    });
  };

  // 질문 추가
  const addQuestion = () => {
    setQuestions((pre) => {
      return [
        ...pre,
        {
          questionId: 0,
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

  // 필수 여부
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

  // 설문 제목
  const changeSurveyTitle = (text) => {
    setFormData((pre) => ({ ...pre, title: text }));
  };

  // 설문 설명
  const changeSurveyContent = (text) => {
    setFormData((pre) => ({ ...pre, content: text }));
  };

  // 옵션 추가
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

  // 옵션 제거
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

  // 옵션 내용
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
      {/* <div className={style.container}> */}
      <div className={style.wrapContent}>
        <EditSurveyTitle
          title={formData.title}
          content={formData.content}
          changeSurveyTitle={changeSurveyTitle}
          changeSurveyContent={changeSurveyContent}
        />

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
                      <div ref={provided.innerRef} {...provided.draggableProps}>
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

        <IconButton aria-label="delete" size="medium" onClick={addQuestion}>
          <FaPlus />
        </IconButton>

        <div className={style.wrapButton}>
          <span style={{ marginRight: "8px" }}>
            <Button
              variant="outlined"
              onClick={handleGoBack}
              sx={{ color: "#243579", borderColor: "#243579" }}
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
              onClick={() => handleUpdateSurvey(surveyId)}
            >
              완료
            </Button>
          </span>
        </div>
      </div>
      {/* </div> */}
    </>
  );
}
