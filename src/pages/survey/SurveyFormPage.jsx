import QuestionComp from "../../components/survey/surveyForm/QuestionComp";
import * as React from "react";
import {useEffect, useState} from "react";
import {FaPlus} from "react-icons/fa6";
import IconButton from "@mui/material/IconButton";


export default function SurveyFormPage() {

    const [questions, setQuestions] = useState([1]);

    const deleteQuestion = (id) => {
        setQuestions(pre =>
            pre.filter(idx => idx !== id)
                .map((idx, index)=>(index + 1)));
    }

    const handleAdd = () => {
        setQuestions(pre => {
            const lastId = pre.length > 0 ? pre[pre.length -1] : 0;
            return [...pre, lastId + 1];
        });
    }

    useEffect(() => {
        console.log(questions)
    }, [questions]);


    return(

      <>

          {questions.map((id) => (
              <QuestionComp key={id} onDelete={deleteQuestion} index={id}/>
              )
          )}

          <span></span>
          <IconButton aria-label="delete" size="small" onClick={handleAdd}>
              <FaPlus />
          </IconButton>


      </>



    );

}