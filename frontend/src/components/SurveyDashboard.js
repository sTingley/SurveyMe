import React, { useEffect, useState } from "react";
import ViewSurvey from './ViewSurvey';
import Paper from '@material-ui/core/Paper';

export default function SurveyDashboard() {
  const [surveys, setSurveys] = useState([])


  useEffect(()=>{
    fetch('http://localhost:5000/api/v1/getSurveys')
    .then(res => res.json())
    .then((data)=>{
      setSurveys(data.docs)
    })
  },[])  //gotta throw the empty array as the second paramter for useEffect
        // this prevents the infinite loop
      // see this for more https://reactjs.org/docs/hooks-effect.html



  return(
    <Paper style={{width:'75%'}} elevation={3}>
    <ViewSurvey 
      survey={surveys[0]}
    />
    </Paper>)
}
