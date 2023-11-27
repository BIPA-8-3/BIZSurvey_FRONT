import TextField from "@mui/material/TextField";
import * as React from "react";
import {useState} from "react";
import QuestionInfo from "./QuestionInfo";


export default function SurveyInfo(){


    const [questions,setQuestions] = useState([
        {
            questionId: 1,
            surveyQuestion: '',
            answerType: '',
            score: 0,
            step: 1,
            isRequired : false,
            answers: []
        },
        {
            questionId: 2,
            surveyQuestion: '',
            answerType: '',
            score: 0,
            step: 1,
            isRequired: true,
            answers: [
                {
                    answerId: 1,
                    surveyAnswer: '',
                    step: 1,
                    correct : null
                },
                {
                    answerId: 2,
                    surveyAnswer: '',
                    step: 2,
                    correct : null
                },{
                    answerId: 3,
                    surveyAnswer: '',
                    step: 3,
                    correct : null
                }
            ]
        }
    ]);




    return(


        <>


            <div style={{width: '700px', borderRadius:'10px', minHeight:'120px',border: '1px solid #D6D6D6', paddingTop:'20px',
                borderTop: '10px solid #243579', margin: '0 auto',
                boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px', paddingBottom:'25px'}}>

                <p style={{width: '600px', fontSize:'25px', fontWeight:'bold', margin:'0 auto',
                paddingTop:'30px'}}>제목</p>
                <p style={{width: '600px', fontSize:'14px', margin:'0 auto', paddingTop:'15px'}}>설명</p>

            </div>

            {
                questions.map(question => (
                    <QuestionInfo
                        key={question.questionId}
                        info={question}
                    />
                ))
            }

        </>
    );
}