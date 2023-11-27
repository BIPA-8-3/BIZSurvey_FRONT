import * as React from "react";


export default function QuestionInfo({info}){

const {questionId, surveyQuestion, answerType, score, step, isRequired, answers} = info;



    return(



        <>



            <div style={{width: "700px",  backgroundColor: "grey", borderRadius:'10px', minHeight: '150px',
                border: '1px solid #D6D6D6', borderTop: '10px solid #0171D1',
                boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
            }}>
                <span style={{display: 'inline-block', width:'50px', textAlign:'center'}}>{step}</span>

                <p>{surveyQuestion}</p>



            </div>







        </>
    );
}