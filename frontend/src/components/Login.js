import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';

import { TextField, Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardAction from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper'


export default function Login(props) {


    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleChange = (e) => {
        if (e.target.id === 'password')
            setPassword(e.target.value);
        if (e.target.id === 'username')
            setUsername(e.target.value);
    }



    const attemptLogin = () => {
        fetch('http://localhost:5000/signin', {
          method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ username, password }),
        })  
            .then((data) => {
                if(data.status === 401){
                    console.log('error did not authorize')
                }
                else if(data.status === 200){
                    console.log('authorized')
                    props.handleLogin(username)
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }

    return (
        <Paper style={{ width: '85%' }}>
            <Card>
                <Typography variant='h4'>
                    Login:
                </Typography>
                <CardContent style={{ width: '75%' }}>
                    <TextField
                        value={username}
                        key={'username'}
                        onChange={handleChange}
                        id={'username'}
                        label='enter username here'
                        variant='filled'
                    /><br></br>
                    <TextField
                        value={password}
                        key={'password'}
                        onChange={handleChange}
                        id={'password'}
                        label='enter password here'
                        variant='filled'
                        type='password'
                    />
                    <CardAction>
                        <Button onClick={attemptLogin}>Submit</Button>
                    </CardAction>

                </CardContent>
            </Card>
        </Paper>)
}