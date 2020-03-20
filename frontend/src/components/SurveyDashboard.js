import React, { useEffect, useState } from "react";
import ViewSurvey from './ViewSurvey';
import Paper from '@material-ui/core/Paper';
import Cookies from 'js-cookie';

export default function SurveyDashboard() {

  const [surveyArray, setSurveyArray] = useState([])
  const [loading, setLoading] = useState(true)


  useEffect(() => {

    

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
