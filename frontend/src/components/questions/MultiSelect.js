import React from 'react';

export default function MultiSelect(props){
  return(
     <div>
      <p>Question ID: {props.question_id}</p>
      <p>Question: {props.question_content}</p>
      <p>Responses: {returnRs(props.question_response)}</p>
      <p>Selected: {returnRs(props.question_selection)}</p>
     </div>
  )
}

function returnRs(rs){
  return rs.map((r) => <p>{r}</p>)
}
