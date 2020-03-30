import React, { useEffect, useState } from "react";
import ViewSurvey from './ViewSurvey';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { Typography } from "@material-ui/core";


export default function SurveyDashboard(props) {

  const [surveyArray, setSurveyArray] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    async function fetchData() {
      const res = await fetch("http://localhost:5000/api/v1/getSurveys",
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ owners: props.username }),
        })
      const data = await res.json();
      const surveys = data.filtered;
      setSurveyArray(surveyArray.concat(surveys));
      setLoading(false);
    }
    fetchData();
  }, [])



  const attemptDeleteSurvey = (surveyID) => {
    fetch('http://localhost:5000/api/v1/deleteSurvey', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ surveyID }),
    })
      .then((data) => {
        if (data.status > 400) {
          console.log('error did not delete survey')
        }
        else if (data.status === 200) {
          console.log('survey deleted in db')
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });

  }


  function deleteSurvey(e) {
    console.log(e.target.id)
    if (window.confirm("are you sure you want to delete this survey?")) {
      attemptDeleteSurvey(e.target.id)
      setSurveyArray(surveyArray.filter((s) => s.id !== e.target.id))
    }
  }

  return (
    <div>
      <Paper style={{ width: '75%' }} elevation={3}>
        <Typography variant="h3">
          Displaying {props.username}'s surveys
      </Typography>
      </Paper>
      {loading ? <p> loading... </p> :
        surveyArray[0] === undefined ? <p>No surveys yet</p> :
          <div>{surveyArray.map((s) =>
            <Paper elevation={3}>
              <input type="button"
                id={s.id}
                onClick={deleteSurvey}
                value={'CLick to delete'}
              />
              <ViewSurvey
                survey={s}
              />
            </Paper>)}</div>}
      <br></br>
    </div>
  )
}
