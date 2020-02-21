import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';

import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';



export default function MultipleChoice(props) {
  const [value, setValue] = React.useState();
  function returnRs(rs) {
    return rs.map((r) => {
      if (props.question_selection.includes(r))
        return <FormControlLabel disabled value={r} control={<Radio checked />} label={r} />
      else
        return <FormControlLabel disabled value={r} control={<Radio />} label={r} />
    }
    )
  }

  const handleChange = event => {
    setValue(event.target.value);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2">
          Question: {props.question_content}
        </Typography>
        <RadioGroup onChange={handleChange} value={value}>
          <Typography variant="h7" component="p">
            Responses: {returnRs(props.question_response)}
          </Typography>
        </RadioGroup>
      </CardContent>
    </Card>
  )
}

