import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardAction from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { useFormControl } from '@material-ui/core';

export default function SendASurvey(props) {
    const [error, setError] = useState(false)
    const [currentTaker, setCurrentTakers] = useState("")
    const [takers, setTakers] = useState([])
    const [surveys, setSurveys] = useState([])
    const [selectedSurvey, setSelectedSurvey] = useState("")

    useEffect(() => {
        async function fetchData() {
            const res = await fetch("http://localhost:5000/api/v1/getSurveys",
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ owners: props.username }),
                })
            const data = await res.json();
            setSurveys(surveys.concat(data.filtered));
        }
        fetchData();
    }, [])

    const handleSurveySelection = (id) => {
        setSelectedSurvey(id);
    }

    const handleCurrentTaker = (e) => {
        setCurrentTakers(e.target.value);
    }

    const showSelectedSurvey = (id) => {
        for (const s of surveys)
            if (s.id === id) return s.title

    }



    const sendSurvey = () => {
        const message = { isSurvey: true, takers, selectedSurvey };
        console.log(message)
        fetch('http://localhost:5000/api/v1/writeNotification', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({

                username: props.username,
                message

            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const updateTakers = () => {
        // TODO: make sure each taker exists in DB
        fetch('http://localhost:5000/api/v1/isUser',{
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username: currentTaker}),
        })
        .then((response)=>response.json())
        .then((data)=>{
            if(data.validated === true){
            setTakers(takers.concat(currentTaker))
            setCurrentTakers("")
            setError(false)
            }
            else setError(true)
        })


        
    }

    return (
        <Card>
            <CardContent>
                <Typography variant="h5">
                    Send a Survey, fill out field of the person you wish to add as a taker, then click the button to add it to list
                </Typography>
                <Typography>
                    {error ? <p>did not find this person in the Database</p> : <p></p>}
                </Typography>
                <TextField value={currentTaker} onChange={handleCurrentTaker} placeholder='enter username here' />
                <Button onClick={updateTakers}>
                    Click to add to list
                </Button>
                <Typography>
                    List of "takers" below
               {takers.length === 0 ? <div><br></br> <p2> No people on the list yet</p2> </div> :
                        <ul>{takers.map((person) =>
                            <li>{person}</li>)}
                        </ul>}
                </Typography>
                <br></br>
                <Typography>
                    Select survey you wish to send here... (on at a time for now)
               {surveys.length === 0 ? <p2>loading...</p2> :
                        <ul>{surveys.map((s) =>
                            <li key={s.id} onClick={() => handleSurveySelection(s.id)}>{s.title}</li>)}
                        </ul>}
                </Typography>
                <Typography>
                    selected survey: {() => showSelectedSurvey(selectedSurvey)}
                </Typography>
            </CardContent>

            <CardAction>

                <Button onClick={sendSurvey}>
                    Send It!
                </Button>
            </CardAction>
        </Card>
    )
}