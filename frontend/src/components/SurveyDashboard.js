import React from "react";
import ViewSurvey from './ViewSurvey';
import Paper from '@material-ui/core/Paper';

//pass survey_id ass prop
export default function SurveyDashboard() {

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
    <Paper style={{width:'75%'}} elevation={3}>
    <ViewSurvey
    survey_id={1}
    />
    </Paper>)
}
