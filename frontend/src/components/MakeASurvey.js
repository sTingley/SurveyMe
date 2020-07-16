import React, { useState } from 'react';

import { useHistory } from 'react-router-dom';


import ShortAnswer from './questions/ShortAnswer';
import MultipleChoice from './questions/MultipleChoice';
import MultiSelect from './questions/MultiSelect';

import Card from '@material-ui/core/Card';
import CardAction from '@material-ui/core/Card'
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


import * as UUID from "uuid";


export default function MakeASurvey(props) {

  const [, setState] = useState({});
  const [surveyState, setSurveyState] = useState({ questions: [] })
  const [title, setTitle] = useState("")
  const [questionType, setQuestionType] = useState(2);

  const history = useHistory();


  const useStyles = makeStyles(theme => ({

    root: {
      border: 0,
      borderRadius: 3,
      backgroundColor: 'gray',
      padding: '0 10px',
      '& > *': {
        margin: theme.spacing(2),
      },

    },
  }));

  const styles = useStyles();

  const cardstyle = {
    display: 'flex'

  }

  const handleTitle = (e) => {
    setTitle(e.target.value)
  }

  const sendSurvey = () => {

    console.log(surveyState)
    let surveyobj = {
      title: title,
      id: UUID.v4(),
      owners: [props.username],
      questions: surveyState.questions
    }



    fetch('http://localhost:5000/api/v1/addSurvey', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(surveyobj),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        history.push('/dashboard')
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  const handleChange = (e) => {
    setQuestionType(e.target.value)
  }

  const removeResponse = (response_id, question_id) => {
    let obj = surveyState;
    obj.questions[findQuestion(obj, question_id)].responses = obj.questions[findQuestion(obj, question_id)].responses.filter(r => r.response_id !== response_id)
    setSurveyState(obj)
    setState({})
  }

  function handleMultiChange(name, value, question_id) {
    if (question_id === undefined) {
      let obj = surveyState;
      obj.questions[findQuestion(obj, name)].content = value;
      setSurveyState(obj);
      setState({})
    }
    else {
      let obj = surveyState;
      obj.questions[findQuestion(obj, question_id)].responses[findResponseInQuestion(obj, question_id, name)].response_content = value;
      setSurveyState(obj);
      setState({})
    }
  }


  //returns index of response with corresponding question_id and response_id
  function findResponseInQuestion(obj, question_id, response_id) {
    for (let i = 0; i < obj.questions[findQuestion(obj, question_id)].responses.length; i++) {
      if (obj.questions[findQuestion(obj, question_id)].responses[i].response_id === response_id)
        return i;
    }
  }

  //returns index of question with corresponding question_id
  function findQuestion(obj, question_id) {
    for (let i = 0; i < obj.questions.length; i++) {
      if (obj.questions[i].id === question_id)
        return i;
    }

  }



  const generateResponseObj = (question_id, response_id) => {
    let obj = surveyState;

    obj.questions[findQuestion(obj, question_id)].responses.push({
      response_id: response_id,
      response_content: "",
      selected: false
    });

    setSurveyState(obj);
  }
  const removeQuestion = (e) => {
    let obj = surveyState;
    obj.questions = obj.questions.filter((q)=> q.id !== e.target.id)
    setSurveyState(obj)
    setState({})
  }

  const generateQuestionBox = () => {
    console.log(surveyState)
    let new_question_id = UUID.v4();
    if (surveyState.questions.length === 0) {
      setSurveyState(Object.assign(surveyState, {
        [`questions`]: [
          {
            [`id`]: `${new_question_id}`,
            [`content`]: "",
            [`category`]: "",
            [`type`]: questionType,
            [`responses`]: []
          }
        ]
      }))
    }
    else {
      let obj = surveyState;
      obj.questions.push({
        [`id`]: `${new_question_id}`,
        [`content`]: "",
        [`category`]: "",
        [`type`]: questionType,
        [`responses`]: []
      })

      setSurveyState(obj)

    }
    //this is dumb lets fix this later tho

    
    setState({})
  }




  return (
    <Paper className={styles.root} style={{ maxWidth: 1000 }}>
      <Card>
        <Typography >
          Enter Survey Title Here..
      </Typography>
        <TextField value={title} onChange={handleTitle} placeholder={"survey title here..."} />
      </Card>
      <Card style={cardstyle}>
        <InputLabel id="demo-simple-select-label">Select Question Type using selector</InputLabel>
        <Select
          style={{ minWidth: 120 }}
          labelId="demo-simple-select-label"
          onChange={handleChange}
          value={questionType}
        >
          <MenuItem value={1}>MultipleChoice</MenuItem>
          <MenuItem value={2}>MultiSelect</MenuItem>
          <MenuItem value={0}>Short Answer</MenuItem>
        </Select>
        <Button onClick={generateQuestionBox}>Generate Question Box</Button>
      </Card>
      <Card>
        <Typography>
          Questions will be listed below:
      </Typography>
        {surveyState.questions[0] === undefined ? <p>no questions click button above to make some</p> :

          <ul>{surveyState.questions.map((q, index) => {
            if (q.type === 0)
              return (<li>
                <ShortAnswer
                  key={q.id}
                  question_id={q.id}
                  onChange={handleMultiChange}
                  mode={"edit"}
                  removeQuestion={removeQuestion}
                />
              </li>)
            if (q.type === 1)
              return (<li>
                <MultipleChoice
                  key={q.id}
                  removeResponse={removeResponse}
                  question_id={q.id}
                  onChange={handleMultiChange}
                  mode={"edit"}
                  responses={q.responses}
                  generateResponseObj={generateResponseObj}
                  removeQuestion={removeQuestion}
                />
              </li>)
            if (q.type === 2)
              return (<li>
                <MultiSelect
                  key={q.id}
                  removeResponse={removeResponse}
                  question_id={q.id}
                  onChange={handleMultiChange}
                  mode={"edit"}
                  responses={q.responses}
                  generateResponseObj={generateResponseObj}
                  removeQuestion={removeQuestion}
                />
                <input type='button' id={q.id} onClick={removeQuestion} />
              </li>)
          })
          }</ul>}
      </Card>
      <Card>
        <CardAction>
          <Button onClick={() => sendSurvey()}>Submit Survey</Button>
        </CardAction>
      </Card>
    </Paper>
  )
}
