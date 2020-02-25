import React, { useState } from 'react';
import ShortAnswer from './questions/ShortAnswer';
import MultipleChoice from './questions/MultipleChoice';
import MultiSelect from './questions/MultiSelect';


import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

export default function MakeASurvey() {
  const [questionType, setQuestionType] = useState("");
  const [emptyQuestions, setemptyQuestions] = useState([])
  const cardstyle = {
    display: 'flex'

  }
  
  const handleChange = (e) => {
    setQuestionType(e.target.value)
  }

  const generateQuestionBox = (e) => {
    switch (questionType){
      case 0:
        setemptyQuestions(emptyQuestions.concat(<ShortAnswer/>))
        break;
      case 1:
        setemptyQuestions(emptyQuestions.concat(<MultipleChoice/>))
        break;
      case 2:
        setemptyQuestions(emptyQuestions.concat(<MultiSelect/>))
    }
  }
  return (
    <div>
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
      <ul>{emptyQuestions.map((q) => {
        return (q)
      })}</ul>
    </Card>
    </div>
  )
}
