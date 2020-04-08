import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardAction from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

export default function Inbox(props) {

    const [inbox, setInbox] = useState([])

    useEffect(() => {
        async function fetchData() {
            const res = await fetch("http://localhost:5000/api/v1/notifications",
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username: props.username })
                })
            const data = await res.json();
            setInbox(data.docs.messages)
            console.log(inbox)
        }
        fetchData();
    }, [])

    return (
        <Card>
            <CardContent>
                <Typography>
                    Displaying {props.username}'s Inbox
               {inbox.length === 0 ?  <p2> No messages</p2> : 
                <ul>{inbox.map((message)=>
                    <li>{message}</li>)}
                </ul>}
               </Typography>
            </CardContent>
        </Card>
    )
}