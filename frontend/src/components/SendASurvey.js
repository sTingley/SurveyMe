import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardAction from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

export default function SendASurvey(props) {


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
            console.log(data)
            setSurveys(surveys.concat(data.filtered));
        }
        fetchData();
    }, [])

    const handleSurveySelection = (e) => {
        console.log(e)
        setSelectedSurvey(e.target.id);
    }

    const handleCurrentTaker = (e) => {
        setCurrentTakers(e.target.value);   
    }


    const updateTakers = () => {

        // TODO: make sure each taker exists in DB
        setTakers(takers.concat(currentTaker))
        setCurrentTakers("")
    }

    return (
        <Card>
            <CardContent>
                <Typography variant="h5">
                    Send a Survey, fill out field of the person you wish to add as a taker, then click the button to add it to list
                </Typography>
                <TextField value={currentTaker} onChange={handleCurrentTaker} placeholder='enter username here' />
                <Button onClick={updateTakers}>
                    Click to add to list
                </Button>
                <Typography>
                    List of "takers" below
               {takers.length === 0 ? <div><br></br> <p2> No people on the list yet</p2> </div>:
                        <ul>{takers.map((person) =>
                            <li>{person}</li>)}
                        </ul>}
                </Typography>
                <br></br>
                <Typography>
                    select survey you wish to send here... (on at a time for now)
               {surveys.length === 0 ? <p2>loading...</p2> :
                        <ul>{surveys.map((s) =>
                            <li>{s.title}<Button id={s.id} onClick={handleSurveySelection}>click to select this survey</Button></li>)}
                        </ul>}
                </Typography>



            </CardContent>

            <CardAction>
                
                <Button onClick={()=>console.log(selectedSurvey)}>
                    Send It!
                </Button>
            </CardAction>
        </Card>
    )
}