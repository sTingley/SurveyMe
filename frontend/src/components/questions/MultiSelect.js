import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


export default function MultiSelect(props){
  return(
    <Card>
     <CardContent>
       <Typography variant="h5"component="h2">
       Question: {props.question_content}
       </Typography>
       <Typography variant="h7"component="p">
       Responses: {returnRs(props.question_response)}
       </Typography>
       <Typography variant="h7"component="p2">
       Selected Responses: {returnRs(props.question_selection)}
       </Typography>
     </CardContent>
    </Card>
  )
}

function returnRs(rs){
  return rs.map((r) => r = r + ' ')
}
