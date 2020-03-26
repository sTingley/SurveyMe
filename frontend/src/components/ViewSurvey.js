import React from "react";
import MultipleChoice from './questions/MultipleChoice.js'
import ShortAnswer from './questions/ShortAnswer.js'
import MultiSelect from './questions/MultiSelect.js'
import Typography from '@material-ui/core/Typography'
//props contains survey_id which will be used to query mongo client
export default function ViewSurvey(props) {

  return (
    <div>
      <Typography variant="h7" component="h2">
        {`Title: ${props.survey.title}`}
      </Typography>
      <ul>{returnQuestionArray(props.survey.questions)}</ul>
    </div>
  )
}

function returnQuestionArray(arr) {
  return arr.map(q => returnQuestion(q))
}

function returnQuestion(q) {
  switch (q.type) {
    case 0:
      return (
        <ShortAnswer
          key={q.id}
          question_id={q.id}
          question_content={q.content}
          question_responses={q.responses}
        />
      )
    case 1:
      return (
        <MultipleChoice
          key={q.id}
          question_id={q.id}
          question_content={q.content}
          question_responses={q.responses}
          question_selection={q.selected}
        />
      )
    case 2:
      return (
        <MultiSelect
          key={q.id}
          question_id={q.id}
          question_content={q.content}
          question_responses={q.responses}
          question_selection={q.selected}
        />
      )
    default:
  }
}
