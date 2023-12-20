import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import * as React from "react";
import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { FaPlus } from "react-icons/fa6";
import EditSurveyTitle from "../../components/survey/surveyForm/EditSurveyTitle";
import ScoreQuestion from "../../components/survey/surveyForm/ScoreQuestion";
import style from "../../style/survey/CreatePage.module.css";
import call from "../workspace/api";

export default function CreateScoreSurveyPage({
  selectedWorkspaceId,
  setSectionNum,
}) {
  const [formData, setFormData] = useState({
    title: "제목",
    content: "설명",
    surveyType: "SCORE",
    questions: [],
  });

  const [questions, setQuestions] = useState([
    {
      surveyQuestion: "질문",
      answerType: "MULTIPLE_CHOICE",
      score: 0,
      step: 1,
      isRequired: false,
      answers: [
        {
          step: 0,
          surveyAnswer: "옵션 1",
          correct: "NO",
        },
      ],
    },
  ]);

  const [pass, setPass] = useState(false);

  // useEffect(() => {
  //   login();
  // }, []);

  useEffect(() => {
    console.log(questions);
  }, [questions]);

  // const handleCheckDuplication = (idx, text) => {
  //   let isPass = true;
  //   const question = questions.find((q, index) => index === idx);
  //   const matchingAnswers = question.answers.filter(
  //     (ans) => ans.surveyAnswer === text
  //   );
  //   console.log(matchingAnswers.surveyAnswer, "anssssssssssss");
  //   if (matchingAnswers.length > 1) {
  //     isPass = false;
  //   }

  //   return isPass;
  // };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const updatedQuestions = Array.from(questions);
    const [reorderedQuestion] = updatedQuestions.splice(result.source.index, 1);
    updatedQuestions.splice(result.destination.index, 0, reorderedQuestion);

    setQuestions(updatedQuestions);
  };

  const handleSubmitSurvey = async (e) => {
    e.preventDefault();
    const questionData = questions.map((question, index) => ({
      ...question,
      step: index + 1,
      answers: question.answers.map((answer, answerIndex) => ({
        ...answer,
        step: answerIndex + 1,
      })),
    }));
    const surveyData = { ...formData };
    surveyData.questions = questionData;

    console.log(surveyData);

    call("/survey/" + selectedWorkspaceId, "POST", surveyData);
  };

  const changeQuestionTitle = (id, text) => {
    setQuestions((pre) => {
      const result = pre.map((question, index) =>
        index === id ? { ...question, surveyQuestion: text } : question
      );
      return result;
    });
  };

  // const changeQuestionContent = (id, text) => {
  //   setQuestions((pre) => {
  //     const result = pre.map((question, index) =>
  //       index === id ? { ...question, content: text } : question
  //     );
  //     return result;
  //   });
  // };

  const changeOption = (id, type) => {
    setQuestions((pre) => {
      const result = pre.map((question, index) =>
        index === id ? { ...question, answerType: type } : question
      );
      return result;
    });
  };

  const deleteQuestion = (id) => {
    setQuestions((pre) => {
      const result = pre
        .filter((question, index) => index !== id)
        .map((question, index) => ({ ...question }));
      return result;
    });
  };

  const addQuestion = () => {
    setQuestions((pre) => {
      return [
        ...pre,
        {
          surveyQuestion: "질문",
          answerType: "MULTIPLE_CHOICE",
          score: 0,
          step: 0,
          isRequired: false,
          answers: [
            {
              step: 0,
              surveyAnswer: "옵션 1",
              correct: "NO",
            },
          ],
        },
      ];
    });
  };

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

  // const handleOption = (id, options) => {
  //   setQuestions((pre) => {
  //     const result = pre.map((question, index) =>
  //       index === id ? { ...question, answers: options } : question
  //     );
  //     return result;
  //   });
  // };

  const changeSurveyTitle = (text) => {
    setFormData((pre) => ({ ...pre, title: text }));
  };

  const changeSurveyContent = (text) => {
    setFormData((pre) => ({ ...pre, content: text }));
  };

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
                correct: "NO",
              },
            ],
          };
          return updatedQuestion;
        }
        return question;
      });
    });
  };

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

  const handleChangeScore = (qid, score) => {
    setQuestions((pre) => {
      const result = pre.map((question, index) =>
        index === qid
          ? { ...question, score: isNaN(score) ? score : parseInt(score, 10) }
          : question
      );
      return result;
    });
  };

  const handleChangeCorrect = (qid, aid) => {
    setQuestions((pre) => {
      return pre.map((question, index) => {
        if (index === qid) {
          const updatedAnswers = question.answers.map((answer, answerIndex) => {
            if (answerIndex === aid) {
              return {
                ...answer,
                correct: answer.correct === "NO" ? "YES" : "NO",
              };
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
                            <ScoreQuestion
                              key={index}
                              index={index}
                              questionInfo={questionData}
                              changeTitle={changeQuestionTitle}
                              // changeContent={changeQuestionContent}
                              changeOption={changeOption}
                              deleteQuestion={deleteQuestion}
                              changeRequired={changeRequired}
                              provided={provided}
                              addAnswer={handleAddOption}
                              deleteAnswer={handleDeleteOption}
                              changeAnswerText={handleChangeOptionText}
                              changeScore={handleChangeScore}
                              changeCorrect={handleChangeCorrect}
                              // checkDuplication={handleCheckDuplication}
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
                  setSectionNum(0);
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
