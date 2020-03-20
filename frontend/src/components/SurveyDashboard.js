import React, { useEffect, useState } from "react";
import ViewSurvey from './ViewSurvey';
import Paper from '@material-ui/core/Paper';


export default function SurveyDashboard() {

  const [surveyArray, setSurveyArray] = useState([])
  const [loading, setLoading] = useState(true)
  const jwt = require('jsonwebtoken')

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
      {loading ? <p> loading... </p> : <div>{surveyArray.map((s) => <ViewSurvey survey={s} />)}</div>}
    </Paper>
  )
}
