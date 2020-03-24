import React from "react";
import MultipleChoice from './questions/MultipleChoice.js'
import ShortAnswer from './questions/ShortAnswer.js'
import MultiSelect from './questions/MultiSelect.js'
import Typography from '@material-ui/core/Typography'
//props contains survey_id which will be used to query mongo client
export default function ViewSurvey(props) {

  return (
    <div>
      <Typography variant="h4" component="h2">
        {`Survey Title: will soon go here  ID: will soon go here`}
      </Typography>
      <ul>{returnQuestionArray(props.survey.questions[0].questions)}</ul>
    </div>
  )
}

function returnQuestionArray(arr) {
  console.log(arr)
  return arr.map(q => returnQuestion(q))
}

function returnQuestion(q) {
  switch (q.type) {
    case 0:
      return (
        <ShortAnswer
          question_id={q.id}
          question_content={q.content}
          question_responses={q.responses}
        />
      )
    case 1:
      return (
        <MultipleChoice
          question_id={q.id}
          question_content={q.content}
          question_responses={q.responses}
          question_selection={q.selected}
        />
      )
    case 2:
      return (
        <MultiSelect
          question_id={q.id}
          question_content={q.content}
          question_responses={q.responses}
          question_selection={q.selected}
        />
      )
    default:
  }
}
