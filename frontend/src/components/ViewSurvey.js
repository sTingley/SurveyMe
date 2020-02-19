import React from "react";
import MultipleChoice from './questions/MultipleChoice.js'
import ShortAnswer from './questions/ShortAnswer.js'
import MultiSelect from './questions/MultiSelect.js'
//props contains survey_id which will be used to query mongo client
export default function ViewSurvey(props){
  const qobj = {
    id: 1,
    type: 0,
    category: "agile",
    content: "Are you agile?",
    response: "No"
  }
  const qobj2 = {
    id:2,
    type: 1,
    category: 'agile',
    content: 'Who is agile?',
    response: ["me","you","everyone","noone"],
    selected: ["me"]
  }
  const qobj3 = {
    id:3,
    type: 2,
    category: 'agile',
    content: "Who is agile?",
    response: ["me", "you", "him", "her"],
    selected: ["me", "you"]
  }
  const surveyobj = {
    id: 1,
    title: "agile survey",
    category: 'agile',
    questions: [qobj,qobj2,qobj3],
    dateCreated: "1/1/2020",
    public: true
  }


  return(
    <div>
    <h1>{`${surveyobj.title} (${surveyobj.id})`}</h1>
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
