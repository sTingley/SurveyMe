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

export default function MultiSelect(props) {

  const [responses, setResponses] = useState([]);


  function returnRs(rs) {
    return rs.map((r) => {
      if (props.question_selection.includes(r))
        return <FormControlLabel disabled value={r} control={<Checkbox checked />} label={r} />
      else
        return <FormControlLabel disabled value={r} control={<Checkbox />} label={r} />
    }
    )
  }


  const removeResponse = (response_id) => {
    setResponses(responses.filter(r =>  r.id != response_id))
    props.removeResponse(response_id, props.question_id)
  }
  const handleQChange = (e) => {
      props.onChange(e.target.id, e.target.value)
  }
  const handleRChange = (e) => {
      props.onChange(e.target.id, e.target.value, props.question_id)
  }

  const generateResponse = () => {
    let new_response_id = responses.length;
    props.generateResponseObj(props.question_id, new_response_id)
    setResponses(responses.concat(
      <div>
         <TextField
          key={new_response_id}
          onChange={handleRChange}
          id={new_response_id}
          label="Enter Response Here..."
          variant="standard" />
         
        <IconButton>
          <RemoveIcon onClick={()=>removeResponse(new_response_id)}/>
        </IconButton>
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
          <Typography variant="h7" component="p">
            Responses: {returnRs(props.question_response)}
          </Typography>
        </CardContent>
      </Card>
    )
  else
    return (
      <Card>
        <CardContent>
         <Typography>
           Question {props.question_id}
         </Typography>
          <TextField
            onChange={handleQChange}
            id={`${props.question_id}`}
            label="Enter Question Here..."
            variant="filled" />
          <IconButton>
            <AddIcon onClick={generateResponse} />
          </IconButton>
          <ul>{responses.map((r) => { return (r) })}</ul>
        </CardContent>
      </Card>
    )
}