import React from "react";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

export default function ShortAnswer(props) {

  const handleQChange = (e) => {
    props.onChange(e.target.id, e.target.value)
  }

  if (props.mode !== 'edit')
    return (
      <Card>
        <CardContent>
          <Typography variant="h5" component="h2">
            Question: {props.question_content}
          </Typography>
          <Typography variant="h7" component="p">
            Response: {props.question_response}
          </Typography>
        </CardContent>
      </Card>
    )
  else
    return (
      <Card>
        <CardContent>
          <Typography>
            Short Answer Choice Question {props.question_id}
          </Typography>
          <TextField
            key={`${props.question_id}`}
            onChange={handleQChange}
            id={`${props.question_id}`}
            label="Enter Question Here..."
            variant="filled" />
        </CardContent>
      </Card>
    )
}
