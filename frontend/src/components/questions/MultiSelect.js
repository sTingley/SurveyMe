import React, { useState } from 'react';

import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';


import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';

import * as UUID from "uuid";

export default function MultiSelect(props) {

  const [responses, setResponses] = useState([]);



//use this to display
//<FormControlLabel disabled value={r} control={<Checkbox checked />} label={r} />

  function returnRs(rs) {
    return rs.map((r) => {
      console.log(r)
      if (r.selected === true)
        return <li>selected</li>
      else
        return <li>{r.response_content}</li>
    }
    )
  }


  const removeResponse = (response_id) => {
    setResponses(responses.filter(r => r.id != response_id))
    props.removeResponse(response_id, props.question_id)
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
    setResponses(responses.concat(
      <div>
        <TextField
          key={new_response_id}
          onChange={handleRChange}
          id={new_response_id}
          label="Enter Response Here..."
          variant="standard" />
        <input type="button" value="-"  onClick={() => removeResponse(new_response_id)} />
        <br></br>
      </div>
    ))
  }

  if (props.mode != "edit")
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
          Multiple Selection Question {props.question_id}
          </Typography>
          <TextField
            onChange={handleQChange}
            id={`${props.question_id}`}
            label="Enter Question Here..."
            variant="filled" />
            <input type="button" value="+" onClick={generateResponse} />
          <ul>{responses.map((r) => { return (r) })}</ul>
        </CardContent>
      </Card>
    )
}
