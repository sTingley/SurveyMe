import React, { useEffect, useState } from "react";
import ViewSurvey from './ViewSurvey';
import Paper from '@material-ui/core/Paper';
import { Typography } from "@material-ui/core";


export default function SurveyDashboard(props) {

  const [surveyArray, setSurveyArray] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    
    console.log(localStorage.getItem('username'))

    async function fetchData() {
      const res = await fetch("http://localhost:5000/api/v1/getSurveys");
      const data = await res.json();
      const surveys = data.docs
      setSurveyArray(surveyArray.concat(surveys));
      setLoading(false);
    }
    fetchData();
  }, [])
  return (
    <Paper style={{ width: '75%' }} elevation={3}>
      <Typography variant="h4">
        Hello {props?.user?.username}
      </Typography>
      {loading ? <p> loading... </p> : <div>{surveyArray.map((s) => <ViewSurvey survey={s} />)}</div>}
    </Paper>
  )
}
