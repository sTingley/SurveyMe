import React, { useState, useEffect } from "react";
import MultipleChoice from './questions/MultipleChoice.js'
import ShortAnswer from './questions/ShortAnswer.js'
import MultiSelect from './questions/MultiSelect.js'
import Typography from '@material-ui/core/Typography'
//props contains survey_id which will be used to query mongo client
export default function ViewSurvey(props){
  
  // const qobj = {
  //   id: 1,
  //   type: 0,
  //   category: "agile",
  //   content: "Are you agile?",
  //   response: "No"
  // }
  // const qobj2 = {
  //   id:2,
  //   type: 1,
  //   category: 'agile',
  //   content: 'Who is agile?',
  //   response: ["me","you","everyone","noone",'her'],
  //   selected: ["me"]
  // }
  // const qobj3 = {
  //   id:3,
  //   type: 2,
  //   category: 'agile',
  //   content: "Who is agile?",
  //   response: ["me", "you", "him", "her"],
  //   selected: ["me", "you","her"]
  // }
  // const surveyobj = {
  //   id: 1,
  //   title: "agile survey",
  //   category: 'agile',
  //   questions: [qobj,qobj2,qobj3],
  //   dateCreated: "1/1/2020",
  //   public: true,
  //   mode: 'view'
  // }


  const [surveyobj, setSurveyobj] = useState({})
  useEffect(()=>{
    setSurveyobj(props.survey)
  },[props.survey])
  
  return(
    <div>
      <Typography variant="h4"component="h2">
        {`Survey Title: will soon go here  ID: will soon go here`}
      </Typography>
        <ul>{console.log(surveyobj)}</ul>
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
