import React from "react";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

export default function ShortAnswer(props){
  if(props.mode)
  return (
    <Card>
    <CardContent>
      <Typography variant="h5"component="h2">
        Question: {props.question_content}
      </Typography>
      <Typography variant="h7"component="p">
        Response: {props.question_response}
      </Typography>
    </CardContent>
    </Card>
  )
  else
  return(
    <Card>
      <CardContent>
        <TextField label="Enter Question Here..." variant="outlined" />
      </CardContent>
    </Card>
  )
}
