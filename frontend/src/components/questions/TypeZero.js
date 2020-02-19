import React from "react";

export default function TypeZero(props){

  return (
    <div>
    <p>Question ID: {props.question_id}</p>
     <p>Question: {props.question_content}</p>
     <p>Answer: {props.question_response}</p>
     </div>
  )
}
