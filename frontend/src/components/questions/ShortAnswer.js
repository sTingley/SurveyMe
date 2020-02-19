import React from "react";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


export default function ShortAnswer(props){

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
}
