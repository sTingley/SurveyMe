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

  const handleQChange = (e) => {
      console.log('q change')
      props.onChange(e.target.name, e.target.value)
  }
  const handleRChange = (e) => {
      console.log(`r change`)
      props.onChange(e.target.name, e.target.value, props.question_id)
  }

  const generateResponse = (e) => {

    props.generateResponseObj(props.question_id, responses.length)

    setResponses(responses.concat(
      <p>
        <TextField
          isResponse={true}
          key={responses.length}
          onChange={handleRChange}
          name={responses.length}
          label="Enter Response Here..."
          variant="outlined" />
        <IconButton>
          <RemoveIcon />
        </IconButton>
      </p>))
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
          <TextField
            onChange={handleQChange}
            name={props.question_id}
            label="Enter Question Here..."
            variant="outlined" />
          <IconButton>
            <AddIcon onClick={generateResponse} />
          </IconButton>
          <ul>{responses.map((r) => { return (r) })}</ul>
        </CardContent>
      </Card>
    )
}