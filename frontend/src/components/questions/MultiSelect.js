import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';

export default function MultiSelect(props) {

  function returnRs(rs) {
    return rs.map((r) => {
      if (props.question_selection.includes(r))
        return <FormControlLabel disabled value={r} control={<Checkbox checked />} label={r} />
      else
        return <FormControlLabel disabled value={r} control={<Checkbox />} label={r} />
    }
    )
  }
  if(props.mode)
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
    return(
      <Card>
      <CardContent>
      <CardContent>
        <TextField label="Enter Question Here..." variant="outlined" />
        <br></br>
        <TextField label="Enter Response Here..." variant="outlined" />
      </CardContent>
      </CardContent>
    </Card>
    )
}