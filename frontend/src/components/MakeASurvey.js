import React, { useState } from 'react';
import ShortAnswer from './questions/ShortAnswer';
import MultipleChoice from './questions/MultipleChoice';
import MultiSelect from './questions/MultiSelect';


import Card from '@material-ui/core/Card';
import CardAction from '@material-ui/core/Card'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Typography } from '@material-ui/core';

export default function MakeASurvey() {

  const [questionState, setQuestionState] = useState({})

  const [questionType, setQuestionType] = useState("");
  const [emptyQuestions, setEmptyQuestions] = useState([])

  const cardstyle = {
    display: 'flex'

  }

  const handleChange = (e) => {
    setQuestionType(e.target.value)
  }

  const removeResponse = (response_id, question_id) => {
    let obj = questionState;
    console.log(`response id: ${response_id}`)
    console.log(`question id: ${question_id}`)
    obj.questions[question_id].responses = obj.questions[question_id].responses.filter(r => r.response_id != response_id)
    setQuestionState(obj)

  }

  function handleMultiChange(name, value, question_id) {
    if (question_id == undefined) {
      let obj = questionState;
      obj.questions[name].content = value;
      setQuestionState(obj);
    }
    else {
      let obj = questionState;
      obj.questions[question_id].responses[name].response_content = value;
      setQuestionState(obj);
    }
  }

  const generateResponseObj = (question_id, response_id) => {
    let obj = questionState;
    obj.questions[question_id].responses.push({
      response_id: response_id,
      response_content: "",
      selected: false
    });
    setQuestionState(obj);
  }
  

  const generateQuestionBox = (e) => {
    if (emptyQuestions.length === 0) {
      setQuestionState(Object.assign(questionState, {
        [`questions`]: [
          {
            [`id`]: `${emptyQuestions.length}`,
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
        [`id`]: `${emptyQuestions.length}`,
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
          <ShortAnswer />))
        break;
      case 1:
        setEmptyQuestions(emptyQuestions.concat(
          <MultipleChoice
            key={`${emptyQuestions.length}`}
            removeResponse={removeResponse}
            question_id={emptyQuestions.length}
            onChange={handleMultiChange}
            mode={"edit"}
            generateResponseObj={generateResponseObj}
          />))
        break;
      case 2:
        setEmptyQuestions(emptyQuestions.concat(
          <MultiSelect
            key={`${emptyQuestions.length}`}
            removeResponse={removeResponse}
            question_id={emptyQuestions.length}
            onChange={handleMultiChange}
            mode={"edit"}
            generateResponseObj={generateResponseObj}
          />))
    }
  }

  return (
    <div>
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
          <Button onClick={(e) => console.log(questionState)}>Submit Survey</Button>
        </CardAction>
      </Card>
    </div>
  )
}
