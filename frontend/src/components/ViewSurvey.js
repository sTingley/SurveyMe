import React from "react";
import MultipleChoice from './questions/MultipleChoice.js'
import ShortAnswer from './questions/ShortAnswer.js'
import MultiSelect from './questions/MultiSelect.js'
import Typography from '@material-ui/core/Typography'
//props contains survey_id which will be used to query mongo client
export default function ViewSurvey(props){
  
  const [questions, setQuestions] = useState([])
  const getSurveys =()=>{
    fetch('http://localhost:5000/api/v1/getSuvey',{method: 'GET'})
    .then((res)=> res.json())
    .then((data) => {
      setQuestions(questions.concat(data))
    })

  }
  
  return(
    <div>
      <Typography variant="h4"component="h2">
        {`Survey Title: ${surveyobj.title}  ID: ${surveyobj.id}`}
      </Typography>
        <ul>{returnQs(surveyobj.questions)}</ul>
    </div>
  )
}

function returnQs(qs){
  return qs.map((q) => returnQ(q))
}

function returnQ(q){
  switch (q.type) {
    case 0:
      return(
        <ShortAnswer
        question_id={q.id}
        question_content={q.content}
        question_response={q.response}
        />
      )
      break;
    case 1:
      return(
        <MultipleChoice
        question_id={q.id}
        question_content={q.content}
        question_response={q.response}
        question_selection={q.selected}
        />
      )
      case 2:
      return(
        <MultiSelect
        question_id={q.id}
        question_content={q.content}
        question_response={q.response}
        question_selection={q.selected}
        />
      )
    default:
  }
}
