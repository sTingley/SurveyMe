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

  const [state, setState] = useState({})

  const [questionType, setQuestionType] = useState("");
  const [emptyQuestions, setEmptyQuestions] = useState([])

  const cardstyle = {
    display: 'flex'

  }
  
  const handleChange = (e) => {
    setQuestionType(e.target.value)
  }

function handleMultiChange (field, value) {
   console.log(field)
   console.log(value)
   setState(Object.assign(state,{[field]:value}))
}




  const generateQuestionBox = (e) => {
    switch (questionType){
      case 0:
        setEmptyQuestions(emptyQuestions.concat(<ShortAnswer />))
        break;
      case 1:
        setEmptyQuestions(emptyQuestions.concat(<MultipleChoice />))
        break;
      case 2:
        setEmptyQuestions(emptyQuestions.concat(<MultiSelect 
          onChange={handleMultiChange} mode={"edit"}
          />))
    }
  }
  return (
    <div>
    <Card>
      <Typography>
      Enter Survey Title Here..
      </Typography>
      <TextField placeholder={"survey title here..."}/>
    </Card>
    <Card style={cardstyle}>
      <InputLabel id="demo-simple-select-label">Question Type</InputLabel>
      <Select
        style={{ minWidth: 120 }}
        labelId="demo-simple-select-label"
        onChange={handleChange}
      >
        <MenuItem value={1}>MultipleChoice</MenuItem>
        <MenuItem value={2}>MultiSelect</MenuItem>
        <MenuItem value={0}>Short Answer</MenuItem>
      </Select>
      <Button onClick={generateQuestionBox}>Generate Question Box</Button>
    </Card>
      <Card>
      <ul>{emptyQuestions.map((q) => {return(q)})}</ul>
    </Card>
    <Card>
      <CardAction>
        <Button onClick={(e)=>console.log(state)}>Submit Survey</Button>
      </CardAction>
    </Card>
    </div>
  )
}
