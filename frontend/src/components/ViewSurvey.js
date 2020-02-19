import React from "react";
import TypeZero from './questions/TypeZero.js'

//props contains survey_id which will be used to query mongo client
export default function ViewSurvey(props){
  const qobj = {
    id: 1,
    type: 0,
    category: "agile",
    content: "Are you agile?",
    response: "No"
  }

  const surveyobj = {
    id: 1,
    title: "agile survey",
    category: 'agile',
    questions: [qobj,qobj,qobj,qobj],
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
        <TypeZero
        question_id={q.id}
        question_content={q.content}
        question_response={q.response}
        />
      )
      break;
    default:
  }
}
