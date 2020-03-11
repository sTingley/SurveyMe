import React, { useState } from 'react';
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
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


import * as UUID from "uuid";


export default function MakeASurvey() {

  const [questionState, setQuestionState] = useState({})

  const [questionType, setQuestionType] = useState("");
  const [emptyQuestions, setEmptyQuestions] = useState([])

  const useStyles = makeStyles(theme => ({

    root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
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

  const sendSurvey = () => {

    console.log(questionState)
    fetch('http://localhost:5000/api/v1/addSurvey', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(questionState),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  const handleChange = (e) => {
    setQuestionType(e.target.value)
  }

  const removeResponse = (response_id, question_id) => {

    let obj = questionState;
    obj.questions[findQinObj(obj, question_id)].responses = obj.questions[findQinObj(obj, question_id)].responses.filter(r => r.response_id !== response_id)
    setQuestionState(obj)

  }



  function handleMultiChange(name, value, question_id) {
    if (question_id == undefined) {
      let obj = questionState;
      obj.questions[findQinObj(obj, name)].content = value;
      setQuestionState(obj);
    }
    else {
      let obj = questionState;
      obj.questions[findQinObj(obj, question_id)].responses[findRinQobj(obj, question_id, name)].response_content = value;
      setQuestionState(obj);
    }
  }

  function findRinQobj(obj, question_id, response_id) {
    for (let i = 0; i < obj.questions[findQinObj(obj, question_id)].responses.length; i++) {
      if (obj.questions[findQinObj(obj, question_id)].responses[i].response_id === response_id)
        return i;
    }
  }

  function findQinObj(obj, question_id) {
    for (let i = 0; i < obj.questions.length; i++) {
      if (obj.questions[i].id === question_id)
        return i;
    }

  }
  const generateResponseObj = (question_id, response_id) => {
    let obj = questionState;

    obj.questions[findQinObj(obj, question_id)].responses.push({
      response_id: response_id,
      response_content: "",
      selected: false
    });

    setQuestionState(obj);
  }


  const generateQuestionBox = (e) => {
    let new_question_id = UUID.v4();

    if (emptyQuestions.length === 0) {
      setQuestionState(Object.assign(questionState, {
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
      let obj = questionState;
      obj.questions.push({
        [`id`]: `${new_question_id}`,
        [`content`]: "",
        [`category`]: "",
        [`type`]: questionType,
        [`responses`]: []
      })

      setQuestionState(obj)

    }



    switch (questionType) {
      case 0:
        setEmptyQuestions(emptyQuestions.concat(
          <div>
          <ShortAnswer
            key={`${new_question_id}`}
            removeResponse={removeResponse}
            question_id={new_question_id}
            onChange={handleMultiChange}
            mode={"edit"}
            generateResponseObj={generateResponseObj}
          /><br></br>
          </div>))
        break;
      case 1:
        setEmptyQuestions(emptyQuestions.concat(
          <div>
          <MultipleChoice
            key={`${new_question_id}`}
            removeResponse={removeResponse}
            question_id={new_question_id}
            onChange={handleMultiChange}
            mode={"edit"}
            generateResponseObj={generateResponseObj}
          /><br></br>
          </div>))
        break;
      case 2:
        setEmptyQuestions(emptyQuestions.concat(
          <div>
          <MultiSelect
            key={`${emptyQuestions.length}`}
            removeResponse={removeResponse}
            question_id={new_question_id}
            onChange={handleMultiChange}
            mode={"edit"}
            generateResponseObj={generateResponseObj}
            /><br></br>
          </div>))
    }
  }






  return (
    <Paper className={styles.root} style={{ maxWidth: 1000}}>
      <Card>
        <Typography>
          Enter Survey Title Here..
      </Typography>
        <TextField placeholder={"survey title here..."} />
      </Card>
      <Card style={cardstyle}>
        <InputLabel id="demo-simple-select-label">Question Type</InputLabel>
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
        <ul>{emptyQuestions.map((q) => { return (q) })}</ul>
      </Card>
      <Card>
        <CardAction>
          <Button onClick={() => sendSurvey()}>Submit Survey</Button>
        </CardAction>
      </Card>
  </Paper>
  )
}
