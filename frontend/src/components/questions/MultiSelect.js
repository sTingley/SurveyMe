import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';

import * as UUID from "uuid";

export default function MultiSelect(props) {

  const [, setState] = useState({})


  function returnRs(rs) {
    return rs.map((r) => {
      if (r.selected === true)
        return <li><FormControlLabel key={r.response_id} disabled value={r.response_content} control={<Checkbox checked />} label={r.response_content} /></li>
      else
        return <li><FormControlLabel key={r.response_id} disabled value={r.response_content} control={<Checkbox />} label={r.response_content} /></li>
    }
    )
  }

  const handleQChange = (e) => {
    props.onChange(e.target.id, e.target.value)
  }
  const handleRChange = (e) => {
    props.onChange(e.target.id, e.target.value, props.question_id)
  }

  const generateResponse = () => {
    let new_response_id = UUID.v4();
    props.generateResponseObj(props.question_id, new_response_id)
    setState({})

  }

  if (props.mode !== "edit")
    return (
      <Card>
        <CardContent>
          <Typography variant="h5" component="h2">
            Question: {props.question_content}
          </Typography>
          <ul>{returnRs(props.question_responses)}</ul>
        </CardContent>
      </Card>
    )
  else
    return (
      <Card>
        <CardContent>
          <Typography>
            Multiple Selection Question
          </Typography>
          <input type="button"
            id={props.question_id}
            onClick={props.removeQuestion}
            value="remove this question"
          />          <br></br>
          <TextField
            onChange={handleQChange}
            id={`${props.question_id}`}
            label="Enter Question Here..."
            variant="filled" />
          <input type="button" value="+" onClick={generateResponse} />
          <ul>{props.responses.map((r, index) => {
            return (
              <div>
                <TextField
                  key={r.response_id}
                  onChange={handleRChange}
                  id={r.response_id}
                  label="Enter Response Here..."
                  variant="standard"
                  value={props.responses[index].response_content}
                />
              </div>
            )
          })}</ul>
        </CardContent>
      </Card>
    )
}
