import React from "react";
import ViewSurvey from './ViewSurvey';
import Paper from '@material-ui/core/Paper';

//pass survey_id ass prop
export default function SurveyDashboard() {

  return(
    <Paper style={{width:'75%'}} elevation={3}>
    <ViewSurvey
    survey_id={1}
    />
    <ViewSurvey
    survey_id={1}
    />
    </Paper>)
}
